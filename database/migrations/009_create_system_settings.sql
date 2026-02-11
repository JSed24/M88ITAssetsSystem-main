-- Create system_settings table for global application settings
-- This stores key-value pairs for system-wide configurations

CREATE TABLE IF NOT EXISTS system_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'string',
    description TEXT,
    updated_by UUID REFERENCES auth.users(id),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Add comments
COMMENT ON TABLE system_settings IS 'System-wide configuration settings';
COMMENT ON COLUMN system_settings.setting_key IS 'Unique identifier for the setting';
COMMENT ON COLUMN system_settings.setting_value IS 'Value of the setting (stored as text, parsed based on setting_type)';
COMMENT ON COLUMN system_settings.setting_type IS 'Data type: string, boolean, number, json';

-- Insert default permission settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description)
VALUES 
    ('it_staff_can_access_reports', 'true', 'boolean', 'Allow IT staff role to access reports and export functionality'),
    ('it_staff_can_import_data', 'true', 'boolean', 'Allow IT staff role to import assets and employees')
ON CONFLICT (setting_key) DO NOTHING;

-- Enable RLS
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone authenticated can read settings
CREATE POLICY "Anyone can read system settings"
    ON system_settings FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Only admins can update settings
CREATE POLICY "Only admins can update system settings"
    ON system_settings FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role = 'admin'
        )
    );
