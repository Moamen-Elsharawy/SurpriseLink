-- SQL Schema for SurpriseLink
-- Run this in your Supabase SQL Editor

-- Table for invitations
CREATE TABLE IF NOT EXISTS invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_name TEXT NOT NULL,
    sender_phone TEXT NOT NULL,
    occasion TEXT NOT NULL,
    message_ar TEXT NOT NULL,
    message_en TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Table for viewers
CREATE TABLE IF NOT EXISTS viewers (
    id BIGSERIAL PRIMARY KEY,
    invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
    viewer_name TEXT NOT NULL,
    viewer_phone TEXT NOT NULL,
    viewed_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS (Optional, for public access keep it simple for now or add policies)
-- ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE viewers ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert invitations
CREATE POLICY "Allow public insert invitations" ON invitations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select invitations" ON invitations FOR SELECT USING (true);

-- Policy to allow anyone to insert viewers
CREATE POLICY "Allow public insert viewers" ON viewers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select viewers" ON viewers FOR SELECT USING (true);
