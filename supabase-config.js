// supabase-config.js
const SUPABASE_URL = 'https://yzcowfztnfxihoeceldm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6Y293Znp0bmZ4aWhvZWNlbGRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5OTA2NzcsImV4cCI6MjEwNDU2NjY3N30.X9APpLmFHNKKRZjcekzz7nJ6Yzq6xEqmJrE0ecRNMIY';

// Usamos 'supabaseClient' para evitar conflictos con la librería global
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);