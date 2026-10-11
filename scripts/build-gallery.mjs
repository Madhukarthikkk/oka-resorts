// Builds the gallery from folders.
//
// Every folder inside  public/images/gallery/  is ONE gallery update:
//   public/images/gallery/puja ceremony/
//       photo-1.jpg, photo-2.jpg ...   -> the photos (the first one is the card cover; a file named cover.jpg wins)
//       anything.docx / .txt / .md     -> the text (first line(s) may set  Title:  Tag:  Date:  - all optional)
//
// Runs automatically before `npm run dev` and `npm run build`, and writes lib/gallery-manifest.json.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mammoth from 'mammoth';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const galleryDir = path.join(root, 'public', 'images', 'gallery');
const outFile = path.join(root, 'lib', 'gallery-manifest.json');

const IMAGE = /\.(jpe?g|png|webp|gif|avif)$/i;
const TEXT = /\.(docx|txt|md)$/i;
const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

const pad = (n) => String(n).padStart(2, '0');

function isoDate(y, m, d) {
  y = Number(y); m = Number(m); d = Number(d);
  const t = new Date(Date.UTC(y, m - 1, d));
  if (t.getUTCFullYear() !== y || t.getUTCMonth() !== m - 1 || t.getUTCDate() !== d) return '';
  return `${y}-${pad(m)}-${pad(d)}`;
}

// Accepts 2026-10-15, 15/10/2026 (day first), 15-10-2026, or 15 Oct 2026
function toISO(value) {
  const v = String(value || '').trim();
  if (!v) return '';
  let m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) return isoDate(m[1], m[2], m[3]);
  m = v.match(/^(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{4})$/);
  if (m) return isoDate(m[3], m[2], m[1]);
  const t = new Date(`${v} 12:00`);
  return isNaN(t) ? '' : isoDate(t.getFullYear(), t.getMonth() + 1, t.getDate());
}

function prettify(name) {
  return name
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

async function readText(file) {
  if (/\.docx$/i.test(file)) {
    const { value } = await mammoth.extractRawText({ path: file });
    return value;
  }
  return fs.readFileSync(file, 'utf8');
}

// Optional "Title: / Tag: / Date:" lines at the very top, then the text. Each line becomes one paragraph.
function parseText(raw) {
  const lines = String(raw || '').replace(/\r/g, '').replace(/^\uFEFF/, '').split('\n');
  const meta = {};
  let i = 0;
  for (; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const m = line.match(/^(title|tag|date)\s*:\s*(.*)$/i);
    if (!m) break;
    meta[m[1].toLowerCase()] = m[2].trim();
  }
  const body = lines.slice(i).map((l) => l.trim()).filter(Boolean).join('\n\n');
  return { ...meta, body };
}

const enc = (s) => encodeURIComponent(s);

async function main() {
  const events = [];

  if (fs.existsSync(galleryDir)) {
    const dirs = fs
      .readdirSync(galleryDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith('.') && !d.name.startsWith('_'))
      .map((d) => d.name)
      .sort(collator.compare);

    for (const dir of dirs) {
      const folder = path.join(galleryDir, dir);
      const files = fs.readdirSync(folder).filter((f) => !f.startsWith('.') && !f.startsWith('~$'));

      const images = files.filter((f) => IMAGE.test(f)).sort(collator.compare);
      const cover = images.find((f) => /^cover\./i.test(f));
      if (cover) images.splice(images.indexOf(cover), 1), images.unshift(cover);

      const textFile = files.filter((f) => TEXT.test(f)).sort(collator.compare)[0];
      let parsed = { body: '' };
      if (textFile) {
        try {
          parsed = parseText(await readText(path.join(folder, textFile)));
        } catch (err) {
          console.warn(`  ! Could not read "${dir}/${textFile}": ${err.message}`);
        }
      }

      if (!images.length && !parsed.body) continue;

      // folder name may start with a date: "2026-10-15 Puja Ceremony"
      let baseName = dir;
      let folderDate = '';
      const dm = dir.match(/^(\d{4}-\d{2}-\d{2})[\s_-]+(.+)$/);
      if (dm) { folderDate = dm[1]; baseName = dm[2]; }

      events.push({
        id: 'folder-' + dir.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        title: parsed.title || prettify(baseName),
        tag: parsed.tag || 'Updates',
        event_date: toISO(parsed.date) || folderDate,
        body: parsed.body,
        images: images.map((f) => `/images/gallery/${enc(dir)}/${enc(f)}`),
      });
    }
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(events, null, 2) + '\n');
  console.log(`Gallery: ${events.length} update(s) found in public/images/gallery`);
  events.forEach((e) => console.log(`  - ${e.title} (${e.images.length} photo${e.images.length === 1 ? '' : 's'})`));
}

main().catch((err) => {
  console.error('Gallery build failed:', err);
  process.exit(1);
});
