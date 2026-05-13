# The Story Behind This Portfolio

This is the long version — what I built, why I built it, every problem I hit, and how I got past each one. If you're reading this because you forked the repo and want to understand how the pieces actually fit together, this is the document for you.

If you just want to set it up, the [README](README.md) has the dry steps. This one has the *why*.

---

## 1. Where it started

I had a portfolio. It worked. It was generated from a v0.dev template, lived on Vercel at `suyashpatil.me`, looked clean enough, and did the job of showing up when someone Googled my name.

The problem: it didn't say anything. The aesthetic was generic SaaS-landing-page. The copy was bullet points about being "passionate about technology". Nothing about it suggested the person behind it had spent three and a half years building **distributed data pipelines** and **ML platforms** in financial services. If a hiring manager for a Data & AI Engineering role landed there, they'd see "yet another portfolio" — not a profile that mapped to the role.

I wanted something that looked like the kind of engineering I actually do — a little brutal, a little restrained, monospaced labels, hairline borders, numbered sections, metrics with context. Less "creative agency", more "engineering logbook." The kind of thing a senior person reads and thinks *okay, this person has shipped*.

## 2. The first rebuild — get the structure right

I scrapped the old site and started over. The constraints I set for myself:

1. **One file for all content.** I never want to edit a component to change a date or a bullet point. If `lib/data.ts` has the right exports, the entire site re-renders. Adding a job is one object literal; adding a publication is another.
2. **No component libraries.** No shadcn, no Material, no Chakra. Every visual element is a Tailwind-styled local component. That keeps the bundle small and avoids the "framework drift" trap where minor version bumps move components under you.
3. **Restrained motion.** Framer Motion is in the bundle, but every animation uses the same easing curve (`[0.16, 1, 0.3, 1]`) and fires only once on scroll-in. No bouncy, no parallax, no scroll-jacking.
4. **Dark by default.** A portfolio is a tool, not a billboard — most engineers I know read screens in dark mode. I added a light toggle for accessibility but expected almost no one to use it.

The file layout settled into:

- `app/` — the Next.js App Router root. `layout.tsx` injects fonts + global metadata + a tiny pre-paint script for theme. `page.tsx` is just an import-and-arrange list of section components. `globals.css` defines design tokens as CSS variables so the whole color system swaps with a single class on `<html>`.
- `components/` — one file per section (Hero, About, Metrics, Experience, etc.) plus shared primitives (`SectionHeader`, `Navbar`, `Footer`, `ThemeToggle`). Every section file reads its content from `lib/data.ts` and decides only the layout.
- `lib/` — `data.ts` is the source of truth for content. `utils.ts` exports a `cn()` helper for conditional Tailwind classes.

That structure made everything else cheap. Adding sections? Drop another file in `components/` and import it in `page.tsx`. Refactoring the look of every "card"? Update the `.card-hairline` class in `globals.css` once.

## 3. The decision that changed everything

After about a day of work, the static site looked right. It told my story properly. But it had **no signal of being alive**. The view counter (the little number in the SYSTEM_INFO card that says how many people have seen the page) didn't exist. The lead form didn't exist. The "fun mode" toggle didn't exist. Just static content.

I sat back and thought: *if I'm pitching myself as a Data & AI Systems engineer, the site itself should demonstrate that I can wire serverless infrastructure together.* So I added three live features:

1. **A view counter** — a real number that goes up. Needs persistent storage outside Vercel's read-only filesystem.
2. **A lead-capture form** — visitors can leave their name + email + a note. Needs to write somewhere I can read later.
3. **A resume-download tracker** — every click on a "Download Resume" link logs to that same somewhere, so I can see who came in via my resume vs. my LinkedIn.

And the kicker: **I want to be notified the moment someone leaves their details or downloads my resume**, so I check the storage soon after instead of letting weeks go by.

The constraint: all of this must be free. I'm not paying $20/mo for a hobby project. No databases I have to admin. No always-on servers. Everything on free tiers or it doesn't ship.

## 4. Picking the infrastructure

This is where the "data & AI systems" framing actually paid off, because picking the right managed services is most of the job.

### View counter — Upstash Redis

Vercel's filesystem is read-only at runtime. Function executions are stateless. So a global counter needs to live somewhere else. Options I considered:

- **Vercel KV** — official, but the free tier is small and you have to give Vercel even more of your stack.
- **A flat file in a GitHub repo** — abusable, ugly, and definitely not "engineer who builds data systems."
- **Upstash Redis** — REST-accessible, runs on AWS, free tier is 10,000 commands/day, no card required.

