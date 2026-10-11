# Oka Resorts website (Next.js + Supabase)

- **Frontend:** Next.js (React) — home page, gallery page
- **Backend:** Supabase — database (gallery updates), photo storage, admin login
- **Hosting:** Vercel, with the domain okaresorts.com

## Pages

| Address | What it is |
|---|---|
| `/` | Home page (same design as before) |
| `/gallery` | Gallery & Updates. One card per folder in `public/images/gallery`; click for all photos and text |
| `/360-view` | 360° virtual tour page. Paste the video link into `VIDEO_URL` in `app/(site)/360-view/page.jsx` |
| `/admin` | Host login. Add or delete gallery updates. Not shown in the menu or Google |

## Adding a gallery update (folders)

Each folder inside `public/images/gallery/` is **one update**:

```
public/images/gallery/
└── puja ceremony/              <- the folder name becomes the title ("Puja Ceremony")
    ├── photo-1.jpg             <- all the photos (the first one is the card cover)
    ├── photo-2.jpg
    ├── photo-3.jpg
    └── puja ceremony.docx      <- the text, written in Word (.txt and .md also work)
```

1. Create a new folder, for example `public/images/gallery/puja ceremony`.
2. Paste the photos into it (jpg, jpeg, png, webp, gif, avif). To pick the cover photo, name one of them `cover.jpg`.
3. Add the text as a Word file in the same folder. Each paragraph becomes a paragraph in the pop-up.
4. Optional: put these lines at the very top of the Word file:
   ```
   Title: Puja Ceremony
   Tag: Ceremonies
   Date: 2026-10-15
   ```
   Without them, the folder name is the title, the label is "Updates" and no date is shown.
   A folder name that starts with a date (for example `2026-10-15 Puja Ceremony`) also sets the date.
5. Deploy again (push to GitHub, and Vercel rebuilds). Locally, restart `npm run dev`, or run `npm run gallery` and refresh.

On the gallery page, visitors see one card per folder. Clicking a card opens a pop-up with all the photos and the full text.
The newest date comes first. Folder names that start with `_` or `.` are ignored, so you can keep drafts that way.
To remove an update, delete its folder. Your own folders are the only ones the site shows.

Updates added from the `/admin` page (if you set up Supabase) appear in the same gallery. The admin page is optional.

## 1. Copy your existing files into `public/`

Put these into the `public/` folder (keep the same names):

```
public/favicon.svg
public/Oka-Resorts-Brochure.pdf
public/images/hero.jpg
public/images/location-map.jpg
public/images/aerial-view.jpg
public/images/layout-plan.jpg
public/images/entrance-gate.jpg
public/images/guest-house.jpg
public/images/park-aerial.jpg
public/images/playground.jpg
public/images/walking-track.jpg
public/images/pool.jpg
```

`logo.png` and `amita-developers-logo.png` are already in `public/images/`.

## 2. Set up Supabase (free)

1. Create an account and a new project at supabase.com.
2. Open **SQL Editor → New query**, paste everything from `supabase/schema.sql`, click **Run**.
3. Open **Authentication → Users → Add user**, and create the host's login (email + password).
4. Open **Authentication → Sign In / Providers** and **turn off "Allow new users to sign up"**. This is important: only the host you created should be able to log in.
5. Open **Project Settings → API** and copy the **Project URL** and the **anon public** key.

## 3. Run it on your computer

Needs Node.js 20 or newer.

```
cp .env.example .env.local      # then paste your Supabase URL and key into .env.local
npm install
npm run dev
```

Open http://localhost:3000. The admin page is at http://localhost:3000/admin.

## 4. Put it online with your domain

1. Upload this project to a GitHub repository (the `.gitignore` already skips `node_modules` and `.env.local`).
2. At vercel.com, choose **Add New → Project**, import the repository.
3. Under **Environment Variables**, add the same three values as `.env.example`
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL=https://okaresorts.com`), then deploy.
4. In the Vercel project: **Settings → Domains → Add** `okaresorts.com`. Vercel shows the DNS records to add; add them at the place where you bought the domain. HTTPS is set up automatically.

## How the host adds a gallery update

1. Go to `okaresorts.com/admin` and sign in.
2. Fill in the title, label (Ceremonies / Plot Sales / Events or your own), date and details.
3. Choose the photos (several at once; they are shrunk automatically) and click **Publish update**.
4. The card appears on `/gallery` within about 30 seconds. Use **Delete** to remove an update and its photos.

## Editing the site text

Each home page section is its own file in `components/home/` (Hero, About, Location, MasterPlan, PlotSizes, Amenities, PhaseStrip, Faq). Phone number, email and WhatsApp link are in `components/Footer.jsx` and `components/WhatsAppFab.jsx`. All styling is in `app/globals.css`.

## Google Maps

The map in the Location section is set at the top of `components/home/Location.jsx` (`MAP_EMBED_URL`). The "Open in Google Maps" button uses `MAP_LINK` in the same file.
