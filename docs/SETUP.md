# Setup Checklist & Troubleshooting

Finish the setup steps in the [README](../README.md#getting-started) first, then use this page to confirm everything works.

## Check your setup

Run through this once after setup to make sure everything works:

1. **Node version:** `node -v` should print `v24.x`. If it doesn't, run `nvm use`.
2. **Environment variables:** when you run `npx expo start`, the first lines should list all six `EXPO_PUBLIC_FIREBASE_...` variables:
   ```
   env: load .env
   env: export EXPO_PUBLIC_FIREBASE_API_KEY EXPO_PUBLIC_FIREBASE_APP_ID ...
   ```
   If that line is missing or has fewer than six names, check your `.env`.
3. **Web:** press `w`. The app opens in your browser with no red errors.
4. **Phone:** scan the QR code. The app opens in Expo Go, and the terminal shows `iOS Bundled` or `Android Bundled`.
5. **Firebase:** to confirm Firebase loads, temporarily add this inside the component in `src/app/index.tsx`:
   ```js
   import { auth, db } from "@/firebase";
   // inside the component:
   console.log("db:", db.app.options.projectId);
   console.log("auth:", auth.app.name);
   ```
   You should see the project ID and `auth: [DEFAULT]` in the browser console (Cmd+Option+J) and in the terminal for the phone. **Remove the test code afterward.**
6. **Project checks:** these should all pass before you open a PR:
   ```sh
   npx expo lint        # code style / common mistakes
   npx tsc --noEmit     # type check
   npx expo-doctor      # dependency and config problems
   ```

## Troubleshooting

| Problem | Fix |
|---|---|
| `EBADENGINE Unsupported engine` warnings during install | You're on an old Node version. Run `nvm use` (or `nvm install 24`), then `npm install` again. |
| `Unable to run simctl` when starting | Harmless. Expo is looking for the iPhone simulator (Xcode). Ignore it if you're testing on a real phone. |
| iPhone camera says **"No usable data found"** | Install (or update) Expo Go, then scan again. |
| Expo Go says **"You need to be signed in"** | Run `npx expo login --browser` on your computer, and sign in to Expo Go with the **same** account. |
| Phone finds the project but loading hangs or times out | Your Wi-Fi is blocking the connection (common on campus). Restart with `npx expo start --tunnel`. |
| Firebase values show up as `undefined` | Restart `npx expo start` after editing `.env`. In code, write each variable out in full (`process.env.EXPO_PUBLIC_...`), not destructured or as `process.env[name]`. |
| `npm warn install-scripts ... not yet covered by allowScripts` | New packages with install scripts need approving (npm 11). Review them with `npm install-scripts ls`. The current ones are already approved in `package.json`. |
| `npm audit` reports vulnerabilities | Normal for Expo projects. **Don't** run `npm audit fix --force`, because it can break Expo. |
