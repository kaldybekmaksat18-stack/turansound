import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

// Create singleton Supabase client instance
export const supabase = createSupabaseClient(supabaseUrl, publicAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// API base URL
export const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-fe68ae53`;

// Test server health
export async function testServerHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    console.log('Server health check:', data);
    return data.status === 'ok';
  } catch (error) {
    console.error('Server health check failed:', error);
    return false;
  }
}

// Helper functions for auth
export const authHelpers = {
  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current session
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  // Get access token
  async getAccessToken() {
    const session = await this.getSession();
    return session?.access_token || null;
  }
};

// Helper functions for API calls
export const apiHelpers = {
  // Sign up new user
  async signUp(userData: {
    email: string;
    password: string;
    name: string;
    phone: string;
    region: string;
    role: 'artist' | 'client';
    stageName?: string;
    genres?: string[];
    experience?: string;
  }) {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Signup failed:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      let error;
      try {
        error = JSON.parse(errorText);
      } catch {
        error = { error: errorText || 'Failed to sign up' };
      }
      
      throw new Error(error.error || 'Backend service unavailable. Please try again later.');
    }

    return response.json();
  },

  // Check session and get user data
  async checkSession(accessToken: string) {
    console.log('Checking session with token length:', accessToken?.length);
    console.log('Token preview:', accessToken?.substring(0, 50) + '...');
    console.log('API URL:', `${API_URL}/session`);
    
    const response = await fetch(`${API_URL}/session`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Session check failed:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      let error;
      try {
        error = JSON.parse(errorText);
      } catch {
        error = { error: errorText || 'Failed to check session' };
      }
      
      throw new Error(error.error || 'Failed to check session');
    }

    return response.json();
  },

  // Sign in and get user data (combines auth + backend check)
  async signInAndGetUser(email: string, password: string) {
    // First, sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.session) throw new Error('Failed to create session');

    console.log('Sign in successful, session created');
    console.log('User ID:', data.user.id);
    console.log('User metadata:', data.user.user_metadata);

    // Use auth metadata directly (simpler and more reliable)
    // Backend will be used for other operations but not for session validation
    return {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'User',
      phone: data.user.user_metadata?.phone || '',
      region: data.user.user_metadata?.region || 'almaty',
      role: data.user.user_metadata?.role || 'client',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.email}`,
      ...(data.user.user_metadata?.role === 'artist' && {
        stageName: data.user.user_metadata?.stageName,
        genres: data.user.user_metadata?.genres || [],
        experience: data.user.user_metadata?.experience,
      })
    };
  },
};