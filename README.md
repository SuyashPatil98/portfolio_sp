# Suyash Patil — Portfolio

A personal portfolio for a Software Engineer working in **Data & AI Systems**. Built as a single-page Next.js 15 app, deployed to Vercel, with a persistent view counter, lead-capture form, and resume-download tracker — all running on free-tier infrastructure.

**Live:** [https://www.suyashpatil.me](https://www.suyashpatil.me)

---

## ✨ What this site does

- Showcases experience, projects, publications, skills, and education in a clean engineering-logbook aesthetic.
- **Two themes**: dark default + a synthwave-style "fun mode" (neon baby pink on black) you can toggle from the navbar.
- **Live view counter** in the SYSTEM_INFO card, persisted in Redis.
- **Inline lead-capture form** in the Contact section — every submission lands in a Google Sheet and sends you an email notification.
- **Resume-download tracking** — every click on a "Download Resume" button logs to a second sheet tab and pings your inbox.

All three serverless features cost $0/month on personal-site traffic.

---

## 🧱 Tech stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 (App Router) + React 18 |
| Language | TypeScript 5.6 (strict mode) |
| Styling | Tailwind CSS 3.4 + CSS custom properties for theming |
| Animation | Framer Motion 11 (restrained — fades + slides on scroll) |
| Icons | lucide-react |
| Fonts | Geist Sans + Geist Mono via `next/font/google` |
| Hosting | Vercel (Hobby plan, free) |
| View counter | Upstash Redis (REST API, free tier) |
| Lead storage | Google Sheets API (free) via `googleapis` + JWT service account |
| Email notifications | Resend (free tier — 3k emails/month) |

No databases to provision, no servers to maintain. Everything is a Vercel serverless function calling out to managed services.

---

## 📁 Directory structure

```
.
├── app/
│   ├── api/
│   │   ├── views/route.ts             ← Upstash counter (GET reads, POST increments)
│   │   ├── leads/route.ts             ← Lead form → Google Sheet + email
│   │   └── resume-click/route.ts      ← Resume click → Google Sheet + email
│   ├── globals.css                    ← Tailwind layers, design tokens (CSS vars), fun-theme styles
│   ├── layout.tsx                     ← Root layout: fonts, metadata, pre-paint theme script
│   └── page.tsx                       ← Composes all section components in order
│
├── components/
│   ├── Navbar.tsx                     ← Sticky nav with scroll-spy (IntersectionObserver)
│   ├── Hero.tsx                       ← Landing section + SYSTEM_INFO card with live VIEWS row
│   ├── About.tsx                      ← Intro + four-card "intersection" grid
│   ├── Metrics.tsx                    ← Impact metrics grid (8 stat cards)
│   ├── Experience.tsx                 ← Roles, dates, bullet points, stack chips
│   ├── Projects.tsx                   ← Filterable project cards (All / Open / Research / Case Study)
│   ├── Publications.tsx               ← Tabular list of papers with status pills
│   ├── Skills.tsx                     ← Skill groups in card grid
│   ├── Achievements.tsx               ← Achievements + certifications
│   ├── Education.tsx                  ← Degrees + schools
│   ├── Contact.tsx                    ← Channels + resume CTA + inline LeadForm
│   ├── LeadForm.tsx                   ← The lead-capture form itself
│   ├── Footer.tsx                     ← Footer with build date, location, email
│   ├── SectionHeader.tsx              ← Reusable section header (index + label + title)
│   └── ThemeToggle.tsx                ← Dark ↔ fun toggle (sparkles ↔ moon icon)
│
├── lib/
│   ├── data.ts                        ← ⭐ ALL portfolio content lives here. Edit this to update the site.
│   ├── notifications.ts               ← appendRow() + sendNotificationEmail() helpers
│   └── utils.ts                       ← cn() className helper (clsx + tailwind-merge)
│
├── public/                            ← Static assets (favicon, resume PDF if self-hosted, OG images)
│
├── .env.local.example                 ← Env-var template (real values go in .env.local, git-ignored)
├── .gitignore                         ← Includes patterns to block service-account JSONs from commits
├── next.config.mjs                    ← Strict mode, no x-powered-by header
├── tailwind.config.ts                 ← CSS-variable-based color system, custom animations
├── postcss.config.mjs                 ← Tailwind + autoprefixer
├── tsconfig.json                      ← Strict TS, `@/*` path alias to root
├── package.json
└── README.md                          ← This file
```

---

## 🔗 How it's wired — request lifecycles

### Page render
```
Browser GET /
  → app/layout.tsx (RootLayout) — injects fonts, theme-init script, metadata
    → app/page.tsx — renders Navbar + 10 section components + Footer
      → each section component imports its content from lib/data.ts
```

### Theme toggle
```
User clicks Sparkles/Moon icon
  → components/ThemeToggle.tsx — adds/removes ".fun" class on <html>
  → app/globals.css ".fun" rules switch CSS variables to neon pink + black
  → localStorage["theme"] persists choice
  → On next page load, inline script in layout.tsx re-applies before paint (no flash)
```

### View counter
```
Hero component mounts (client-side)
  → checks sessionStorage["portfolio-view-counted"]
  → if absent: fetch("/api/views", { method: "POST" }) → increments Redis key, returns new count
  → if present: fetch("/api/views") → just reads current count
  → number rendered in the VIEWS row of the SYSTEM_INFO card
```

### Lead capture
```
User submits LeadForm
  → fetch POST /api/leads with JSON { name, email, company, message, source }
  → app/api/leads/route.ts validates fields (required, regex, length caps)
  → calls lib/notifications.ts → appendRow("Leads!A:G", [...])
    → googleapis JWT-auths with GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_PRIVATE_KEY
    → appends a row to your Sheet
  → calls sendNotificationEmail(subject, html)
    → POST to Resend's REST API with RESEND_API_KEY
    → email lands in NOTIFY_EMAIL inbox
  → 200 OK → form shows green success state
```

### Resume download tracking
```
User clicks a "Resume" / "Download Resume" link
  → onClick handler fires fetch("/api/resume-click", { method: "POST" }) — fire-and-forget
  → browser follows the <a href> to the resume URL (Google Drive in default config)
  → app/api/resume-click/route.ts appends to "Downloads!A:C" + sends email
```

---

## 🛠 Set up your own portfolio from this repo

Total time: ~30 min the first time, ~10 min if you've used these services before.

### 1) Fork or clone

```bash
git clone https://github.com/SuyashPatil98/portfolio_sp.git my-portfolio
cd my-portfolio
npm install
```

Node 18.17+ required.

### 2) Customize all content in one file

Open [`lib/data.ts`](lib/data.ts). Replace every field:

- `personal.*` — name, location, email, phone, links (GitHub, LinkedIn, LeetCode, CodeChef, resume URL)
- `hero.subtitle`, `hero.badges`
- `about.intro`, `about.intersection[]`
- `metrics[]`
- `experience[]`
- `projects[]` — kind is one of `"Open Project"`, `"Research"`, or `"Professional Case Study"`
- `publications[]` — status is one of `"Published"`, `"Under Review"`, or `"Submitted"`
- `skillGroups[]`
- `certifications[]`
- `achievements[]`
- `education[]`
- `nav[]` — section labels + anchor IDs (must match the `id` attrs on section elements)

That's it. You should not need to touch any component file for content changes.

### 3) Set up the view counter — Upstash Redis (free)

1. [https://console.upstash.com/](https://console.upstash.com/) → sign in with GitHub.
2. **Create Database** → region near your audience → name it `portfolio-views` → **Create**.
3. Scroll to **REST API** → copy:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

No credit card needed. Free tier = 10k commands/day.

### 4) Set up lead storage — Google Sheets

#### 4a) Create the spreadsheet

1. [https://sheets.google.com](https://sheets.google.com) → blank spreadsheet → name it `Portfolio Leads`.
2. Rename `Sheet1` to exactly **`Leads`** (case-sensitive). Add header row:
   ```
   Timestamp | Name | Email | Company | Message | Source | User-Agent
   ```
3. Click **`+`** at bottom to add a second tab named exactly **`Downloads`**. Add header row:
   ```
   Timestamp | User-Agent | Referer
   ```
4. From the Sheet URL `https://docs.google.com/spreadsheets/d/<THIS_ID>/edit`, copy the ID → that's `GOOGLE_SHEET_ID`.

#### 4b) Create a service account

1. [https://console.cloud.google.com/](https://console.cloud.google.com/) → create a project (`portfolio-leads`).
2. Top search → **Google Sheets API** → **Enable**.
3. **APIs & Services → Credentials → Create Credentials → Service account**:
   - Name: `portfolio-sheets-writer`
   - **Create and continue → Done**.
4. Click the new service account → **Keys** tab → **Add key → Create new key → JSON** → downloads a `.json` file.
5. **Save the JSON outside your repo** (e.g., `C:\Users\<you>\portfolio-leads.json`). Never commit it.
6. From the JSON, you need:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`

#### 4c) Share the Sheet with the service account

Open the Sheet → top-right **Share** → paste the service account's `client_email` → set role to **Editor** → **uncheck "Notify people"** → **Share**.

### 5) Set up email notifications — Resend (free)

1. [https://resend.com](https://resend.com) → sign up.
2. **API Keys → Create API Key** → copy → `RESEND_API_KEY`.
3. **First-test path (no domain)**: set `RESEND_FROM=Portfolio <onboarding@resend.dev>`. Resend will only deliver to your signup email until you verify a domain — set `NOTIFY_EMAIL` to that address for now.
4. **Production path**: [https://resend.com/domains](https://resend.com/domains) → Add Domain (e.g., `yourdomain.com`) → add the TXT (and optional MX) records Resend shows in your DNS host → wait ~10 min → click Verify. Then change `RESEND_FROM=Portfolio <notify@yourdomain.com>` and `NOTIFY_EMAIL=<wherever you want>`.

### 6) Configure `.env.local`

```bash
cp .env.local.example .env.local
```

Fill in:

```env
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=...

GOOGLE_SHEET_ID=...
GOOGLE_SERVICE_ACCOUNT_EMAIL=portfolio-sheets-writer@....iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"

RESEND_API_KEY=re_...
RESEND_FROM=Portfolio <onboarding@resend.dev>
NOTIFY_EMAIL=you@example.com
```

The `GOOGLE_PRIVATE_KEY` either as a single-quoted string with `\n` escape sequences (as above) OR as a real multi-line PEM block — `lib/notifications.ts` handles both.

### 7) Test locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000):

- **VIEWS** row in the SYSTEM_INFO card shows a number (not `...`)
- Submit the Contact form → row appears in your Sheet (`Leads` tab) + email arrives
- Click any **Download Resume** button → row appears in `Downloads` tab + email arrives
- Toggle theme via the sparkles icon (top-right) → neon pink mode → reload → persists

If anything fails, the terminal running `npm run dev` will show the exact error.

### 8) Deploy to Vercel

1. Push your customized repo to GitHub.
2. [https://vercel.com](https://vercel.com) → **Add New → Project** → import your repo.
3. Framework auto-detects as Next.js. Default build settings work.
4. **Before clicking Deploy**, go to **Settings → Environment Variables** and add all 8 keys from your `.env.local`. **For each**, tick both **Production** and **Preview**.
5. Special care with `GOOGLE_PRIVATE_KEY`: paste it as-is (multi-line or `\n`-escaped, no surrounding quotes). The Vercel UI accepts both.
6. Now deploy.

### 9) Attach your custom domain

1. Buy a domain (Namecheap, Cloudflare Registrar, anywhere).
2. Vercel → Project → **Settings → Domains** → Add Domain → enter your domain.
3. Vercel shows DNS records to add. For Namecheap:
   - Manage → Advanced DNS → ADD NEW RECORD
   - Type `A` for apex domain (`yourdomain.com`) → Host `@` → Value = Vercel's IP
   - Type `CNAME` for `www` → Host `www` → Value = `cname.vercel-dns.com.`
4. Wait 5-30 minutes for DNS propagation. Vercel issues an SSL cert automatically.

### 10) Smoke-test production

Visit:
- `https://yourdomain.com/api/views` → should return `{"count": N}`
- The site itself → run through the same checklist as local

If a 500 appears anywhere, check Vercel → **Logs** (filter by the failing route path) for the actual error.

---

## 🎨 Customization tips

### Change the accent color

Edit CSS variables in [`app/globals.css`](app/globals.css):

```css
:root {
  --accent: 52 211 153;       /* dark theme — emerald-400 */
  --accent-dim: 16 185 129;
}
.fun {
  --accent: 255 143 209;      /* fun theme — neon baby pink */
  --accent-dim: 255 73 198;
}
```

Values are space-separated RGB so Tailwind's `text-accent/40` opacity modifiers continue to work.

### Add a new section

1. Create `components/MySection.tsx` with `"use client"` at the top.
2. Use `<SectionHeader index="11" label="Mine" title="..." />` for the heading.
3. Add the section to `app/page.tsx` between existing sections.
4. To make it nav-linkable: add an entry to `nav` in `lib/data.ts` and ensure the section's root element has a matching `id`.

### Make `fun` the default

In `app/layout.tsx`, change the inline `themeInit` script so that the absence of a localStorage key applies `fun` instead of dark.

### Self-host the resume PDF

1. Drop your `resume.pdf` into `public/`.
2. Change `personal.resumeUrl` in `lib/data.ts` to `"/resume.pdf"`.
3. The download tracker still works (the click handler fires regardless of URL target).

### Disable lead capture / view counter

If you don't need them: delete the relevant route files in `app/api/`, remove `<LeadForm />` from `Contact.tsx`, and remove the `useEffect` block in `Hero.tsx`. Nothing else depends on them.

---

## 🧪 Local scripts

```bash
npm run dev     # http://localhost:3000 with hot reload
npm run build   # production build (typechecks too)
npm run start   # serve the production build locally
npm run lint    # next lint
```

---

## 🔐 Security notes

- The `.gitignore` blocks `*service-account*.json`, `*-credentials*.json`, `portfolio-leads-*.json`, and `*.pem` from accidental commits.
- GitHub's push protection is the second layer — if a service-account key slips past `.gitignore`, GitHub will reject the push.
- The `detail` field in `/api/leads` 500 responses leaks exception messages to the client. It's useful for first-time debugging but consider removing it once your setup is stable.
- `NEXT_PUBLIC_*` env vars are **not** used here. All secrets stay server-side.

---

## 💰 Cost

Free at typical personal-portfolio scale (a few hundred to a few thousand visitors/month). See free-tier limits:

| Service | Free until |
|---|---|
| Vercel Hobby | 100 GB bandwidth/month, 100k function invocations/month |
| Upstash Redis | 10k commands/day |
| Google Sheets API | unlimited (no paid tier exists) |
| Resend | 3k emails/month, 100/day |

A portfolio receiving 100 visits/day uses under 5% of any of these. No credit card required to start.

---

## 📜 License

MIT — see [LICENSE](LICENSE).

---

## 🙋 Questions / contact

Open an issue on this repo, or hit me at the email listed at the bottom of the site.
