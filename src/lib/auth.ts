import { supabase } from "./supabase";
import type { User, AuthError } from "@supabase/supabase-js";

export interface AuthResult {
  user: User | null;
  error: string | null;
}

export async function signIn(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return {
      user: data.user,
      error: error?.message || null,
    };
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error.message : "登录失败，请重试",
    };
  }
}

export async function signUp(
  email: string,
  password: string,
  metadata?: Record<string, unknown>
): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });

    return {
      user: data.user,
      error: error?.message || null,
    };
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error.message : "注册失败，请重试",
    };
  }
}

export async function signOut(): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.signOut();
    return { error: error?.message || null };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "登出失败",
    };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user || null;
  } catch {
    return null;
  }
}

export async function resetPassword(
  email: string
): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error: error?.message || null };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "发送重置邮件失败",
    };
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

export function getErrorMessage(error: AuthError | null | undefined): string {
  if (!error) return "未知错误";

  switch (error.message) {
    case "Invalid login credentials":
      return "邮箱或密码错误";
    case "User already registered":
      return "该邮箱已被注册";
    case "Email not confirmed":
      return "请先确认邮箱";
    default:
      return error.message || "操作失败，请重试";
  }
}
