/// <reference types="@supabase/supabase-js" />
/// <reference types="node" />
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://jkcsgpzzioyochxcqupc.supabase.co'
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprY3NncHp6aW95b2NoeGNxdXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MTc2NDMsImV4cCI6MjA5MTM5MzY0M30.rdnFwnyykkyDpS7VzE6bAK9LWBZnfrmSt9YQ260DwUw'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type Profile = {
  id: string
  email: string
  full_name: string
  completed_levels: number[]
  total_xp: number
  created_at: string
}