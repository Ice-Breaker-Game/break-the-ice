# Handoff
NOTE: Claude AI was used to draft this file

This page is for the next team (and its genAI teammate). It says what exists, what is rough, what is still open, and what we would do next. For how we worked, see [WORKING-AGREEMENT.md](WORKING-AGREEMENT.md). To run the app, see the [README](../README.md#getting-started).

## Where things stand

### Works
- **Accounts:** sign up, log in, log out, forgot-password email. Logged-in and logged-out screens are separate route groups in `src/app/`.
- **Organizations:** create one (the creator becomes admin), join with an invite code, switch the active organization, and list your organizations with your role.
- **Invite codes:** unique, shareable and regenerable by admins.
- **Members:** admins can view members and remove anyone but themselves.
- **Safety:** members can block and report other members. Admins see a Reports tab.
- **Profile:** edit display name and picture.
- **Game:** the Question Challenge on the home screen (3 questions, 60-second timer, a random minigame, then an icebreaker prompt).
- **Results and history:** `results.tsx` shows the latest game (percent bar, correct and missed counts, comparison with the previous game, personal best, average and best). `history.tsx` lists every saved game, newest first.
- **Shared look:** one theme (`src/theme.ts`) and shared components (`src/components/`). New screens should use them.

### Stubbed or not built
- **The game is single-player.** The README's vision is people playing together at approved locations. Nothing connects two players yet.
- **Scores live on the device only** (AsyncStorage, key `question-challenge-scores-<user id>`). They are not in Firestore, so they do not follow a user to another phone.
- **The organization page is a placeholder.**
- **Game builder:** organizers cannot create games with their own content yet.**
- **Location and map:** a map and proximity feature was developed on a separate branch. Check whether it is merged and working before you plan around it.**
- **The game end screen shows its own score card** and does not navigate to `/results`. The two screens are separate on purpose (see below).

## Known issues
1. **Lint warning** in `src/app/(logged-in)/index.tsx`: `finishGame` should be wrapped in `useCallback`. CI passes with it, but fix it.
2. **Duplicated score code.** The storage key and the `ScoreRecord` type are copied into `index.tsx`, `history.tsx` and `results.tsx`. Move them to one shared module (for example `src/utils/scores.ts`) so they cannot drift apart.
3. **Results error state.** If loading saved scores fails, `results.tsx` shows the error and "No games played yet." together. Show only the error.
4. **Unchecked data.** Saved scores are parsed with a type cast, not validated. Corrupt storage would crash the screen.
5. **"Personal best" counts ties.** A game that only equals the old best is labelled a personal best.
6. **History rows do not open the results screen.** `results.tsx` already accepts `?completedAt=`; the rows just need to link to it.
7. **Accessibility:** the results progress bar has no accessibility labels.

## Open questions
- Where should scores live once there is more than one player: a per-game Firestore document, or something else? This decides the results and history screens.
- Who owns the game data model? Until one owner writes it down, screens built on a guess will break.
- What does "approved location" mean in practice (a GPS radius, a code at the venue, an admin check-in)?
- Should the game end screen and the results screen become one screen? We kept them separate so teammates working on the game did not collide with the results work.

## Ideas we did not plant
These came out of design exercises and are not in the backlog yet. Turn each into a user story before you build it.
- **Invitations can be ignored.** Sending an invite and hearing nothing is the hardest moment for someone new. Decide what the sender sees (nothing, a soft "not right now", an expiry) and test it with real people.
- **New to the community, or new to the language.** Plain wording, short prompts and icons would help people who are still learning the language. An icebreaker prompt should never need a long reply.
- **Gentle feedback.** Low scores and missed answers should not feel like failure. The current messages are friendly; keep that tone in new screens.

## What we would do next
1. Agree on and document the game and score data model, with one owner. Everything else depends on it.
2. Move scores into shared code (known issue 2), then into Firestore if scores need to follow a user.
3. Link the game end screen and history rows to `/results`, and remove the duplicate score card once the team agrees.
4. Build a second player into one game, even a simple one, to test the results screens with real opponents.
5. Fix the small issues above (1, 3, 4, 5, 7).
6. Test the invitation idea with a few real people before building more of it.

## Before you change shared code
Screens in `src/app/(logged-in)/index.tsx` belong to whoever is building the game. Ask before editing them, and open a pull request instead of pushing straight to `main`. Run `npx expo lint` and `npx tsc --noEmit` first; CI runs lint, the type check and the web build.