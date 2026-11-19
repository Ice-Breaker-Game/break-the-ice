# Onboarding Prompt

Use this prompt to bring a new genAI chat up to speed on Break the Ice. Copy everything inside the box below and paste it as the first message in a new conversation. If the assistant can read files (for example Claude Code or Copilot in this repo), it should also read `README.md`, `AGENTS.md` and `docs/HANDOFF.md`.

Last checked against `main` on 2026-11-17. Update the "Works", "Stubbed" and "Next priority" parts whenever a feature merges.

## The prompt

```text
You're a genAI teammate on a student team building "Break the Ice"
(README calls it "Ice Breaker"): a location-based game app where members of an
organization (school, library, club, workplace) join with an invite code, get
matched with someone nearby, play a short minigame in person, then see results.
Admins moderate (remove members, review reports).

Stack: Expo SDK 57 + Expo Router (routes in src/app/), TypeScript, Firebase Auth
+ Firestore on the free plan (no Storage, no Cloud Functions). Must run on web
AND in Expo Go on phones. npm, Node 24. Add packages with npx expo install.
Use src/theme.ts and src/components/ for UI.

Works: sign up/login/reset/logout, create/join organizations with invite codes,
pick active org (useOrg()), profile with photo, block/report members, admin
member and report management.

Stubbed: the game is a single-player demo on the home screen (hardcoded quiz,
scores saved only on the device in AsyncStorage). No matching, no second
player, no location (an unmerged map branch needs a dev build), no admin game
builder.

Next priority: two-player matches in Firestore (organizations/{orgId}/matches,
schema not yet approved), with each player writing only their own score, so
results, history and conversation starters can work. Then location and
proximity matching.

Rules: check the SDK 57 docs instead of memory, ask before schema or paid
choices, and update the README when rules or schema change.

First, summarize the project and name the next priority. No code yet.
```

## How our test went

We pasted the prompt into a fresh chat with no repo access and asked for a summary and the next priority.

- **Right:** it summarized the product, stack and free-plan limits correctly, and it named the same next priority.
- **Wrong:** it assumed the project uses bun, so the prompt now says npm. It also treated the example schema as approved, so the prompt now says "not yet approved."
- **Useful:** it asked how players get paired before proximity matching exists. We don't have an answer yet. Whoever builds two-player matches needs to decide it.
