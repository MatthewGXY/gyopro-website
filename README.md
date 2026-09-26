# GYO PRO PTY LTD — Brand website

Static single-page site for GYO PRO PTY LTD (Australian plaster & gyprock specialist).
Built with **Eleventy** + **Decap CMS** so you can edit content from a web UI without touching code.

## Live URL

- **Production**: https://gyopro.net.au/
- **Admin CMS**: https://gyopro.net.au/admin/

## Project structure

```
.
├── package.json                  # Node deps + npm scripts
├── .eleventy.js                  # Eleventy config
├── netlify.toml                  # Netlify build + headers
├── admin/
│   ├── index.html                # Decap CMS UI
│   └── config.yml                # collections definition
├── src/
│   ├── _data/
│   │   ├── settings.json         # company name, hero, contacts, ABN, SEO
│   │   ├── services.json         # 5 services
│   │   └── cookies.json          # cookie banner text
│   ├── _includes/
│   │   ├── layout.njk            # base HTML layout
│   │   ├── header.njk
│   │   ├── footer.njk
│   │   ├── cookie-banner.njk
│   │   └── service-card.njk
│   ├── projects/
│   │   └── *.md                  # one file per project (added via CMS)
│   └── index.njk                 # homepage template
├── assets/                       # static assets, copied as-is
│   ├── css/main.css
│   ├── js/main.js
│   ├── img/                      # logo, og-image, reference photos
│   └── photos/                   # project photos (uploaded via CMS)
├── 图1.jpg / 图2.jpg / 图3.jpg   # reference images (client-provided)
└── dist/                         # Eleventy output (gitignored, deployed)
```

## Editing content (the easy way)

The site is wired up to **Decap CMS**, a Git-based editor that lives at `/admin/`.

### Once you've deployed (see "Deploy" below)

1. Go to **https://gyopro.net.au/admin/**
2. Sign in with **GitHub** (your account)
3. Pick a collection from the sidebar:
   - **Site Settings** — company name, hero title, contacts, ABN, SEO
   - **Services** — the 5 services list
   - **Cookie Banner** — the consent popup text
   - **Projects** — add/edit project showcases with photos
4. Edit fields → click **Publish** (top-right)
5. Wait ~1-2 minutes for Netlify to rebuild
6. Refresh the live site to see your changes

### Adding projects

Click **Projects → New Project** in the CMS:
- **Title** — e.g. "Residential ceiling — Bondi"
- **Date** — pick the completion date
- **Description** — one-liner
- **Photos** — upload multiple; the first becomes the thumbnail
- **Body** — optional longer write-up in markdown

### Editing the hero

The hero title supports `\n` for line breaks. Type a literal line break (Enter) in the **Hero Title** field and it'll render as a `<br>`.

## Local development

```bash
# 1. Install dependencies (one-time)
cd /Users/fabrique/Downloads/GYO
npm install

# 2. Build the site
npm run build
# → outputs to dist/

# 3. Live-reload dev server
npm run dev
# → http://localhost:8080

# 4. Or preview the built site
python3 -m http.server 8000 --directory dist
# → http://localhost:8000
```

## Deploy

### First-time setup

#### 1. Create a GitHub repo

