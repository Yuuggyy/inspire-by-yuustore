import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cifujdeelritrnnyzupw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZnVqZGVlbHJpdHJubnl6dXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5NDA2MTYsImV4cCI6MjEwMzUxNjYxNn0.8hK_qhIcE__0YlWBZJtZbPwfe0s4vUOWqhj1tzNYv14";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const ADMIN_EMAILS = ["yuustore169@gmail.com", "guymuzongo1234@gmail.com"];
export const isAdminEmail = (email: string | null | undefined) =>
  !!email && ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(e.toLowerCase());

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  tags: string[];
  url: string | null;
  sort_order: number;
  created_at: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  sort_order: number;
};
