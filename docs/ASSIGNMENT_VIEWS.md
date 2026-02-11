# Assignment Views Feature

## Overview

The assignments page now supports two viewing modes:
1. **Table View** - Traditional table layout showing all assignments
2. **By Employee View** - Grouped accordion view organized by employee

Both views respect the status filter and provide full functionality for admins and IT staff.

## Features

### View Toggle
- Located in the card header next to the status filter
- Two buttons: "Table View" and "By Employee"
- Default view: Table View
- Instant switching between views
- Active view highlighted in blue

### Table View (Default)
- Traditional table with 7 columns:
  - Asset (name + tag)
  - Assigned To
  - Department
  - Assigned Date
  - Returned
  - Status (badge)
  - Actions (Return button)
- Shows active, returned, or all assignments based on filter
- Return button available for active assignments (admin/IT staff only)

### By Employee View (Grouped/Accordion)
- Groups assignments by active employee
- Each employee card shows:
  - Employee initials in circle badge
  - Full name
  - Department
  - Active assignment count badge
  - Returned assignment count badge (if any)
  - Expand/collapse chevron icon

#### Employee Card Details (Expanded)
- **Active Assignments** (normal styling):
  - Asset name and tag
  - Category, Serial Number
  - Assigned Date, Assigned By Email
  - "Active" badge
  - Return button (admin/IT staff only)

- **Returned Assignments** (grayed/muted):
  - Asset name (strikethrough) and tag
  - Category, Serial Number
  - Assigned Date, Returned Date
  - "Returned" badge
  - Reduced opacity (60%)

- **No Assignments**:
  - Message: "No active assignments"

### Filter Integration
The status filter works with both views:
- **Active Only**: Shows only active assignments in both views
- **All Assignments**: Shows both active and returned
- **Returned**: Shows only returned assignments

When switching filters in grouped view, the data refreshes automatically.

## Technical Implementation

### HTML Structure
```html
<!-- View Toggle Buttons -->
<div class="flex gap-1 bg-slate-800 rounded-lg p-1">
    <button id="table-view-btn" onclick="switchView('table')">Table View</button>
    <button id="grouped-view-btn" onclick="switchView('grouped')">By Employee</button>
</div>

<!-- Table View Container -->
<div id="table-view" class="overflow-x-auto">
    <table class="data-table">...</table>
</div>

<!-- Grouped View Container -->
<div id="grouped-view" class="hidden p-4">
    <div id="grouped-view-body" class="space-y-3">...</div>
</div>
```

### JavaScript Functions

#### `switchView(viewType)`
- Toggles visibility between table and grouped views
- Updates button active states
- Loads grouped view data when switching to "grouped"
- Parameters: `'table'` or `'grouped'`

#### `loadGroupedView()`
- Fetches all active employees
- Fetches assignments based on status filter
- Fetches department names for mapping
- Groups assignments by employee
- Separates active vs returned assignments
- Generates accordion HTML with proper styling
- Shows employees with no assignments

#### `toggleEmployee(employeeId)`
- Expands/collapses individual employee cards
- Rotates chevron icon (0° / 180°)
- Smooth transition animation

### Data Queries

**Employees:**
```javascript
supabase.from('employees')
    .select('id, first_name, last_name, email, department_id')
    .eq('status', 'active')
    .order('last_name')
```

**Assignments:**
```javascript
supabase.from('v_asset_assignments_full')
    .select('*')
    .order('assigned_date', { ascending: false })
    // With filter applied (active/returned/all)
```

**Departments:**
```javascript
supabase.from('departments')
    .select('id, name')
```

### Styling

**Active Assignments:**
- Normal text colors (white/blue)
- Full opacity
- Success badge (green)

**Returned Assignments:**
- Muted text colors (slate-400/500)
- Strikethrough asset name
- Reduced opacity (60%)
- Gray badge

**Employee Cards:**
- Dark slate background (slate-800)
- Hover effect on header
- Rounded borders
- Smooth expand/collapse transitions

## Role-Based Behavior

### Admin & IT Staff
- Can see both views
- Can expand/collapse employees in grouped view
- Can return assets from both views
- See all assignments based on filter

### Viewer
- Can see both views (read-only)
- Can expand/collapse employees
- No return buttons shown
- Cannot modify assignments

## User Experience

### Default Behavior
- Page loads in Table View
- No preference saved (always defaults to table)
- Filter defaults to "Active Only"

### View Switching
- Instant visual feedback
- Grouped view loads data only when first accessed
- Smooth transitions between views
- Maintains current filter selection

### Grouped View UX
- All employees start collapsed
- Click anywhere on employee header to expand
- Chevron rotates to indicate state
- Assignment cards are touch-friendly
- Clear visual distinction between active/returned

## Performance Considerations

- Grouped view loads data on-demand
- Limited to active employees only
- Efficient grouping algorithm (O(n) complexity)
- Department names fetched once and mapped
- Assignment details included in single query (via view)

## Future Enhancements (Optional)

1. **Search in Grouped View**: Filter employees by name
2. **Department Grouping**: Add another view grouped by department
3. **View Preference**: Remember last selected view in localStorage
4. **Bulk Actions**: Select multiple assignments in grouped view
5. **Export**: Export grouped view data to Excel/PDF
6. **Sorting**: Sort employees by assignment count, department, etc.

## Troubleshooting

### Grouped View Not Loading
- Check browser console for errors
- Verify `v_asset_assignments_full` view exists
- Ensure user has read access to employees, departments, and assignments tables

### Return Button Not Working
- Verify user role (admin/IT staff)
- Check that assignment is active (not returned)
- Ensure `openReturnModal()` function is available

### Filter Not Applying
- Status filter triggers `loadAssignments()` for table view
- Grouped view respects filter on next load
- Try switching views to refresh data

### Visual Issues
- Ensure Tailwind CSS is loaded
- Check for conflicting styles in `styles.css`
- Verify SVG icons are rendering properly

## Testing Checklist

- [ ] Toggle between table and grouped views
- [ ] Verify default is table view on page load
- [ ] Apply each filter (Active/All/Returned) in both views
- [ ] Expand/collapse employee cards
- [ ] Verify active assignments display correctly
- [ ] Verify returned assignments are grayed/strikethrough
- [ ] Check employees with no assignments show message
- [ ] Test return button in both views
- [ ] Verify viewer role sees no return buttons
- [ ] Check responsive behavior on mobile
- [ ] Verify chevron rotation animation
- [ ] Test with large dataset (50+ employees)
