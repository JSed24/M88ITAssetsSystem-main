-- Update v_asset_assignments_full view to include category, serial number, and assigned by email
DROP VIEW IF EXISTS v_asset_assignments_full;

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
