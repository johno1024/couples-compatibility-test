# NO WARNING — The Chemistry Test

Mobile-first two-person chemistry-test PWA.

## Status

This branch establishes the production-oriented NO WARNING architecture without replacing the existing Couple Check app on `main`.

## Structure

- `index.html` — PWA entry point
- `styles.css` — premium NO WARNING visual system
- `js/app.js` — application flow and rendering
- `js/questions.js` — editable 40-question test bank
- `js/scoring.js` — similarity + complementary compatibility scoring
- `js/challenges.js` — personalized Play It Out challenge bank
- `js/session.js` — share/reveal session client
- `api/` — secure server-side session endpoints
- `manifest.webmanifest`, `sw.js`, `icons/` — installable PWA assets

## Backend

The client is designed for a server-side session store. Answers must never be encoded in URLs. The Share Link only carries a non-guessable session token and the Reveal Link only carries a separate reveal token. Server-side endpoints must enforce that Player 1 answers remain inaccessible until Player 2 has locked their submission.

Recommended deployment: Vercel + Vercel KV / Upstash Redis, Supabase, or another durable server-side datastore.

## Important

The question bank is intentionally isolated in `js/questions.js` so approved wording, answer options, section assignments, weights, and dimension mappings can be maintained without rewriting the app.
