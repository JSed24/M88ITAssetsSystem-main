-- Add logged_by column to assets table to track who created the asset
-- This column will store the user_id (UUID) from auth.users/user_profiles

-- Add the logged_by column (allows NULL for existing records)
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS logged_by UUID REFERENCES auth.users(id);

-- Optionally: Set a default value for existing records (you can set to admin user or leave as NULL)
-- UPDATE assets SET logged_by = (SELECT id FROM auth.users LIMIT 1) WHERE logged_by IS NULL;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_assets_logged_by ON assets(logged_by);

-- Add comment to document the column
COMMENT ON COLUMN assets.logged_by IS 'User ID of the person who created/logged this asset';
