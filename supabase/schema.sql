-- ============================================================
-- GENESIS VENTURE PLATFORM - SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase Project's SQL Editor
-- ============================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Ventures Table
-- Stores complete venture profiles, synthesized insights, financial models, and verdicts
CREATE TABLE IF NOT EXISTS ventures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- Optional: links to auth.users if Supabase Auth is enabled
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(255),
    stage VARCHAR(100) DEFAULT 'Concept',
    location VARCHAR(255),
    
    -- Raw Founder Inputs
    startup_details JSONB NOT NULL DEFAULT '{}'::jsonb,
    problem JSONB NOT NULL DEFAULT '{}'::jsonb,
    solution JSONB NOT NULL DEFAULT '{}'::jsonb,
    target_customers JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- Synthesized Intelligence
    business_dna JSONB NOT NULL DEFAULT '{}'::jsonb,
    derived_insights JSONB NOT NULL DEFAULT '{}'::jsonb,
    market_analysis JSONB NOT NULL DEFAULT '{}'::jsonb,
    competitor_analysis JSONB NOT NULL DEFAULT '{}'::jsonb,
    business_model JSONB NOT NULL DEFAULT '{}'::jsonb,
    financial_profile JSONB NOT NULL DEFAULT '{}'::jsonb,
    risk_opportunity JSONB NOT NULL DEFAULT '{}'::jsonb,
    signals JSONB NOT NULL DEFAULT '[]'::jsonb,
    
    -- Status & Metadata
    verdict VARCHAR(50) DEFAULT 'PROMISING',
    current_stage VARCHAR(50) DEFAULT 'dna',
    is_demo_mode BOOLEAN DEFAULT false,
    ai_provider VARCHAR(50) DEFAULT 'gemini', -- 'gemini' | 'groq' | 'custom_llm'
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Venture Refinements Table
-- Audits founder modifications and AI recalibrations over time
CREATE TABLE IF NOT EXISTS venture_refinements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID REFERENCES ventures(id) ON DELETE CASCADE,
    changed_field VARCHAR(255) NOT NULL,
    previous_value TEXT,
    new_value TEXT NOT NULL,
    reanalysis_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Cofounder Chat Conversations Table
-- Stores founder queries and real-time AI Cofounder guidance
CREATE TABLE IF NOT EXISTS cofounder_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID REFERENCES ventures(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Market Signals Table
-- Ingested signals tailored to the venture
CREATE TABLE IF NOT EXISTS market_signals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID REFERENCES ventures(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    headline VARCHAR(255) NOT NULL,
    relevance_impact TEXT NOT NULL,
    suggested_action TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Indexes for High-Performance Queries
CREATE INDEX IF NOT EXISTS idx_ventures_updated_at ON ventures(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_refinements_venture_id ON venture_refinements(venture_id);
CREATE INDEX IF NOT EXISTS idx_cofounder_venture_id ON cofounder_messages(venture_id, created_at ASC);

-- 7. Row Level Security (RLS) Policies
-- Public access enabled for client-side API keys with optional auth
ALTER TABLE ventures ENABLE ROW LEVEL SECURITY;
ALTER TABLE venture_refinements ENABLE ROW LEVEL SECURITY;
ALTER TABLE cofounder_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_signals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon read ventures" ON ventures FOR SELECT USING (true);
CREATE POLICY "Allow anon insert ventures" ON ventures FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update ventures" ON ventures FOR UPDATE USING (true);

CREATE POLICY "Allow anon read refinements" ON venture_refinements FOR SELECT USING (true);
CREATE POLICY "Allow anon insert refinements" ON venture_refinements FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anon read cofounder" ON cofounder_messages FOR SELECT USING (true);
CREATE POLICY "Allow anon insert cofounder" ON cofounder_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anon read signals" ON market_signals FOR SELECT USING (true);
CREATE POLICY "Allow anon insert signals" ON market_signals FOR INSERT WITH CHECK (true);

-- 8. Storage Bucket for Venture Files & Artifacts
-- Creates a public storage bucket for pitch decks, market reports, and user files
INSERT INTO storage.buckets (id, name, public)
VALUES ('venture-files', 'venture-files', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'venture-files'
CREATE POLICY "Allow public read venture files" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'venture-files');

CREATE POLICY "Allow public upload venture files" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'venture-files');

CREATE POLICY "Allow public update venture files" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'venture-files');
