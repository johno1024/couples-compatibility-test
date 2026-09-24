// Called only after Person 2 finishes. Phone lookup happens server-side by opaque sessionId.
// Required env vars: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER.
// Also connect this to the same KV/database used by create-session.js.

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { sessionId, partnerNickname, resultsUrl } = req.body || {};
  if (!sessionId) return res.status(400).json({ error: 'Missing session.' });

  // TODO: Replace with your KV/database read and atomic completed flag.
  // const session = await kv.get(sessionId)
  const session = null;
  if (!session) return res.status(404).json({ error: 'Notification session not configured.' });
  if (session.completed) return res.status(200).json({ ok: true, alreadySent: true });

  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!sid || !token || !from) return res.status(503).json({ error: 'SMS service is not configured.' });

  const body = new URLSearchParams({
    To: session.phone,
    From: from,
    Body: `♥ The Couple Check: ${partnerNickname || 'Your partner'} finished! Your shared results are ready.${resultsUrl ? ' ' + resultsUrl : ''}`
  });
  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST', headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body
  });
  if (!r.ok) return res.status(502).json({ error: 'SMS could not be sent.' });
  // TODO: atomically mark session.completed=true before/with send in production to prevent duplicates.
  return res.status(200).json({ ok: true });
};
