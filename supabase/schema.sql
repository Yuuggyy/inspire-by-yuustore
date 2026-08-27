-- INSPIRE by YuuStore — Supabase Schema
-- Run this in your Supabase SQL editor

-- ============ PROJECTS ============
CREATE TABLE IF NOT EXISTS inspire_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  image_url TEXT,
  url TEXT,
  tags TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ SERVICES ============
CREATE TABLE IF NOT EXISTS inspire_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT '✨',
  features TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0
);

-- ============ MESSAGES ============
CREATE TABLE IF NOT EXISTS inspire_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ RLS ============

-- Projects: everyone can read, admin can write
ALTER TABLE inspire_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects_read" ON inspire_projects FOR SELECT USING (true);
CREATE POLICY "projects_admin" ON inspire_projects FOR ALL
  USING (auth.jwt() ->> 'email' IN ('yuustore169@gmail.com', 'guymuzongo1234@gmail.com'))
  WITH CHECK (auth.jwt() ->> 'email' IN ('yuustore169@gmail.com', 'guymuzongo1234@gmail.com'));

-- Services: everyone can read, admin can write
ALTER TABLE inspire_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "services_read" ON inspire_services FOR SELECT USING (true);
CREATE POLICY "services_admin" ON inspire_services FOR ALL
  USING (auth.jwt() ->> 'email' IN ('yuustore169@gmail.com', 'guymuzongo1234@gmail.com'))
  WITH CHECK (auth.jwt() ->> 'email' IN ('yuustore169@gmail.com', 'guymuzongo1234@gmail.com'));

-- Messages: anyone can insert, admin can read/delete
ALTER TABLE inspire_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "messages_insert" ON inspire_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "messages_admin" ON inspire_messages FOR ALL
  USING (auth.jwt() ->> 'email' IN ('yuustore169@gmail.com', 'guymuzongo1234@gmail.com'))
  WITH CHECK (auth.jwt() ->> 'email' IN ('yuustore169@gmail.com', 'guymuzongo1234@gmail.com'));

-- ============ DEFAULT SERVICES ============
INSERT INTO inspire_services (title, description, icon, features, sort_order) VALUES
  ('Conception & Développement Web', 'Sites web modernes, rapides et responsive. Du landing page à l''e-commerce complet.', '🌐', '{"Sites vitrines","E-commerce","Applications web","Optimisation SEO"}', 1),
  ('Applications Cross-Plateformes', 'Une seule base de code pour iOS, Android et Web avec Flutter et React Native.', '📱', '{"iOS & Android","PWA","Temps réel","Offline-first"}', 2),
  ('Développement IA', 'Agents intelligents, automatisation et intégration de modèles d''IA dans vos workflows.', '🤖', '{"Chatbots IA","Automatisation n8n","Agents intelligents","Intégration API"}', 3),
  ('Entraînement de Modèles de Langage', 'Fine-tuning et entraînement de LLMs pour des cas d''usage spécifiques à votre business.', '🧠', '{"Fine-tuning LLM","RAG personnalisé","Datasets sur mesure","Déploiement"}', 4)
ON CONFLICT DO NOTHING;
