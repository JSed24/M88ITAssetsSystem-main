-- Add original_asset_status column to maintenance_records table
-- This stores the asset's status before maintenance started
-- Used to restore the correct status when maintenance is completed

ALTER TABLE maintenance_records 
ADD COLUMN IF NOT EXISTS original_asset_status VARCHAR(50);

-- Add comment to the column
COMMENT ON COLUMN maintenance_records.original_asset_status IS 'Original status of the asset before maintenance started (for restoration after completion)';
