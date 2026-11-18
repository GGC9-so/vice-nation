import { createClient } from '@supabase/supabase-js';
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ncjkkflipnrijjbbhhdg.supabase.co';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_BIR1t4mJGi3K72Rp8ik-jw_Q-BPRsCy';
export const supabase = createClient(url, key);
