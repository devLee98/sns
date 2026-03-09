import { createClient } from "@/lib/client";
import { Provider } from "@supabase/supabase-js";

export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });
  console.log(data.session);
  if (error) throw error;
  return data;
}

export async function signInWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signInWithOAuth({ provider }: { provider: Provider }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });
  if (error) throw error;
  return data;
}
