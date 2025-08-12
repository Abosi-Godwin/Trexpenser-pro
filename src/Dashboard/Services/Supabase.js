import { createClient } from "@supabase/supabase-js";

 export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
console.log(supabaseUrl);
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
