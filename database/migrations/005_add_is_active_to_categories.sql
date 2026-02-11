    -- Add is_active column to asset_categories table
    -- This allows categories to be deactivated instead of deleted
    -- Deactivated categories won't appear in dropdowns but remain in the database for historical data integrity

    -- Add is_active column if it doesn't exist
    ALTER TABLE asset_categories 
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

    -- Update any existing rows to be active
    UPDATE asset_categories 
    SET is_active = true 
    WHERE is_active IS NULL;

    -- Add comment to explain the column
    COMMENT ON COLUMN asset_categories.is_active IS 'Indicates if the category is active and can be used for new assets';
