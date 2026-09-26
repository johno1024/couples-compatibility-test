# The Couple Check ♥

A warm, romantic, mobile-first private two-person compatibility and relationship-reflection experience.

## Production status

**v1.0 — production-ready.** The app has completed its release-candidate regression gate. See `RELEASE-QA.md` for the permanent QA matrix.

## Experience

1. Partner 1 enters a nickname and completes the 32-question Couple Check privately.
2. The app creates the private partner/share flow.
3. Partner 2 completes their side without seeing Partner 1's answers.
4. The shared results/reveal experience unlocks after both sides are complete.
5. Results surface compatibility patterns, strengths, differences, and **Couple Spark** activities aimed at the lowest-scoring relationship categories.

## Included

- Complete 32-question Couple Check
- Multiple-choice, rating, select-all, and paired-statement question types
- Private server-synced partner flow
- Share Link + Private Reveal Link
- Results & Reveal 2.0
- Lowest-score **Couple Spark** activities
- Mobile-first interaction polish
- Installable PWA with offline app shell
- Interrupted-test Resume / Start Over support
- Connectivity and invalid/expired-link handling
- Integrated QA mode and PWA regression presets

## Privacy and connectivity

Partner answers remain hidden during test-taking and are surfaced through the intended reveal flow. Server-synced partner links, session status, and reveal synchronization require an internet connection; the local app shell and supported in-progress state can remain available offline.

> The Couple Check is an informal conversation/reflection experience, not a clinical or validated relationship assessment.

## QA

Use the repository QA entry point / QA mode for fast flow, reveal, resume, activity, and PWA regression scenarios. `RELEASE-QA.md` is the release gate and should be updated whenever a future change affects a checked flow.

## Version

Current production milestone: **1.0.0**.