- Go to https://github.com/new
- Name it `gyopro-website`
- **Public** (required for Decap's free GitHub backend)
- Don't initialize with README (we already have files)

Then in this directory:

```bash
git init    # only if .git/ doesn't already exist
git add -A
git commit -m "Initial site + Eleventy + Decap CMS"

# Replace YOUR_USER with your GitHub username
git remote add origin git@github.com:YOUR_USER/gyopro-website.git
git branch -M main
git push -u origin main
```

#### 2. Connect Netlify

- Go to https://app.netlify.com/
- **Add new site → Import an existing project → GitHub**
- Pick `gyopro-website`
- Build settings (auto-detected from `netlify.toml`):
  - Build command: `npm run build`
  - Publish directory: `dist`
- Click **Deploy site**

You'll get a `*.netlify.app` URL immediately.

#### 3. Connect `gyopro.net.au`

- Netlify → **Domain settings** → **Add custom domain** → `gyopro.net.au`
- Netlify shows a CNAME target like `<your-site>.netlify.app`
- At your domain registrar (where you bought `gyopro.net.au`), set:
  - `gyopro.net.au` → CNAME → `<your-site>.netlify.app`
  - `www.gyopro.net.au` → CNAME → `<your-site>.netlify.app`
- HTTPS auto-provisions via Let's Encrypt

#### 4. Update Decap config with your repo path

Edit `admin/config.yml`:

```yaml
backend:
  name: github
  repo: YOUR_USER/gyopro-website     # ← change this
  branch: main
```

Commit and push. Now visiting `/admin/` will let you sign in with GitHub and start editing.

### Subsequent deploys

Every `git push` to `main` triggers a Netlify rebuild automatically. The CMS publishes via GitHub commits, so the same flow applies — no manual deploys needed.

## Post-deploy checklist

- [ ] Visit `https://gyopro.net.au/` — confirm site loads
- [ ] Test mobile view (DevTools → device toolbar)
- [ ] Click phone numbers on mobile — confirm dial works
- [ ] Click email — confirm mail client opens
- [ ] Visit `https://gyopro.net.au/admin/` — confirm Decap CMS UI loads
- [ ] Sign in with GitHub — confirm you reach the editor
- [ ] Edit **Site Settings** → change heroTitle → Publish → wait ~1 min → reload site
- [ ] Validate HTML: https://validator.w3.org/
- [ ] Validate Schema.org: https://search.google.com/test/rich-results
- [ ] Google Search Console → submit `https://gyopro.net.au/sitemap.xml`
- [ ] Register Google Business Profile (critical for local SEO in Australia)

## Things to update later

| Asset | Where |
|---|---|
| ABN | `src/_data/settings.json` → `abn` (already filled: 60 681 278 982) |
| Project photos | Upload via **Admin → Projects → New Project** |
| Hero text | **Admin → Site Settings → Hero Title** (supports `\n`) |
| Contact info | **Admin → Site Settings → Contacts** |
| Service list | **Admin → Services** (add/remove/reorder) |
| Cookie banner | **Admin → Cookie Banner** |
| Favicon (currently JPG) | Replace `assets/img/favicon.png` with a real `.ico` if you want IE support |
| Logo SVG | Replace `<img src="/assets/img/图2.jpg">` references with `图2.svg` once available |
| Domain DNS | At your registrar: CNAME `gyopro.net.au` → `<your-site>.netlify.app` |

## SEO notes

- Title: "GYO PRO PTY LTD | Plaster & Gyprock Specialist Services Australia"
- Meta description dynamically generated from `settings.json → seo.description`
- Schema.org `HomeAndConstructionBusiness` with all 5 services as `OfferCatalog`
- `sitemap.xml` at `/sitemap.xml`, `robots.txt` at `/robots.txt`
- Open Graph + Twitter Card tags for social sharing
- All images have alt text
- Mobile responsive at 768px / 1024px breakpoints
- ABN `60 681 278 982` is included in Schema.org as `taxID` / `identifier` (cross-verifiable with Australian Business Register)

## Out of scope (for v1)

- Multi-page split (each service its own page)
- Bilingual EN / 中文 (English-only site + 中文 contact flag)
- Real contact form backend (currently uses `mailto:`)
- CMS for self-editing code/layout (only content is editable)

## Contact

Site owner: GYO PRO PTY LTD
- Elsa (English): +61 450 920 702
- Yao (中文): +61 452 053 381
- Email: Manager@gyopro.net.au

## Stack credits

- [Eleventy](https://www.11ty.dev/) — static site generator
- [Decap CMS](https://decapcms.org/) — Git-based content editor
- [Netlify](https://www.netlify.com/) — hosting + build