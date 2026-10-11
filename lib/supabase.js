import { createClient } from '@supabase/supabase-js';

// ---------------------------------------------------------------
// Paste your Supabase values here (Supabase -> Project Settings -> API).
// Only the URL and the "anon / public" key belong here — they are
// designed to be visible in the browser. NEVER paste the
// "service_role" key anywhere in this project.
// ---------------------------------------------------------------
const FRONTEND_SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co';
const FRONTEND_SUPABASE_ANON_KEY = 'YOUR-ANON-PUBLIC-KEY';

// Environment variables still win if you set them (e.g. on Vercel).
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || FRONTEND_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FRONTEND_SUPABASE_ANON_KEY;

const isPlaceholder = (v) => !v || v.includes('YOUR-');

export const supabaseConfigured = !isPlaceholder(url) && !isPlaceholder(key);
export const supabase = supabaseConfigured ? createClient(url, key) : null;
