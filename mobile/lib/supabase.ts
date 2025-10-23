import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://otflelandcjgfarkbpne.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90ZmxlbGFuZGNqZ2ZhcmticG5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMzUxNjcsImV4cCI6MjA3NjgxMTE2N30.BsGKoPt0SmmeF7tHLlPxEccbxPUZSHcfWtQJWu-cDjg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
