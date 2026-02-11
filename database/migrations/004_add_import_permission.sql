-- Add import permission setting to system_settings table
-- Run this if you already have the system_settings table created

INSERT INTO system_settings (setting_key, setting_value, setting_type, description)
VALUES 
    ('it_staff_can_import_data', 'true', 'boolean', 'Allow IT staff role to import assets and employees')
ON CONFLICT (setting_key) DO NOTHING;
