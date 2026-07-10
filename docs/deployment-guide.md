# Deployment Guide — OpNarrate AI

Follow these steps in order. Estimated time: 20–30 minutes for a first-time setup.

## 1. Create Accounts (skip any you already have)
1. **GitHub** — [github.com/signup](https://github.com/signup) (free).
2. **Vercel** — [vercel.com/signup](https://vercel.com/signup) — sign up using **"Continue with GitHub"** so it can deploy directly from your repo (free Hobby tier is sufficient).
3. **Anthropic API key** — [console.anthropic.com](https://console.anthropic.com/) → Settings → API Keys → Create Key. Copy it somewhere safe; you will paste it into Vercel, never into any file you commit.

## 2. Push the Project to a Public GitHub Repository
From the unzipped `opnarrate-ai` project folder on your computer, open a terminal:

```bash
cd opnarrate-ai
git remote add origin https://github.com/<your-username>/opnarrate-ai.git
git push -u origin main
```

If you have not created the GitHub repo yet: go to [github.com/new](https://github.com/new), name it `opnarrate-ai`, set visibility to **Public**, do **not** initialize with a README (this project already has one), then use the `git remote add` command GitHub shows you.

> The project already has 6+ commits and full git history — you are pushing existing history, not starting fresh.

## 3. Import the Project into Vercel
1. Go to [vercel.com/new](https://vercel.com/new).
2. Select **Import Git Repository** and choose your `opnarrate-ai` repo.
3. Framework preset: Vercel auto-detects **Next.js** — leave defaults.
4. Before clicking Deploy, expand **Environment Variables** and add:

| Name | Value |
|---|---|
| `ANTHROPIC_API_KEY` | *(paste your real key from Step 1.3)* |
| `ANTHROPIC_MODEL` | `claude-sonnet-4-5-20250929` (optional — has a safe default in code) |

5. Click **Deploy**. Vercel will build and give you a live URL such as `https://opnarrate-ai.vercel.app`.

## 4. Verify GitHub Actions CI
Push (or re-push) to `main` and open the **Actions** tab on your GitHub repo. Confirm the `CI` workflow runs and all steps (install, lint, test, build) pass. This workflow validates the codebase on every push/PR — it does not perform the deployment itself; Vercel's own GitHub integration handles deployment automatically on push to `main`, which is the recommended, secret-free way to wire CI + CD together for this stack.

## 5. Test the Live App (Incognito)
1. Open the Vercel URL in an **incognito/private window**.
2. Fill out the intake form for a sample case (e.g., select "Cesarean Section", fill required fields, type a short case summary).
3. Click **Generate Operative Technique & Findings** and confirm both sections populate within ~30 seconds.
4. Confirm the amber "AI-Generated Draft — Physician Review Required" banner is visible.

## 6. Confirm No Secrets Are Exposed
- View source / inspect network requests in the browser: the `ANTHROPIC_API_KEY` should never appear in any client-side JS bundle or network response.
- Confirm `.env` is **not** present in the GitHub repo (only `.env.example` should be tracked — check via the GitHub file browser).

## 7. Basic Monitoring / Analytics
`@vercel/analytics` is already wired into `app/layout.tsx`. After your first deploy:
1. In the Vercel dashboard, open your project → **Analytics** tab.
2. Click **Enable** (free tier covers basic page-view and Web Vitals monitoring).
3. Visit the live URL a few times to confirm events appear within a few minutes.

## Troubleshooting
| Symptom | Likely cause | Fix |
|---|---|---|
| "AI service is not configured" error on the live site | `ANTHROPIC_API_KEY` missing in Vercel Environment Variables | Add it under Project Settings → Environment Variables, then redeploy |
| Dictation button does nothing | Browser without Web Speech API support (e.g., Firefox, Safari) | Use Chrome/Edge for dictation, or type the summary manually — this is expected graceful degradation |
| GitHub Actions build fails on `npm ci` | `package-lock.json` missing or out of sync | Run `npm install` locally once and commit the generated `package-lock.json` |
