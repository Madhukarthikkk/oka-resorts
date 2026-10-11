-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.

-- 1) Gallery updates table
create table if not exists public.gallery_events (
  id          uuid primary key default gen_random_uuid(),
  event_date  date        not null default current_date,
  tag         text        not null default 'Events',
  title       text        not null,
  body        text        not null default '',
  images      text[]      not null default '{}',   -- public photo URLs shown on the site
  image_paths text[]      not null default '{}',   -- storage paths, used when deleting
  created_at  timestamptz not null default now()
);

alter table public.gallery_events enable row level security;

-- Everyone can read updates; only a signed-in admin can add, change or delete.
drop policy if exists "Public can read gallery events" on public.gallery_events;
create policy "Public can read gallery events"
  on public.gallery_events for select using (true);

drop policy if exists "Admin can add gallery events" on public.gallery_events;
create policy "Admin can add gallery events"
  on public.gallery_events for insert to authenticated with check (true);

drop policy if exists "Admin can edit gallery events" on public.gallery_events;
create policy "Admin can edit gallery events"
  on public.gallery_events for update to authenticated using (true) with check (true);

drop policy if exists "Admin can delete gallery events" on public.gallery_events;
create policy "Admin can delete gallery events"
  on public.gallery_events for delete to authenticated using (true);

-- 2) Photo storage bucket (public so visitors can view photos)
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "Public can view gallery photos" on storage.objects;
create policy "Public can view gallery photos"
  on storage.objects for select using (bucket_id = 'gallery');

drop policy if exists "Admin can upload gallery photos" on storage.objects;
create policy "Admin can upload gallery photos"
  on storage.objects for insert to authenticated with check (bucket_id = 'gallery');

drop policy if exists "Admin can delete gallery photos" on storage.objects;
create policy "Admin can delete gallery photos"
  on storage.objects for delete to authenticated using (bucket_id = 'gallery');
