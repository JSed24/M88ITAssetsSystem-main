-- Add created_by column to employees table to track who added the employee

-- Add the created_by column (allows NULL for existing records)
ALTER TABLE employees 
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_employees_created_by ON employees(created_by);

-- Add comment to document the column
COMMENT ON COLUMN employees.created_by IS 'User ID of the person who created/added this employee';
