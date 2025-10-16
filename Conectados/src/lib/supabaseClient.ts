// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js"

// 🔗 Copia los valores de tu panel de Supabase
const SUPABASE_URL = "https://dtkrslrwiqbrhrrjevay.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0a3JzbHJ3aXFicmhycmpldmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NTkwNDgsImV4cCI6MjA3NjEzNTA0OH0.cQo8AcdhOV6fK6gFQmvCFiILqWlBZriSWjr8gENuAQY"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
