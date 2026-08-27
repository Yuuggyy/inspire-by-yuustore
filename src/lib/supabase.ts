import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || "placeholder-key";

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
