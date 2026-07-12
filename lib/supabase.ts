import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vgsqnhkckhbmuagtzkev.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnc3FuaGtja2hibXVhZ3R6a2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4MTM4NTksImV4cCI6MjA5OTM4OTg1OX0.D0mOMFKD2yEZqNZuKq5vSK1Q9TxzNwZoCXFq5hW_m8Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);