-- Drop existing view if it exists
DROP VIEW IF EXISTS v_assets_full;

-- Create view for assets with joined data
CREATE VIEW v_assets_full AS
SELECT 
    a.id,
    a.name,
    a.asset_tag,
    a.serial_number,
    a.brand,
    a.model,
    a.status,
    a.purchase_date,
    a.purchase_cost,
    a.warranty_expiry,
    a.refresh_date,
    a.specifications,
    a.notes,
    a.created_at,
    a.updated_at,
    a.category_id,
    c.name as category_name,
    a.location_id,
    l.name as location_name,
    a.department_id,
    d.name as department_name,
    aa.employee_id,
    e.full_name as assigned_to_name,
    aa.assigned_date,
    aa.returned_date,
    a.logged_by,
    up.email as logged_by_email
FROM assets a
LEFT JOIN asset_categories c ON a.category_id = c.id
LEFT JOIN locations l ON a.location_id = l.id
LEFT JOIN departments d ON a.department_id = d.id
LEFT JOIN asset_assignments aa ON a.id = aa.asset_id AND aa.returned_date IS NULL
LEFT JOIN employees e ON aa.employee_id = e.id
LEFT JOIN user_profiles up ON a.logged_by = up.id;

-- Grant access to authenticated users
GRANT SELECT ON v_assets_full TO authenticated;

-- Drop existing view if it exists
DROP VIEW IF EXISTS v_asset_assignments_full;

-- Create view for asset assignments with joined data
CREATE VIEW v_asset_assignments_full AS
SELECT 
    aa.id,
    aa.asset_id,
    aa.employee_id,
    aa.assigned_date,
    aa.assigned_by,
    aa.returned_date,
    aa.notes,
    aa.created_at,
    a.asset_tag,
    a.name as asset_name,
    a.serial_number,
    e.full_name as employee_name,
    e.employee_id as employee_code,
    d.name as department_name,
    c.name as category_name,
    u.email as assigned_by_email
FROM asset_assignments aa
LEFT JOIN assets a ON aa.asset_id = a.id
LEFT JOIN employees e ON aa.employee_id = e.id
LEFT JOIN departments d ON e.department_id = d.id
LEFT JOIN asset_categories c ON a.category_id = c.id
LEFT JOIN auth.users u ON aa.assigned_by = u.id;

-- Grant access to authenticated users
GRANT SELECT ON v_asset_assignments_full TO authenticated;

-- Drop existing view if it exists
DROP VIEW IF EXISTS v_maintenance_records_full;

-- Create view for maintenance records with joined data
CREATE VIEW v_maintenance_records_full AS
SELECT 
    mr.*,
    a.asset_tag,
    a.name as asset_name,
    up.email as created_by_email
FROM maintenance_records mr
LEFT JOIN assets a ON mr.asset_id = a.id
LEFT JOIN user_profiles up ON mr.created_by = up.id;

-- Grant access to authenticated users
GRANT SELECT ON v_maintenance_records_full TO authenticated;

-- Drop existing view if it exists
DROP VIEW IF EXISTS v_employees_full;

-- Create view for employees with joined data
CREATE VIEW v_employees_full AS
SELECT 
    e.*,
    d.name as department_name,
    l.name as location_name,
    up.email as created_by_email
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
LEFT JOIN locations l ON e.location_id = l.id
LEFT JOIN user_profiles up ON e.created_by = up.id;

-- Grant access to authenticated users
GRANT SELECT ON v_employees_full TO authenticated;
