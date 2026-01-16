import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-fe68ae53/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-fe68ae53/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, phone, region, role, stageName, genres, experience } = body;

    // Validate required fields
    if (!email || !password || !name || !phone || !region || !role) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Create Supabase admin client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
    );

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name, 
        phone, 
        region, 
        role,
        // Artist-specific fields
        ...(role === 'artist' && {
          stageName,
          genres,
          experience,
        })
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (authError) {
      console.log(`Authorization error during user signup: ${authError.message}`);
      return c.json({ error: authError.message }, 400);
    }

    if (!authData.user) {
      return c.json({ error: "Failed to create user" }, 500);
    }

    // Save additional user data to KV store
    const userData = {
      id: authData.user.id,
      email,
      name,
      phone,
      region,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      createdAt: new Date().toISOString(),
      // Artist-specific fields
      ...(role === 'artist' && {
        stageName,
        genres,
        experience,
      })
    };

    await kv.set(`user:${authData.user.id}`, userData);

    // Return user data without sensitive information
    return c.json({
      user: userData,
      message: "User created successfully"
    }, 201);

  } catch (error) {
    console.log(`Error during signup: ${error}`);
    return c.json({ error: "Internal server error during signup" }, 500);
  }
});

// Get session endpoint - check if user is authenticated
app.get("/make-server-fe68ae53/session", async (c) => {
  try {
    console.log('Session check endpoint called');
    const authHeader = c.req.header('Authorization');
    console.log('Authorization header:', authHeader?.substring(0, 50) + '...');
    
    const accessToken = authHeader?.split(' ')[1];
    
    console.log('Access token present:', !!accessToken);
    console.log('Access token length:', accessToken?.length);
    
    if (!accessToken) {
      console.log('No access token provided');
      return c.json({ error: "No access token provided" }, 401);
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    console.log('Supabase URL configured:', !!supabaseUrl);
    console.log('Supabase URL value:', supabaseUrl);
    console.log('Supabase anon key configured:', !!supabaseAnonKey);
    console.log('Supabase anon key length:', supabaseAnonKey?.length);

    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('Missing Supabase configuration');
      return c.json({ error: "Server configuration error" }, 500);
    }

    // Use ANON_KEY client to verify user JWT tokens
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.log('Validating user with Supabase...');
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error) {
      console.log(`Session validation error: ${error.message}`);
      console.log('Error details:', JSON.stringify(error));
      return c.json({ error: "Invalid session", details: error.message }, 401);
    }

    if (!user) {
      console.log('No user found for token');
      return c.json({ error: "Invalid session" }, 401);
    }

    console.log(`User validated: ${user.id}`);

    // Get additional user data from KV store
    let userData = await kv.get(`user:${user.id}`);

    // If user data not found in KV store, create it from auth metadata
    if (!userData) {
      console.log(`User ${user.id} not found in KV store, creating from auth metadata`);
      
      userData = {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.name || user.email || '',
        phone: user.user_metadata?.phone || '',
        region: user.user_metadata?.region || 'almaty',
        role: user.user_metadata?.role || 'client',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
        createdAt: new Date().toISOString(),
        // Artist-specific fields
        ...(user.user_metadata?.role === 'artist' && {
          stageName: user.user_metadata?.stageName,
          genres: user.user_metadata?.genres || [],
          experience: user.user_metadata?.experience,
        })
      };

      // Save to KV store for future requests
      console.log('Saving user data to KV store...');
      await kv.set(`user:${user.id}`, userData);
      console.log('User data saved successfully');
    } else {
      console.log(`User ${user.id} found in KV store`);
    }

    return c.json({ user: userData });

  } catch (error) {
    console.log(`Error checking session: ${error}`);
    return c.json({ error: "Internal server error during session check" }, 500);
  }
});

// Get user profile endpoint
app.get("/make-server-fe68ae53/user/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    // Use ANON_KEY client to verify user JWT tokens
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || '',
    );

    // Verify token
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get user data from KV store
    const userData = await kv.get(`user:${userId}`);

    if (!userData) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ user: userData });

  } catch (error) {
    console.log(`Error getting user profile: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

Deno.serve(app.fetch);