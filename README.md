# Suyash Patil — Portfolio

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · lucide-react

Live: https://www.suyashpatil.me

---

## ✅ Edit-once content

All content lives in **`lib/data.ts`**. Update name, links, metrics, experience, projects, publications, skills, certifications, education and contact from that single file.

Search for `// TODO:` in `lib/data.ts` to find placeholder URLs you must replace before going live:

- `personal.github` → your real GitHub URL
- `personal.linkedin` → your real LinkedIn URL
- `projects[0].link` (Knowledge-Grounded Article Generator) → real repo URL

LeetCode, CodeChef and IEEE paper links are already real (taken from your current live site / resume).

---

## 📄 Resume

Drop your one-page resume as **`public/resume.pdf`**. The hero and contact "Download Resume" buttons already point to `/resume.pdf`.

You can delete `public/RESUME_PLACEHOLDER.txt` once your resume PDF is in place.

---

## 🛠 Local development

```bash
# install
npm install

# dev (http://localhost:3000)
npm run dev

# production build
npm run build
npm run start
```

Node 18.17+ recommended (Next.js 14 requirement).

---

## 🚀 Deployment to www.suyashpatil.me (Vercel)

Your current site is already a Vercel project (v0-generated). You have two clean paths.

### Option A — replace the existing repo's content on a feature branch

```bash
# Step 1: from inside your existing portfolio repo, ensure a backup branch exists
git checkout main
git pull origin main
git checkout -b backup-current-portfolio
git push origin backup-current-portfolio

# Step 2: switch back and create the overhaul branch
git checkout main
git checkout -b portfolio-overhaul

# Step 3: WIPE existing source (preserving .git, .gitignore, README if you want)
# Windows PowerShell:
Get-ChildItem -Force | Where-Object { $_.Name -notin '.git','.gitignore' } | Remove-Item -Recurse -Force
# Git Bash / macOS / Linux:
find . -maxdepth 1 -mindepth 1 ! -name '.git' ! -name '.gitignore' -exec rm -rf {} +

# Step 4: copy the new portfolio contents into the repo root
# (extract this folder's contents over the cleaned repo)

# Step 5: install, verify, commit, push
npm install
npm run build
git add .
git commit -m "Major portfolio overhaul for Data and AI Systems positioning"
git push origin portfolio-overhaul

# Step 6: open a PR on GitHub → preview deployment auto-spawns on Vercel
# Step 7: when ready, merge to main
git checkout main
git pull origin main
git merge portfolio-overhaul
git push origin main
```

### Option B — direct push to main (faster, no PR)

```bash
git checkout main
git pull origin main
# (run Step 3 wipe + Step 4 copy from above)
npm install
npm run build
git add .
git commit -m "Portfolio overhaul: Software Engineer — Data & AI Systems"
git push origin main
```

### Vercel settings

If Vercel was set up from v0, no changes needed — it auto-detects Next.js. If you start fresh:

- **Framework preset**: Next.js
- **Build command**: `next build` (default)
- **Output directory**: `.next` (default)
- **Install command**: `npm install` (default)
- **Node**: 18.x or 20.x

The custom domain `www.suyashpatil.me` should already be attached. After the push, Vercel will redeploy automatically.

---

## 🔍 Verify after deploy

1. Visit https://www.suyashpatil.me — hard refresh (Cmd/Ctrl + Shift + R)
2. Test:
   - Sticky nav highlights active section as you scroll
   - Dark/light toggle (top-right) persists across reloads
   - "Resume" buttons download `resume.pdf`
   - All external links open in new tabs
   - Mobile view (320px – 480px) renders cleanly
3. Run Lighthouse → expect ≥ 95 Performance / 100 Accessibility on desktop

---

## 📁 Project structure

```
.
├── app/
│   ├── globals.css      ← design tokens + tailwind layers
│   ├── layout.tsx       ← fonts, SEO metadata, theme init
│   └── page.tsx         ← composes all sections
├── components/          ← one file per section
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Metrics.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Publications.tsx
│   ├── Skills.tsx
│   ├── Achievements.tsx
│   ├── Education.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── SectionHeader.tsx
│   └── ThemeToggle.tsx
├── lib/
│   ├── data.ts          ← all content lives here
│   └── utils.ts         ← cn() helper
├── public/
│   └── resume.pdf       ← add yours
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🎨 Design system summary

- **Theme**: dark-first, light toggle persisted to localStorage
- **Colors**: zinc-950 surface, emerald-400 accent (used sparingly), no gradients/neon
- **Type**: Geist Sans (display + body) + Geist Mono (labels, metrics, system info)
- **Motion**: Framer Motion, restrained — staggered fades on scroll, hover state borders
- **Aesthetic**: "engineering logbook" — numbered sections (01–10), monospace section labels, hairline borders, status dots

To swap the accent color, edit `--accent` and `--accent-dim` in `app/globals.css`.

---

## 🧰 Stack rationale

- **Next.js 14 App Router**: fast, SEO-friendly, free hosting on Vercel
- **Geist via `next/font/google`**: zero-config web font, no extra package
- **Framer Motion**: industry-standard, ~30KB gzipped
- **No shadcn/ui**: every component is local — easier to customize, no install drift
- **No react-icons**: only `lucide-react` for UI icons — avoids the simple-icons name churn