Upstash won immediately. One `INCR` per first page-view, one `GET` for subsequent reads. Each visitor costs me 1-2 commands. At a thousand visitors/day, I'm at 20% of the free limit.

### Lead storage — Google Sheets

Hot take: **Google Sheets is the best free database for personal projects.** It's a CRUD API where the admin UI is also the user UI. I can open it on my phone, sort by date, paste into another tool — all the things a normal database makes hard.

The integration: a Google Cloud service account, the Sheets API enabled on a project, an `INSERT_ROWS` append every time a lead arrives. The `googleapis` Node SDK handles the JWT auth flow.

### Notifications — Resend

For the "text me when something arrives" part, the user explicitly mentioned SMS as an option. I priced it out:

- **Twilio SMS** in India is ~$0.04 per message. Cheap, but you need a credit card and you're paying for a feature that's noisy if you get any kind of bot traffic.
- **Email via Resend** — 3,000 emails/month on the free tier. My phone already pushes Gmail notifications within seconds of delivery. The end-user experience (a buzz on my phone) is identical to SMS.

Resend won on cost. Once I have a verified domain, I can route notifications to any email I want.

### Hosting — already Vercel

Vercel Hobby was already serving the v0 version, so no change there. Next.js + Vercel is the canonical pairing — they share a parent company, so Next features tend to land on Vercel first.

## 5. Wiring it up

This is where I get to talk about each file and what role it plays. Read this with the repo open in another window.

### `app/api/views/route.ts` — the view counter endpoint

Two HTTP methods:

- **`GET /api/views`** — returns the current count without changing it. Used when a visitor reloads or opens a second tab in the same session.
- **`POST /api/views`** — increments and returns the new count. Used the first time a session sees the site.

The Redis client is created from environment variables via `Redis.fromEnv()` — no hardcoded credentials. The Upstash REST API is fast enough that the call from a Vercel function in `iad1` (US East) to the Upstash database in `ap-south-1` (Mumbai) adds maybe 150ms — invisible during page load because the Hero component shows `...` until the count returns.

### `app/api/leads/route.ts` — the lead-capture endpoint

POST-only. The flow:

1. **Parse** the JSON body. If it's malformed, return 400.
2. **Validate**:
   - `name` and `email` required.
   - `email` must match a basic regex.
   - Field lengths capped (name ≤ 120, email ≤ 200, message ≤ 2000) to prevent abuse.
3. **Append** a row to the `Leads` tab of the Google Sheet via `lib/notifications.ts`.
4. **Send** an email to me via Resend with the new lead's details.
5. Return 200.

