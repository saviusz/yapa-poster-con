"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export interface SignUpState {
  success: boolean;
  errors?: {
    email?: string;
    password?: string;
    r_password?: string;
    misc?: string;
  };
}

export async function signUpAction(state: SignUpState | undefined, formData: FormData): Promise<SignUpState> {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const r_password = formData.get("r_password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  let currentState : SignUpState = {
    success: true
  }

  if (!email) currentState = { ...currentState, success: false, errors: { email: "Email jest wymagany" } };
  if (!password) currentState = { ...currentState, success: false, errors: { password: "Hasło jest wymagane" } };

  if (!currentState.success) return currentState;

  if (password != r_password) return {
    success: false,
    errors: {
      password: "Hasła nie pasują do siebie",
      r_password: "Hasła nie pasują do siebie",
    },
  }

  const { error } = await supabase.auth.signUp({
    email: email!,
    password: password!,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return {
      success: false,
      errors: {
        misc: error.message,
      },
    };
  }

  return {
    success: true,
  }
};

export interface SignInState {
  success: boolean;
  errors?: {
    email?: string;
    password?: string;
    misc?: string;
  };
}

export async function signInAction(state: SignInState | undefined, formData: FormData): Promise<SignInState> {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  let response : SignInState = {
    success: true
  }

  if (!email) response = { ...response, success: false, errors: { email: "Email jest wymagany" } };
  if (!password) response = { ...response, success: false, errors: { password: "Hasło jest wymagane" } };

  if (!response.success) return response;


  const { error, data } = await supabase.auth.signInWithPassword({
    email: email!,
    password: password!,
  });

  if (error) {
    return {
      success: false,
      errors: {
        misc: error.message,
      },
    };
  }

  return redirect(`/`);
}

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
};
