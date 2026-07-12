import { supabase } from "../lib/supabase"; 

// Signup
export async function signUp(
  email: string,
  password: string,
  fullName: string
) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
}

// Login
export async function signIn(
  email: string,
  password: string
) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

// Logout
export async function signOut() {
  return await supabase.auth.signOut();
}

// Get Current User
export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}