If the Sheet append throws, the response includes a `detail` field with the actual exception message. (I'll explain why in section 6 — that field saved me an hour of debugging.)

### `app/api/resume-click/route.ts` — the resume tracker

Even simpler. POST-only, fire-and-forget. Appends to the `Downloads` tab and sends a "Resume downloaded" email. Always returns 200 even on failure — the user clicking the link shouldn't be blocked by a logging hiccup.

### `lib/notifications.ts` — the shared infrastructure

Two exported functions:

- `appendRow(range, row)` — JWT-auths with the service account, calls `sheets.spreadsheets.values.append`. The range string (e.g., `"Leads!A:G"`) tells Sheets which tab and column span.
- `sendNotificationEmail(subject, html)` — POSTs to Resend's REST API with the configured `from`, `to`, subject, and HTML body.

The `googleapis` library does the heavy lifting for auth. The `private_key` env var has a quirk: in JSON it's stored with literal `\n` characters (the two characters backslash-n), but the OpenSSL libraries underneath want real newline characters. So `lib/notifications.ts` does `key.replace(/\\n/g, "\n")` to convert. Took me a while to learn that.

### `components/Hero.tsx` — the landing section

This is the only component that talks to an API. On mount, a `useEffect`:

1. Checks `sessionStorage["portfolio-view-counted"]`.
2. If absent, POSTs `/api/views` (first visit in this session) and sets the flag.
3. If present, GETs `/api/views` (just refresh the displayed number).

The returned count goes into local state and renders in the VIEWS row of the SYSTEM_INFO card. While the network call is in flight, the row shows `...`.

The "Resume" button has an `onClick` that fires the resume-click tracker before navigating. The hero also has GitHub, LinkedIn, "View Projects" buttons — those are plain anchors.

### `components/LeadForm.tsx` — the lead-capture form

Lives inline at the bottom of the Contact section (mounted by `Contact.tsx`). Local state holds form fields and a status enum (`idle | loading | success | error`). On submit:

1. State → `loading`.
2. POST to `/api/leads`.
3. On 200 → state → `success`, form clears, success card replaces the form.
4. On non-200 → state → `error`, error banner appears below the button with the message from the response.

If you want to capture more fields (phone, role, etc.), the changes are:
- Add the field to local state and a corresponding `<Field>` in the JSX.
- Update `app/api/leads/route.ts` to validate the new field.
- Add a column to the Sheet's `Leads` tab and update the `appendRow` call to include it.

### `components/ThemeToggle.tsx` — the dark/fun switch

Two states: dark (default) and fun (synthwave neon pink on black). Toggling adds/removes the `.fun` class on `<html>` and writes `theme=dark|fun` to `localStorage`.

A subtle but important detail: the toggle component renders `null` until `useEffect` has run (the `mounted` flag). This is to prevent React hydration mismatches — server-rendered HTML doesn't have the `.fun` class, but if `localStorage` had `theme=fun`, the client-side render would. By delaying render until after `mount`, the toggle's icon matches whatever the inline pre-paint script in `app/layout.tsx` already applied.

### `app/layout.tsx` — the root layout and pre-paint theme script

The pre-paint script:

```js
(function () {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'fun') document.documentElement.classList.add('fun');
  } catch (e) {}
})();
```

This runs before React hydration. Without it, you'd see a flash of dark theme for ~50ms before React picked up the fun preference. With it, the page paints in the right theme immediately.

### `app/globals.css` — the design system

Three big sections:

1. **CSS variables** for both themes. Colors are stored as raw RGB triplets (`52 211 153`) so Tailwind's opacity modifiers (`text-accent/40`) compose with them.
2. **Component classes** like `.btn-primary`, `.btn-bracket`, `.card-hairline` — these are the buttons and cards reused across components. They use Tailwind's `@apply` so they live in CSS but stay in sync with the rest of the styles.
3. **Fun-theme specifics** — neon text-shadow on headings, perspective grid floor (`body::after` with a `rotateX(60deg)` transform), pink horizon glow at top/bottom of the viewport. Only render when `.fun` is on `<html>`.

### `lib/data.ts` — the source of truth

Plain TypeScript object exports. Each section component imports the slice it needs:

```ts
// components/Hero.tsx
import { personal, hero } from "@/lib/data";
```

If I want to change my job title, edit `personal.title` in `data.ts`. If I want to add a publication, push a new object to the `publications` array. The component layer is dumb — it iterates and renders.

The types matter: `Project` and `Publication` are exported types, so when I add a new entry, TypeScript catches missing fields at compile time. The `kind` field on `Project` is a string-literal union, so I can't accidentally type `"Research Project"` instead of `"Research"`.

## 6. Every problem I hit (and how I unblocked)

Building was the easy part. Wiring it to the cloud in a way that actually works in production was where the loops happened. Here's every gotcha, in the order I hit them.

### 6.1. The lead-capture endpoint exploded the first time I tested it locally

```
Sheet append failed: Error: Unable to parse range: Leads!A:G
```

Cause: I had created the Google Sheet but hadn't renamed `Sheet1` to `Leads`. The Sheets API found the spreadsheet, looked for a tab called `Leads`, didn't find one, and 400'd. The fix was a 5-second rename. Tab names are **case-sensitive and whitespace-sensitive** — `leads` and `Leads` and `Leads ` (with a trailing space) are three different things to the API.

Same error showed up for `Downloads!A:C` until I added that tab too.

**Lesson:** When integrating with a new API, the boring set-up steps (rename, share, enable) are 80% of the work. Don't skip them assuming the defaults are right.

### 6.2. Resend refused to send to my Gmail

```
You can only send testing emails to your own email address (24p03f1005@iiitbhopal.ac.in)
```

Resend's free tier in test mode delivers only to the email address you signed up with — until you verify a domain. I'd signed up with my college email but wanted notifications at my Gmail.

Two paths:
- **Easy**: change `NOTIFY_EMAIL` to my college email (which auto-forwards to Gmail anyway).
- **Right**: verify my custom domain `suyashpatil.me` on Resend so I can route notifications anywhere.

I started with the easy path to keep iterating, then did the right one before deploying.

### 6.3. Namecheap's MX record section is hidden

Resend's domain verification needs DNS records — usually TXT records for SPF and DKIM, and an MX record for bounce handling.

On Cloudflare or Vercel DNS, adding records is one form. On Namecheap, **MX records live in a separate section called "Mail Settings"** below the Host Records section. The Type dropdown in Host Records doesn't even include `MX Record` — you have to scroll down, switch the Mail Settings dropdown to **Custom MX**, and use a different table.

Also, Namecheap silently appends your domain to the Host field. If you type `send.suyashpatil.me` in Host, you get a DNS record for `send.suyashpatil.me.suyashpatil.me`. Just type `send`.

**Pro tip**: Resend's DKIM TXT and SPF TXT records are enough for verification. The MX is optional unless you want bounce handling. I skipped it.

### 6.4. GitHub blocked my push because the service-account JSON was in the commit

```
remote: GH013: Repository rule violations found
remote: Push cannot contain secrets
remote: — Google Cloud Service Account Credentials —
remote:    path: portfolio-leads-496209-b92dc7b87c6e.json:1
```

GitHub's push protection caught a real secret leak before it left my machine. I'd downloaded the service-account JSON into `C:\Projects\portfolio\` and run `git add .`, which swept it into the commit.

The recovery had three parts:

1. **Rotate the leaked key.** Even though it never reached GitHub, the key had been sitting in an obviously-discoverable location. I deleted it in Google Cloud Console and created a fresh one.
2. **Remove the bad commit from local history.** `git reset --mixed main` un-committed everything on the feature branch, keeping the changes in my working tree. Then I moved the JSON outside the repo.
3. **Prevent recurrence.** I added patterns to `.gitignore`:
   ```
   *service-account*.json
   *-credentials*.json
   portfolio-leads-*.json
   *.pem
   ```

After that, `git add . && git commit && git push` went through clean.

**Lesson:** Never download credentials into a git-tracked directory. Keep secrets in `~/.secrets/` or a similar out-of-the-way location.

### 6.5. The interrupted rebase that broke my git state

Mid-cleanup, I tried `git pull --rebase origin main` and got:

```
fatal: It seems that there is already a rebase-merge directory, and
I wonder if you are in the middle of another rebase.
```

Leftover state from an earlier interrupted operation. `git rebase --abort` cleared it; if that hadn't worked, `Remove-Item -Recurse -Force .git\rebase-merge` would have.

**Lesson:** Git's metadata directories (`.git/rebase-merge`, `.git/rebase-apply`, `.git/MERGE_HEAD`) live in `.git/`. When git complains about "in the middle of" something, you can almost always clear it by aborting or deleting the relevant subdirectory.

### 6.6. The Vercel duplicate-project trap

This was the worst one — burned over an hour.

I had two Vercel projects without realizing it:
- **`sp-portfolio`** — owned the domain `www.suyashpatil.me`. Originally created when the v0 version was deployed.
- **`portfolio-sp`** — created later when I clicked "Add New Project" instead of "Disconnect/Reconnect Git" on the existing project.

I'd been carefully adding env vars to **`portfolio-sp`**. But the domain pointed at **`sp-portfolio`**, which had zero env vars. So in production:

- `/api/views` failed silently (the route's `try/catch` returns `{count: null}` and a 200 instead of erroring loudly).
- `/api/leads` returned `500: {"error": "Storage failed"}` because `process.env.GOOGLE_SHEET_ID` was undefined.

Vercel's main Logs tab somehow wasn't surfacing the `console.error` from `/api/leads`. I tried multiple times — clearing filters, expanding rows, switching deployments. Nothing.

The breakthrough came from two diagnostics:

1. **I added a `detail` field to the 500 response** that includes the actual exception message:
   ```ts
   const detail = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
   return Response.json({ error: "Storage failed", detail }, { status: 500 });
   ```
   This gave me `Error: Missing GOOGLE_SHEET_ID` directly in the browser response. No more digging through logs.

2. **I added a temporary `/api/debug-env` route** that returns *whether* each env var is set and its length (never the value):
   ```ts
   {
     "presence": {
       "GOOGLE_SHEET_ID": { "present": false, "length": 0 },
       ...
     },
     "allGoogleOrSheetEnvKeys": []
   }
   ```
   The response showed `false` for **everything**, including `UPSTASH_REDIS_REST_URL` (which I had been using "successfully" — actually it was failing silently on every page load).

That ruled out "wrong env var name" — no env vars at all were reaching the function. Which could only mean: the deployment running on the domain was a different Vercel project from the one I'd been editing. Sure enough, the dashboard had two projects.

The fix was to copy the env vars over to `sp-portfolio` and delete `portfolio-sp`. Five minutes of clicks.

**Lessons:**
- When debugging cloud configuration, expose the configuration. A diagnostic endpoint that says "here's what your function actually sees" is worth more than a hundred log searches.
- Always verify, on a freshly deployed function, that env vars are present *before* assuming the bug is anywhere else.
- One Vercel project per site. If your dashboard ever shows two, delete one immediately, before you forget which is which.

### 6.7. The `dangerouslySetInnerHTML` that wasn't dangerous, just lazy

While auditing the existing code, I found that the `Row` component inside `Hero.tsx` used `dangerouslySetInnerHTML` to render a string like `"SDE / ML / Data &amp; AI"`. The only reason `&amp;` was in there was because the dev was using `dangerouslySetInnerHTML` to render it.

Replaced with normal JSX (`{v}`) and the literal `&` character. Same output, no XSS surface (which was nonexistent here anyway since the content was static), and a less surprising read for the next person.

**Lesson:** React's JSX text rendering already handles entities correctly. If you're reaching for `dangerouslySetInnerHTML` to render plain strings, you've taken a wrong turn.

### 6.8. Resume buttons used `download` against a Google Drive URL

The `<a href={resumeUrl} download>` pattern only works for **same-origin** files. Drive's `view?usp=sharing` URLs are cross-origin and respond with HTML (the preview page), so the `download` attribute is silently ignored.

Switched to `target="_blank" rel="noopener noreferrer"` and added the `onClick` tracker. Visitors get the resume; I get the click logged. Cleaner all around.

## 7. The polish pass

After everything was working, a few quality-of-life touches:

- **The `fun` theme** got a perspective grid floor (`body::after` with a `rotateX(60deg)` transform), a pink horizon glow (`body::before` with two radial gradients), and neon text-shadow on all headings (`h1, h2, h3 { text-shadow: 0 0 24px ... }`). All scoped to `.fun` so the dark theme stays clean.
- **The view counter shows `...` while loading** instead of a stale `0`. Subtle but it removes a visual jank.
- **Status pills on publications** use color to convey state without me writing copy: green = Published, amber = Under Review, blue = Submitted.
- **Project filter pills** in the Projects section let visitors slice by `Open Project / Research / Professional Case Study` — useful because each kind tells a different story (built-myself vs. published research vs. real production work).

## 8. Deploying — the safe ordering

After getting burned by the duplicate-project thing, I settled on a deployment order that catches mistakes before they hit production:

1. **Get credentials locally** (Upstash, Google, Resend accounts created, keys downloaded).
2. **Test with `.env.local`** — confirm all three features (view counter, lead form, resume tracker) work end-to-end.
3. **Add env vars to Vercel** for both Production and Preview.
4. **Open a PR**, don't merge yet — Vercel auto-builds a preview deployment with the new env vars.
5. **Test on the preview URL** — same checklist as local, but on real cloud infrastructure.
6. **Merge the PR**, Vercel builds production with the same env vars. Should be identical to the preview.
7. **Smoke-test production**.

Steps 4-5 are the insurance policy. If anything is misconfigured, the preview URL breaks first — not `suyashpatil.me`. By the time you merge, you've already validated the cloud config.

## 9. What I'd do differently next time

A few things, ranked by how much they'd save me:

1. **Use `vercel link` from the CLI to pin a local checkout to its Vercel project.** Would have prevented the duplicate-project trap entirely.
2. **Add the diagnostic endpoint from day one.** I built it under pressure; it should have been there before deploy #1.
3. **Test the cloud build locally with `vercel dev`.** It runs the actual Vercel functions runtime against your local code, including env vars. Would have caught the env-var visibility issue on the right project earlier.
4. **Use `next/dynamic` for `framer-motion` imports.** Each section component pulls in FM, and they're all client components. A few `dynamic(() => import(...), { ssr: false })` wraps would slim the initial JS bundle.

## 10. Why this project matters to me

I've been building data systems professionally for three and a half years. Most of that work is invisible — pipelines move data, jobs retrain models, evaluations gate deploys. The story I tell at interviews is half engineering and half translation: "yes, the pipeline processes 200 GB, here's why that number is hard, here's what fails."

This site is the inverse: a small, visible thing where every piece is mine. The CSS variables that swap between themes. The `INCR` against Redis. The JWT auth against Google. The schema validation in the lead form. The fact that all of it costs $0/month. None of it is impressive in isolation — together it's a coherent story about being able to ship.

If a hiring manager scrolls to the bottom of the site and sees a clean Sheets row with the timestamp they clicked Submit, that's the demo. The portfolio works because the portfolio works.

If you've made it this far — thank you. The repo is open. If you want to build your own, the [README](README.md) walks through it. If you want to ask me something, the email's at the bottom of the site.

— Suyash
