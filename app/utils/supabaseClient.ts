import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sqsujilixcoptelfhmgu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxc3VqaWxpeGNvcHRlbGZobWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4ODc1NzgsImV4cCI6MjA0MzQ2MzU3OH0.uON3Yo4IlGsjRawu-S0HQbYaIdk1eRvVsa0E3AYQokM'

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
