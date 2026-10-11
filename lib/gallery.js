import manifest from '@/lib/gallery-manifest.json';
import { supabase } from '@/lib/supabase';

// Updates added from the admin page (optional - only if Supabase is set up).
async function getAdminEvents() {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('gallery_events')
      .select('id, event_date, tag, title, body, images')
      .order('event_date', { ascending: false })
      .order('created_at', { ascending: false });
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

// Gallery = folders in public/images/gallery (read at build time) + optional admin-page updates.
// Newest date first; updates without a date come last, A-Z.
export async function getGalleryEvents() {
  const all = [...manifest, ...(await getAdminEvents())];
  return all.sort((a, b) => {
    const da = a.event_date || '';
    const db = b.event_date || '';
    if (da && db) return da < db ? 1 : da > db ? -1 : 0;
    if (da) return -1;
    if (db) return 1;
    return String(a.title).localeCompare(String(b.title));
  });
}
