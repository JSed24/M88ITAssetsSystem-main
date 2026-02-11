# Reports Permission System Documentation

## Overview
This system allows administrators to control whether IT Staff can access the Reports page and export functionality. This provides granular permission control beyond basic role assignments.

## Database Setup

**Run this SQL script first:**
```sql
-- See: create_system_settings.sql
```

This creates:
- `system_settings` table for global configuration
- Default setting: `it_staff_can_access_reports = true`
- Row-level security policies (anyone can read, only admins can update)

## Admin Configuration

### Accessing Permission Settings

1. Log in as an **Admin** user
2. Navigate to **Settings** page
3. Click the **Permissions** tab
4. Find "IT Staff Reports Access" section

### Toggle Setting

**Enable** (Default):
- IT Staff can see "Reports" in navigation
- IT Staff can access Reports page
- IT Staff can export data as PDF or Excel

**Disable**:
- "Reports" navigation hidden for IT Staff
- Attempting to access reports.html redirects to dashboard
- IT Staff cannot export reports

### Visual Indicator
The toggle switch shows current state:
- 🔵 Blue = Enabled (IT Staff has access)
- ⚫ Gray = Disabled (IT Staff blocked)

## Permission Logic by Role

| Role | Reports Access | Can Change Permission |
|------|---------------|----------------------|
| **Admin** | Always YES | YES (via Settings) |
| **IT Staff** | Depends on setting | NO |
| **Viewer** | Always NO | NO |

## Technical Implementation

### Files Modified

1. **create_system_settings.sql**
   - Creates system_settings table
   - Inserts default permission
   - Sets up RLS policies

2. **settings.html**
   - Added "Permissions" tab
   - Toggle UI for IT staff reports access
   - Function: `toggleReportsPermission()`
   - Function: `loadPermissions()`

3. **reports.html**
   - Permission check in `init()` function
   - Redirects IT staff to dashboard if permission denied

4. **js/utils.js**
   - `checkReportsPermission()` - Queries system_settings
   - `handleReportsNavVisibility()` - Shows/hides nav link

5. **dashboard.html**
   - Uses Utils.handleReportsNavVisibility()
   - Hides reports nav for IT staff when disabled

### Permission Check Flow

```
User loads page
    ↓
Get user profile
    ↓
Is role = 'viewer'? → YES → Hide reports nav, block access
    ↓ NO
Is role = 'admin'? → YES → Show reports nav, allow access
    ↓ NO
Is role = 'it_staff'?
    ↓ YES
Query system_settings table
    ↓
it_staff_can_access_reports = ?
    ↓
'true' → Show nav, allow access
'false' → Hide nav, block access (redirect)
```

### Database Query

```javascript
const { data: setting } = await supabase
    .from('system_settings')
    .select('setting_value')
    .eq('setting_key', 'it_staff_can_access_reports')
    .single();

const hasPermission = setting?.setting_value === 'true';
```

## Usage Scenarios

### Scenario 1: Restrict Reports Access

**Situation**: Organization wants IT staff to manage assets but not generate reports.

**Solution**:
1. Admin goes to Settings → Permissions
2. Disables "IT Staff Reports Access"
3. IT staff users lose reports navigation immediately
4. Attempting to access /reports.html redirects to dashboard

### Scenario 2: Grant Temporary Access

**Situation**: Need IT staff to generate monthly report.

**Solution**:
1. Admin enables permission before end of month
2. IT staff can access and export reports
3. Admin disables permission after report is submitted

### Scenario 3: Role-Based Separation

**Situation**: Different IT staff have different responsibilities.

**Current Limitation**: Permission applies to ALL IT staff users.

**Workaround**: 
- Users needing reports → Promote to Admin role (if appropriate)
- Users not needing reports → Keep as IT Staff with permission disabled

## Audit Logging

Permission changes are logged in audit_logs:

```javascript
{
  action: 'UPDATE',
  action_category: 'settings',
  description: 'Enabled IT Staff access to reports',
  table_name: 'system_settings',
  record_id: 'it_staff_can_access_reports',
  old_values: { enabled: false },
  new_values: { enabled: true }
}
```

View audit logs:
- Settings → Permissions → (Make change)
- Navigate to Audit Logs page
- Filter by action_category = "settings"

## Security Considerations

