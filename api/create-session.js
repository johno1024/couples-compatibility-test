// Serverless endpoint for The Couple Check.
// Deploy this directory on a serverless host (for example Vercel) and set KV + SMS environment variables.
// Never expose Twilio credentials in index.html or GitHub Pages.

const crypto = require('crypto');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { phone, nickname } = req.body || {};
  if (!/^\+?[1-9]\d{7,14}$/.test(String(phone || '').replace(/[\s().-]/g, ''))) {
    return res.status(400).json({ error: 'Enter a valid mobile number.' });
  }
  const sessionId = crypto.randomBytes(18).toString('base64url');
  const normalized = String(phone).replace(/[\s().-]/g, '');
  // TODO: persist {sessionId, phone: normalized, nickname, completed:false} in a server-side KV/database.
  // The phone number must NEVER be placed in the partner URL.
  return res.status(200).json({ sessionId });
};
