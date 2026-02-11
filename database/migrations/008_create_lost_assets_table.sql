-- Create lost_assets table for tracking lost and found assets
CREATE TABLE IF NOT EXISTS lost_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    date_reported DATE NOT NULL DEFAULT CURRENT_DATE,
    last_known_location VARCHAR(255),
    circumstances TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'under_investigation' CHECK (status IN ('under_investigation', 'found', 'permanently_lost')),
    date_found DATE,
    recovery_notes TEXT,
    estimated_value DECIMAL(10,2),
    liability_action VARCHAR(100),
    liability_amount DECIMAL(10,2),
    payment_status VARCHAR(50),
    resolution_notes TEXT,
    original_asset_status VARCHAR(50),
    reported_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_lost_assets_asset_id ON lost_assets(asset_id);
CREATE INDEX IF NOT EXISTS idx_lost_assets_employee_id ON lost_assets(employee_id);
CREATE INDEX IF NOT EXISTS idx_lost_assets_status ON lost_assets(status);
CREATE INDEX IF NOT EXISTS idx_lost_assets_date_reported ON lost_assets(date_reported);

-- Enable Row Level Security
ALTER TABLE lost_assets ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to view
CREATE POLICY "Allow authenticated users to view lost assets"
    ON lost_assets FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert lost assets"
    ON lost_assets FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policy: Allow authenticated users to update
CREATE POLICY "Allow authenticated users to update lost assets"
    ON lost_assets FOR UPDATE
    TO authenticated
    USING (true);

-- Policy: Allow authenticated users to delete
CREATE POLICY "Allow authenticated users to delete lost assets"
    ON lost_assets FOR DELETE
    TO authenticated
    USING (true);

-- Create view with employee and asset details
CREATE OR REPLACE VIEW v_lost_assets_full AS
SELECT 
    la.*,
    e.full_name as employee_name,
    e.email as employee_email,
    e.department,
    a.asset_tag,
    a.name as asset_name,
    a.serial_number,
    a.status as current_asset_status,
    c.name as category_name,
    u.email as reported_by_email
FROM lost_assets la
LEFT JOIN employees e ON la.employee_id = e.id
LEFT JOIN assets a ON la.asset_id = a.id
LEFT JOIN asset_categories c ON a.category_id = c.id
LEFT JOIN auth.users u ON la.reported_by = u.id
ORDER BY la.date_reported DESC;

-- Grant access to the view
GRANT SELECT ON v_lost_assets_full TO authenticated;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_lost_assets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS trigger_lost_assets_updated_at ON lost_assets;
CREATE TRIGGER trigger_lost_assets_updated_at
    BEFORE UPDATE ON lost_assets
    FOR EACH ROW
    EXECUTE FUNCTION update_lost_assets_updated_at();
