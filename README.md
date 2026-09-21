# A To Z Appliance Industry — Website (Static, GitHub Pages Ready)

This is a plain HTML/CSS/JS build of the site — no PHP required. It works on any
static host, including GitHub Pages.

## How to publish on GitHub Pages
1. Create a new repository on GitHub (e.g. `atoz-appliance`).
2. Upload everything in this folder to that repo (keep `index.html` at the
   repo's root — don't put it inside a subfolder).
3. On GitHub: **Settings → Pages → Build and deployment → Source: "Deploy
   from a branch"**, branch **main**, folder **/ (root)** → Save.
4. Your site goes live at `https://<your-username>.github.io/<repo-name>/`
   after a minute or two.

The included `.nojekyll` file tells GitHub Pages to serve the files exactly
as they are, with no extra processing.

## Editing the site
Everything is in `index.html` now (there's no separate PHP config file
anymore). To change something, open `index.html` and search (Ctrl+F) for it:

- **Phone number** — search `7063686886`, replace everywhere.
- **WhatsApp number** — search `917063686886`, replace everywhere.
- **Google Map** — search `<iframe`, replace the embed code with a new one
  from Google Maps ("Share → Embed a map").
- **"Book a Demo" form destination (Google Sheet)** — search
  `script.google.com`, replace the URL with your own deployed Google Apps
  Script Web App URL. The form already posts there via JavaScript, so it
  works on GitHub Pages exactly as it did before — no server needed.
- **Website URL / canonical link** — search `atozappliance.in`, replace with
  your real domain (or your GitHub Pages URL) before you care about SEO.

## Adding / replacing images
No code edits needed — just add files with the right name to the right
folder, then re-upload to GitHub:

- **Hero slider** — `assets/images/hero-slider/` — any image format works
  (jpg, png, webp, etc.), any filename. Files are shown in name order.
- **Featured products** — `assets/images/products/` — filenames must be
  exactly `aquaguard.jpg`, `chimney.jpg`, `vacuum.jpg` (or `.png`), all
  lowercase.
- **Gallery** — `assets/images/gallery/` — filenames must be exactly
  `gallery-1.jpg` through `gallery-10.jpg` (or `.png`), all lowercase.

Since this is now a static export, adding a *new* image slot (an 11th
gallery photo, a 4th product, etc.) requires editing the HTML directly,
not just dropping in a file. Ask if you want help with that.

## Note
`assets/js/form.js` and `assets/js/script.js` are legacy/unused files kept
for reference — the live site's form and business-hours logic are inline in
`index.html`, so editing those two files has no effect on the site.
