# Working Agreement
NOTE: Claude AI was used to draft this file

This is how we actually worked with our genAI teammate, and how we would ask the next team to work with theirs. It describes practices, not people. For project status, see [HANDOFF.md](HANDOFF.md).

> **Draft note:** the "Our protocol" column below needs the lines from the Architecture Investigation protocol. Replace each `[protocol: …]` before submitting. The "What we did" column is written from our own sessions.

## The agreement

1. **The genAI proposes; a person decides.** Generated code, stories and text are drafts. Nothing goes into the repo until a person has read it and run it. We asked the genAI not to change files until we had reviewed its plan.
2. **Read the project before designing.** The genAI reads the repo (files, scripts, `AGENTS.md`, CI config) before it suggests a structure or writes a file.
3. **Ask what exists, then build.** Before a screen or feature is written, the genAI asks what data it will read, who owns that data, and whether it exists yet. A named person answers. If nobody can answer, that is the first task.
4. **Do not edit someone else's file without asking.** Files another teammate is working in stay untouched until that teammate agrees. We open a pull request instead of changing shared code directly.
5. **Verify generated work three ways.** Run `npx expo lint` and `npx tsc --noEmit`, run the screen in the browser or Expo Go, then let CI run. A screen that renders is not a screen that is right.
6. **Review generated code like a teammate's.** We ask the genAI for a code review of our own file before opening a pull request, and we read its findings critically. Findings that touch shared code wait for team agreement.
7. **Ask for explanations when the stack is new.** Contributors who do not know a language or framework ask the genAI to explain the code in terms they know, line by line, before they keep it. A contributor should be able to explain code they commit.
8. **Push back on requirements together.** We ask the genAI to critique a user story (who, why, testable criteria) before we post it. The genAI says when it is guessing, and the team checks the guess against the real source, such as an instructor's feedback.
9. **Check current facts.** Expo changes every release, so the genAI fetches the docs for the project's SDK version instead of answering from memory (this is in `AGENTS.md`).
10. **Say what the genAI did.** We label genAI contributions and cite the tool where required. Evidence stays in our own notes, not in the public repo.


## What changed and why

- **From "write me a screen" to "what does the game save?"** Early on we asked the genAI for finished screens. It wrote a confident two-player results screen on a data model nobody had built, and we built on it until the real game turned out to be single-player. The cost was rework. Now the genAI asks about the data first and waits for the team's answer (rules 2 and 3).
- **From trusting output to reviewing it.** Code that rendered was treated as done. We now run lint, the type check and a browser check, and we ask for a code review before a pull request (rules 5 and 6). The review found duplicated code and a loading bug, which is why we keep it.
- **From editing shared code to asking first.** The game screen belonged to teammates who were still changing it. Editing it would have risked conflicts, so we kept our screens separate and agreed the link between them as a team (rule 4).
- **From tool to teammate.** The work that went best was a back-and-forth: the genAI pushed back, we answered, and the story changed. The work that went worst was one-way. We aim for the first kind everywhere.

## For the next team and its genAI teammate

Start a session by giving the genAI [ONBOARDING-PROMPT.md](ONBOARDING-PROMPT.md). Then ask it to read the repo and name what it does not know before it writes anything. Keep the rules above in the first message so they apply to every session.