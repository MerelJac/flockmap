import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config(); // ✅ Loads .env variables

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // NOTE: use service key here, not anon key
);
