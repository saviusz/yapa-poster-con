"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export interface SignUpState {
  success : boolean;
  errors?: {
    email?      : string;
    password?   : string;
    r_password? : string;
    misc?       : string;
  };
}

export async function signUpAction(state: SignUpState | undefined, formData: FormData): Promise<SignUpState> {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const r_password = formData.get("r_password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  let currentState: SignUpState = { success: true };

  if (!email) currentState = { ...currentState, success: false, errors: { email: "Email jest wymagany" }};
  if (!password) currentState = { ...currentState, success: false, errors: { password: "Hasło jest wymagane" }};

  if (!currentState.success) return currentState;

  if (password != r_password) return {
    success : false,
    errors  : {
      password   : "Hasła nie pasują do siebie",
      r_password : "Hasła nie pasują do siebie",
    },
  };

  const { error } = await supabase.auth.signUp({
    email    : email!,
    password : password!,
    options  : { emailRedirectTo: `${origin}/auth/callback` },
  });

  if (error) {
    return {
      success : false,
      errors  : { misc: error.message },
    };
  }

  return redirect("/");
}

export interface SignInState {
  email?    : string;
  password? : string;
  misc?     : string;
}

export async function signInAction(state: SignInState, formData: FormData): Promise<SignInState> {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const supabase = await createClient();

  let response: SignInState = {};

  if (!email) response = { ...response, email: "Email jest wymagany" };
  if (!password) response = { ...response, password: "Hasło jest wymagane" };

  if (response.email || response.password) return response;


  const { error } = await supabase.auth.signInWithPassword({
    email    : email!,
    password : password!,
  });

  if (error) switch (error.code) {
    case "invalid_credentials":
      return { misc: "Błędny email lub hasło" };

    case "email_not_confirmed":
      return { misc: "Twoje konto wymaga weryfikacji" };

    default:
      return { misc: "Wystąpił nieznany błąd" };
  }

  return redirect(`/`);
}

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
};
