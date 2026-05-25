import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qkctyikngotpqwpdxrgz.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrY3R5aWtuZ290cHF3cGR4cmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3ODc2ODMsImV4cCI6MjA4NDM2MzY4M30.uhPkd_D13Wfc65XYt2_wtcaR7y2bb7CYhaagVfPVQYY";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
