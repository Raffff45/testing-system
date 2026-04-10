/// <reference types="@supabase/supabase-js" />
/// <reference types="node" />
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type Profile = {
  id: string
  email: string
  full_name: string
  completed_levels: number[]
  total_xp: number
  created_at: string
}