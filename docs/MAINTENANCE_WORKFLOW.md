# Maintenance Workflow Documentation

## Overview
This document explains the enhanced maintenance workflow that automatically manages asset statuses throughout the maintenance lifecycle.

## Database Changes Required

Before using the new maintenance workflow, run this SQL command:

```sql
ALTER TABLE maintenance_records 
ADD COLUMN IF NOT EXISTS original_asset_status VARCHAR(50);
```

This column stores the asset's original status before maintenance, enabling smart status restoration.

## Workflow Rules

### 1. Creating Maintenance Records

When a maintenance record is created:

#### ✅ Allowed
- Assets with status: `available`, `assigned`, `damaged`, `lost`
- Only ONE active maintenance record per asset

#### ❌ Blocked
- **Decommissioned assets**: Cannot create maintenance for decommissioned assets
  - Error: "Cannot create maintenance record for decommissioned asset. Decommissioned assets cannot be repaired."
  
- **Assets already under repair**: If asset has active maintenance
  - Error: "This asset already has an active maintenance record. Please complete the current maintenance before creating a new one."

#### Automatic Actions
1. **Original status is saved**: System stores current status in `original_asset_status`
2. **Status changes to `under_repair`**: Asset automatically becomes unavailable for assignments

### 2. Assets Under Maintenance

While asset is under repair (`under_repair` status):

#### ✅ Allowed
- View asset details
- Update maintenance record details
- Cancel maintenance (if needed)

#### ❌ Blocked
- **Cannot assign to employees**
  - Error: "Cannot assign asset that is under repair. Please wait for the maintenance to be completed."
  
- **Cannot create new maintenance**: Until current maintenance is completed

### 3. Completing Maintenance

When maintenance is marked as completed, the system automatically restores the asset status based on the original status and current state:

#### Status Restoration Logic

| Original Status | Current Assignment | New Status | Explanation |
|----------------|-------------------|------------|-------------|
| `assigned` | ✅ Still assigned | `assigned` | Returns to employee who had it |
| `assigned` | ❌ No assignment | `available` | Assignment was returned during repair |
| `available` | Any | `available` | Returns to available pool |
| `damaged` | Any | `available` | Repair makes it usable again |
| `lost` | Any | `available` | Found and repaired, now usable |
| `decommissioned` | Any | `decommissioned` | Stays decommissioned (shouldn't happen) |

#### Smart Assignment Restoration

**Scenario 1: Asset was assigned before maintenance**
- Employee: John Doe
- Asset: Laptop L001 (status: `assigned`)
- Maintenance: Screen replacement
- **Result**: After completion → status: `assigned`, still assigned to John Doe

**Scenario 2: Assignment returned during maintenance**
- Employee: Jane Smith returned the asset during repair
- Asset: Monitor M002 (original status: `assigned`)
- Maintenance: Display repair
- **Result**: After completion → status: `available`, ready for new assignment

**Scenario 3: Damaged asset repaired**
- Asset: Keyboard K003 (status: `damaged`)
- Maintenance: Key replacement
- **Result**: After completion → status: `available`, ready to be assigned

## Multiple Maintenance Records

### One Asset, One Maintenance Policy
- Only **ONE active maintenance record** allowed per asset at a time
- Active = status is `pending` or `in_progress`
- After completion, new maintenance records can be created if needed

### Example Workflow
1. Create maintenance for Laptop L001 (status becomes `under_repair`)
2. Try to create another maintenance for L001 → **BLOCKED** ❌
3. Complete first maintenance (status restored)
4. Now can create new maintenance if needed → **ALLOWED** ✅

## Best Practices

### For IT Staff

1. **Before creating maintenance**:
   - Verify asset is not decommissioned
   - Check no active maintenance exists
   - Note current assignment status

2. **During maintenance**:
   - Update maintenance record with progress notes
   - Do not manually change asset status (system manages it)
   - Do not try to assign asset to others

3. **After completing maintenance**:
   - System automatically restores correct status
   - If asset was assigned, notify the employee it's ready
   - Verify status is correct in asset list

### For Administrators

1. **Monitor maintenance records**:
   - Review pending maintenance regularly
   - Ensure timely completion
   - Check for long-running repairs

2. **Asset assignments**:
   - Do not force-change status while under repair
   - Trust the automatic restoration logic
   - Review audit logs for status changes

## Error Messages Reference

| Error | Cause | Solution |
|-------|-------|----------|
| "Cannot create maintenance record for decommissioned asset" | Trying to repair decommissioned asset | Asset cannot be repaired once decommissioned |
| "This asset already has an active maintenance record" | Asset has pending/in_progress maintenance | Complete existing maintenance first |
| "Cannot assign asset that is under repair" | Trying to assign asset with `under_repair` status | Wait for maintenance completion |

## Audit Trail

All maintenance actions are logged:

- **Maintenance Created**: Records original asset status
- **Maintenance Updated**: Tracks changes to maintenance details
- **Maintenance Completed**: Logs status restoration
- **Status Changes**: Automatic status changes are audited

## Technical Details

### Files Modified
- `js/maintenance.js`: Create and complete methods
- `js/assignments.js`: Assignment validation
- `add_original_status_column.sql`: Database migration

### Database Schema
```sql
maintenance_records {
  id: UUID
  asset_id: UUID
  original_asset_status: VARCHAR(50)  -- NEW COLUMN
  status: VARCHAR(50)  -- pending, in_progress, completed, cancelled
  issue_description: TEXT
  start_date: DATE
  end_date: DATE
  cost: DECIMAL
  notes: TEXT
  created_by: UUID
  created_at: TIMESTAMP
}
```

### Status Values
- `available`: Ready for assignment
- `assigned`: Currently with an employee
- `under_repair`: In maintenance (managed automatically)
- `lost`: Missing asset
- `damaged`: Broken but not in repair
- `decommissioned`: Permanently retired

## FAQ

**Q: What if I need to assign a different employee while asset is under repair?**
A: You cannot. Complete the maintenance first, then reassign if needed.

**Q: Can I manually change asset status while under maintenance?**
A: Not recommended. The system manages status automatically for consistency.

**Q: What if maintenance takes weeks and employee needs replacement?**
A: Assign a different available asset temporarily. Original assignment is preserved.

**Q: Can I cancel maintenance and restore status manually?**
A: Use the cancel maintenance function. Status restoration logic still applies.

**Q: What if asset has multiple issues needing separate maintenance?**
A: Complete first maintenance, then create new maintenance record for next issue.

## Support

For issues or questions about the maintenance workflow:
1. Check audit logs for status change history
2. Verify asset current status in assets list
3. Review maintenance record details
4. Contact system administrator if restoration logic seems incorrect