### Frontend Protection
- Navigation links hidden via CSS
- Page access redirects unauthorized users

### Backend Protection
The system_settings table has RLS (Row Level Security):
- ✅ All authenticated users can READ settings
- ✅ Only admins can UPDATE settings
- ❌ IT staff cannot modify their own permissions

### Fail-Safe Behavior
If permission check fails (network error, database issue):
- System defaults to **ALLOWING** access (fail-open for IT staff)
- Prevents system lockout from transient errors
- Error logged to console for troubleshooting

## Troubleshooting

### Permission toggle not working
1. Check user is Admin role
2. Verify system_settings table exists
3. Check browser console for errors
4. Verify RLS policies are active

### IT staff still sees reports after disabling
- Ask user to log out and log back in
- Clear browser cache
- Verify setting_value is 'false' in database:
  ```sql
  SELECT * FROM system_settings 
  WHERE setting_key = 'it_staff_can_access_reports';
  ```

### Reports page shows blank screen
- Check console for JavaScript errors
- Verify Supabase connection
- Ensure reports-nav element exists in HTML

### Permission check too slow
The permission is checked on page load. If slow:
- Check database connection latency
- Verify system_settings table has index on setting_key
- Consider caching permission in localStorage (with TTL)

## Future Enhancements

Potential improvements for this system:

1. **Per-User Permissions**: Instead of role-wide, allow admin to grant reports access to specific IT staff users

2. **Additional Permissions**: Add more toggles:
   - Can delete assets
   - Can modify assignments
   - Can access audit logs
   - Can import/export data

3. **Time-Based Permissions**: Auto-enable/disable at scheduled times

4. **Permission Groups**: Create permission profiles ("Read Only IT", "Full Access IT")

5. **Email Notifications**: Alert admins when permissions are changed

6. **Permission History**: Track who changed permissions and when (already partially done via audit logs)

## API Reference

### JavaScript Functions

#### Utils.checkReportsPermission(supabase)
```javascript
/**
 * Check if IT staff has reports permission
 * @param {object} supabase - Supabase client
 * @returns {Promise<boolean>} true if allowed
 */
const hasPermission = await Utils.checkReportsPermission(supabase);
```

#### Utils.handleReportsNavVisibility(currentUser, supabase)
```javascript
/**
 * Show/hide reports navigation based on permission
 * @param {object} currentUser - User object with role
 * @param {object} supabase - Supabase client
 */
await Utils.handleReportsNavVisibility(currentUser, supabase);
```

#### toggleReportsPermission(enabled)
```javascript
/**
 * Admin function to toggle IT staff reports access
 * @param {boolean} enabled - true to enable, false to disable
 */
window.toggleReportsPermission = async (enabled) => { ... };
```

### Database Schema

```sql
CREATE TABLE system_settings (
    id UUID PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'string',
    description TEXT,
    updated_by UUID REFERENCES auth.users(id),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);
```

## Testing Checklist

- [ ] Run create_system_settings.sql successfully
- [ ] Admin can see Permissions tab
- [ ] Admin can toggle IT staff reports permission
- [ ] Toggle shows correct state (blue = on, gray = off)
- [ ] IT staff sees reports nav when enabled
- [ ] IT staff cannot see reports nav when disabled
- [ ] IT staff redirected from reports.html when disabled
- [ ] Admin always has access regardless of toggle
- [ ] Viewer never has access regardless of toggle
- [ ] Permission change is logged in audit_logs
- [ ] Toast notification shows on toggle
- [ ] Page refresh maintains toggle state
- [ ] Multiple IT staff users affected by same setting

## Migration Guide

For existing installations:

1. **Backup database** before making changes

2. **Run SQL migration**:
   ```bash
   psql -d your_database -f create_system_settings.sql
   ```

3. **Verify table created**:
   ```sql
   SELECT * FROM system_settings;
   -- Should see 1 row with it_staff_can_access_reports = true
   ```

4. **Test with IT staff account**:
   - Login as IT staff
   - Verify reports visible
   - Have admin disable permission
   - Refresh page
   - Reports should be hidden

5. **Roll back if needed**:
   ```sql
   DROP TABLE system_settings CASCADE;
   ```

## Support

For issues with the permission system:
1. Check audit logs for permission changes
2. Verify system_settings table data
3. Review browser console for errors
4. Test with different user roles
5. Check RLS policies are active
