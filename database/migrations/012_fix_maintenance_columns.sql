-- Add maintenance_type column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'maintenance_records' 
        AND column_name = 'maintenance_type'
    ) THEN
        ALTER TABLE maintenance_records 
        ADD COLUMN maintenance_type VARCHAR(50);
    END IF;
END $$;

-- Add issue_description column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'maintenance_records' 
        AND column_name = 'issue_description'
    ) THEN
        ALTER TABLE maintenance_records 
        ADD COLUMN issue_description TEXT;
    END IF;
END $$;

-- Add resolution column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'maintenance_records' 
        AND column_name = 'resolution'
    ) THEN
        ALTER TABLE maintenance_records 
        ADD COLUMN resolution TEXT;
    END IF;
END $$;

-- Add start_date column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'maintenance_records' 
        AND column_name = 'start_date'
    ) THEN
        ALTER TABLE maintenance_records 
        ADD COLUMN start_date DATE;
    END IF;
END $$;

-- Add completed_date column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'maintenance_records' 
        AND column_name = 'completed_date'
    ) THEN
        ALTER TABLE maintenance_records 
        ADD COLUMN completed_date DATE;
    END IF;
END $$;

-- Add performed_by column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'maintenance_records' 
        AND column_name = 'performed_by'
    ) THEN
        ALTER TABLE maintenance_records 
        ADD COLUMN performed_by VARCHAR(255);
    END IF;
END $$;

-- Add status column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'maintenance_records' 
        AND column_name = 'status'
    ) THEN
        ALTER TABLE maintenance_records 
        ADD COLUMN status VARCHAR(50) DEFAULT 'in_progress';
    END IF;
END $$;
