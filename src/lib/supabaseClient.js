import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
console.log("🧪 SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("🧪 SUPABASE KEY (partial):", import.meta.env.VITE_SUPABASE_ANON_KEY?.slice(0, 8));
