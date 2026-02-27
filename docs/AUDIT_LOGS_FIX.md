# Audit Logs Fix - Troubleshooting Guide

## Problem
Audit logs were not being written to the `audit_logs` table, causing the Audit Log report to show "no data to export".

## Root Causes Identified

### 1. Missing Script References
**Issue**: The `audit.js` module was never loaded in any HTML files, even though the code was calling `Audit.log()`.

**Fix Applied**: Added module script references for `audit.js` and `utils.js` to all HTML pages in `src/pages/` and the root `index.html`:
- `src/pages/assets.html`
- `src/pages/employees.html`
- `src/pages/maintenance.html`
- `src/pages/assignments.html`
- `src/pages/software-licenses.html`
- `src/pages/settings.html`
- `src/pages/dashboard.html`
- `src/pages/reports.html`
- `src/pages/audit-logs.html`
- `src/pages/lost-assets.html`
- `src/pages/user-maintenance.html`
- `index.html`

### 2. Auth Dependency Issue
**Issue**: The `audit.js` module referenced `Auth.user` which might not be available in all contexts.

**Fix Applied**: Modified `src/scripts/audit.js` to handle cases where Auth object is not available by falling back to getting the session directly from Supabase:

```javascript
// Get current user - try Auth object first, then Supabase session
let user = null;
if (typeof Auth !== 'undefined' && Auth.user) {
    user = Auth.user;
} else if (window.supabase) {
    const { data: { session } } = await window.supabase.auth.getSession();
    user = session?.user;
}
```

### 3. Missing Report Export Logging
**Issue**: Report exports weren't logging to the audit trail.

**Fix Applied**: Added audit logging to the report generation function in `src/pages/reports.html`:

```javascript
await Audit.log('EXPORT', 'report', null, null, {
    report_type: type,
    format: format,
    filename: filename,
    record_count: data.length
});
```

### 4. Potential RLS (Row Level Security) Issues
**Issue**: If RLS policies weren't properly configured, authenticated users might not have permission to insert audit logs.

**Fix Provided**: Created `database/migrations/011_fix_audit_logs.sql` script with proper RLS policies:
- Authenticated users can INSERT audit logs
- Users can SELECT their own audit logs
- Admins can SELECT all audit logs
- Service role has full access

## How to Apply the Fix

### Step 1: Apply SQL Changes (if needed)
Run the `database/migrations/011_fix_audit_logs.sql` script in your Supabase SQL editor:

1. Go to Supabase Dashboard → SQL Editor
2. Copy the contents of `fix_audit_logs.sql`
3. Execute the script
4. Verify the policies were created

### Step 2: Clear Browser Cache
1. Open your browser's Developer Tools (F12)
2. Go to Application/Storage tab
3. Clear all cache and reload the page (Ctrl+Shift+R or Cmd+Shift+R)

### Step 3: Test Audit Logging
1. Log in to the application
2. Perform an action (create/update/delete an asset, employee, etc.)
3. Go to Reports → Audit Log → Export Excel
4. Verify that audit entries are now being exported

## Verification Queries

### Check if audit logs are being inserted:
```sql
SELECT * FROM public.audit_logs ORDER BY created_at DESC LIMIT 10;
```

### Check RLS policies:
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'audit_logs';
```

### Check table permissions:
```sql
SELECT grantee, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name = 'audit_logs';
```

## Expected Behavior After Fix

1. **All user actions should be logged**: CREATE, UPDATE, DELETE operations on assets, employees, assignments, etc.
2. **Login/Logout events**: Should be recorded in audit logs
3. **Report exports**: Should be logged with metadata (type, format, record count)
4. **Audit Log report**: Should display all logged activities
5. **Export functionality**: Should successfully export audit logs to Excel

## Common Issues

### Issue: "Audit is not defined" error in console
**Solution**: Make sure the browser cache is cleared and `audit.js` is loading before the page scripts that use it.

### Issue: Still no data in audit logs
**Solution**: 
1. Check browser console for errors
2. Verify Supabase connection in `src/scripts/config.js` and `.env` variables
3. Run the SQL verification queries above
4. Check if RLS policies allow INSERT for authenticated users

### Issue: Can see own logs but not all logs (as admin)
**Solution**: Verify that the "Admins can view all audit logs" policy is active and the user's role in `user_profiles` is set to 'admin'.

## Testing Checklist

- [ ] audit.js loads without errors
- [ ] Login action creates audit log entry
- [ ] Creating an asset creates audit log entry
- [ ] Updating an employee creates audit log entry  
- [ ] Deleting a record creates audit log entry
- [ ] Exporting a report creates audit log entry
- [ ] Audit Log report shows data
- [ ] Export Audit Log to Excel works
- [ ] Admins can see all logs
- [ ] Regular users can see only their logs

## Files Modified

1. `src/scripts/audit.js` - Fixed Auth dependency
2. `src/pages/reports.html` - Added script tags and audit logging for exports
3. `src/pages/assets.html` - Added script tags
4. `src/pages/employees.html` - Added script tags
5. `src/pages/maintenance.html` - Added script tags
6. `src/pages/assignments.html` - Added script tags
7. `src/pages/software-licenses.html` - Added script tags
8. `src/pages/settings.html` - Added script tags
9. `src/pages/dashboard.html` - Added script tags
10. `index.html` - Added script tags
11. `database/migrations/011_fix_audit_logs.sql` - RLS policies
11. `fix_audit_logs.sql` - Created (RLS policies)

## Date Applied
February 2, 2026
