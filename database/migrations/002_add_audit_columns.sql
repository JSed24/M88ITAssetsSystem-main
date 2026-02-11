-- Add action_category and description columns to audit_logs table
-- Run this in your Supabase SQL Editor

-- Add action_category column
ALTER TABLE public.audit_logs 
ADD COLUMN IF NOT EXISTS action_category VARCHAR(50);

-- Add description column
ALTER TABLE public.audit_logs 
ADD COLUMN IF NOT EXISTS description TEXT;

-- Create index on action_category for better query performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_category 
ON public.audit_logs USING btree (action_category);

-- Create index on description for full-text search
CREATE INDEX IF NOT EXISTS idx_audit_logs_description 
ON public.audit_logs USING gin (to_tsvector('english', description));

-- Add comments
COMMENT ON COLUMN public.audit_logs.action_category IS 'Category of action: authentication, asset_management, user_management, settings, import_export, maintenance, assignment';
COMMENT ON COLUMN public.audit_logs.description IS 'Human-readable description of the action performed';
