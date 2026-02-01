import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://anjdjbkbbdmkhmdihdrg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuamRqYmtiYmRta2htZGloZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3OTEzMDAsImV4cCI6MjA4NTM2NzMwMH0.gKi6dyOF18KBcH0w4XRBn6K6R-HCnFfJckujYiU4UJU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for user profile
export interface UserProfile {
    id: string;
    name: string;
    email: string;
    website: string | null;
    goal: string | null;
    income: number;
    clients: number;
    created_at: string;
    updated_at: string;
}
