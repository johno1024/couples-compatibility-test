# The Couple Check — Release Candidate QA

Release gate for the private two-person Couple Check.

## Core flow
- [x] Home → Partner 1 nickname → 32-question test → lock flow remains present.
- [x] Multiple-choice, rating, select-all, and paired-statement question types remain supported.
- [x] Back/next navigation and progress remain present.
- [x] In-progress answers persist locally and Resume / Start Over is available.

## Two-person flow
- [x] Partner Share Link flow remains present.
- [x] Server-synced partner/reveal enhancement remains loaded through share-ux-2.js.
- [x] Private Reveal Link functionality remains loaded.
- [x] Partner answers remain hidden until the reveal flow.
- [x] Offline state clearly requires reconnection for partner links/reveal status.

## Results
- [x] Results & Reveal 2.0 remains loaded.
- [x] Lowest-score Couple Spark activities remain loaded.
- [x] QA mode remains available.

## PWA / resilience
- [x] Web manifest and distinct Couple Check icon are present.
- [x] Service-worker app shell is present.
- [x] Install/Add to Home Screen UX is present.
- [x] Interrupted-test resume is present.
- [x] PWA QA presets cover resume, offline, invalid/expired reveal, and clearing saved state.

## Release gate
Build must deploy successfully on Vercel with no build errors. Production runtime-error check must be clean immediately after release. Manual device smoke testing remains recommended for OS-native install prompts, share sheets, and installed-mode launch behavior.