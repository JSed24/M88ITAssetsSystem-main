-- Fix the status check constraint for maintenance_records table
-- This ensures the status column accepts the correct values: in_progress, completed, cannot_repair

-- Drop the existing constraint if it exists
ALTER TABLE maintenance_records DROP CONSTRAINT IF EXISTS maintenance_records_status_check;

-- Add the correct constraint with underscore in cannot_repair
ALTER TABLE maintenance_records 
ADD CONSTRAINT maintenance_records_status_check 
CHECK (status IN ('in_progress', 'completed', 'cannot_repair'));

-- Update any existing records that might have wrong status values
-- (Optional - only if there are records with old values)
UPDATE maintenance_records 
SET status = 'cannot_repair' 
WHERE status = 'cannot repair' OR status = 'cannotrepair';
