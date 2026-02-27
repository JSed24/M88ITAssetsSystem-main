# 📂 Project File Structure Reference

Quick reference guide for navigating the Madison 88 IT Assets System codebase.

## 🗂️ Directory Structure

### Root - Configuration & Entry Point
```
M88ITAssetsSystem/
├── index.html          # Login page (application entry point)
├── .env                # Environment variables (not committed)
├── .env.example        # Environment variable template
├── .gitignore          # Git ignore rules
├── package.json        # Dependencies & npm scripts
└── vite.config.js      # Vite build configuration
```

---

### `/public/` - Static Assets
```
public/
└── images/
    ├── logo.png        # Company logo (sidebar)
    ├── favicon.png     # Browser tab icon
    ├── bg-pattern.png  # Login page background pattern
    └── Scenic.png      # Scenic background image
```
**Purpose:** Served at `/` by Vite. Static files that don't need processing.

---

### `/src/` - Source Code
```
src/
├── pages/              # Application HTML pages
├── styles/             # CSS stylesheets
└── scripts/            # JavaScript modules
```

#### `/src/pages/` - Application Pages (12 pages)
```
pages/
├── dashboard.html              # Main dashboard with stats & charts
├── assets.html                 # Asset management CRUD
├── employees.html              # Employee management
├── assignments.html            # Asset assignment tracking
├── maintenance.html            # Maintenance & repair logs
├── software-licenses.html      # Software license management
├── lost-assets.html            # Lost asset tracking
├── audit-logs.html             # System audit logs
├── reports.html                # Reports & data export
├── settings.html               # Admin/Executive settings & configuration
├── user-maintenance.html       # User account management
└── set-password.html           # Password set/reset page
```

#### `/src/styles/` - Stylesheets
```
styles/
└── styles.css          # Main application styles (Tailwind CSS + custom)
```

#### `/src/scripts/` - JavaScript Modules (19 files)
```
scripts/
├── config.js           # Supabase client & app configuration (uses .env)
├── auth.js             # Authentication, session, roles & regions
├── audit.js            # Audit trail logging
├── utils.js            # Utility functions & helpers
├── components.js       # Reusable UI components (modals, toasts, tables)
├── notifications.js    # Dashboard alerts & notifications
├── app.js              # Main application initialization
├── dashboard.js        # Dashboard logic, charts, & statistics
├── assets.js           # Asset CRUD operations
├── employees.js        # Employee management operations
├── assignments.js      # Asset assignment tracking
├── maintenance.js      # Maintenance record management
├── licenses.js         # Software license operations
├── reports.js          # Report generation logic
├── export.js           # Excel/PDF export utilities
├── import.js           # CSV/Excel import utilities
├── vendor-chart.js     # Chart.js vendor bundle
├── vendor-pdf.js       # jsPDF + jsPDF-AutoTable vendor bundle
└── vendor-xlsx.js      # SheetJS (XLSX) vendor bundle
```
**Module Dependencies:**
- `config.js` → Initializes Supabase client from `.env` variables
- `auth.js` → Handles authentication, loads user roles and regions
- `utils.js` → Used by most other modules
- `components.js` → Depends on utils.js
- `vendor-*.js` → Bundle third-party libraries for use in modules

---

### `/database/` - Database Migrations
```
database/
└── migrations/                                    # 33 SQL scripts (run in order)
    ├── 002_add_audit_columns.sql
    ├── 003_add_created_by_to_employees.sql
    ├── 004_add_import_permission.sql
    ├── 005_add_is_active_to_categories.sql
    ├── 006_add_logged_by_column.sql
    ├── 007_add_original_status_column.sql
    ├── 008_create_lost_assets_table.sql
    ├── 009_create_system_settings.sql
    ├── 010_create_views.sql
    ├── 011_fix_audit_logs.sql
    ├── 012_fix_maintenance_columns.sql
    ├── 013_fix_maintenance_status_constraint.sql
    ├── 014_update_assignments_view.sql
    ├── 015_add_regions_and_executive_role.sql
    ├── 016_add_region_to_data_tables.sql
    ├── 017_add_audit_logs_permission.sql
    ├── 018_fix_executive_audit_logs_access.sql
    ├── 019_make_lost_assets_employee_nullable.sql
    ├── 020_fix_lost_assets_view_add_region.sql
    ├── 021_fix_warranty_view_add_region.sql
    ├── 022_create_notifications_table.sql
    ├── 023_create_refresh_due_view.sql
    ├── 024_add_suggested_refresh_date_to_view.sql
    ├── 025_create_user_roles_and_regions_tables.sql
    ├── 026_create_software_categories.sql
    ├── 027_create_employee_required_categories.sql
    ├── 028_add_category_id_to_assignments_view.sql
    ├── 029_add_employee_to_license_assignments.sql
    ├── 030_fix_user_profiles_insert_policy.sql
    ├── 031_fix_user_delete_constraints.sql
    ├── 032_add_is_active_to_software_licenses.sql
    ├── 032_add_password_link_tracking.sql
    ├── 033_restructure_software_licenses.sql
    └── 034_add_temporary_replacements.sql
```
**Purpose:** Version-controlled database schema changes.
**Usage:** Run migrations in numerical order in Supabase SQL Editor.

---

### `/docs/` - Documentation
```
docs/
├── ASSIGNMENT_VIEWS.md         # Assignment table & grouped view documentation
├── AUDIT_LOGS_FIX.md           # Audit logs setup & troubleshooting
├── FILE_STRUCTURE.md           # This file - project structure reference
├── IMAGES.md                   # Image asset specifications
├── MAINTENANCE_WORKFLOW.md     # Maintenance workflow & status management
├── REPORTS_PERMISSION.md       # Reports permission system documentation
└── RESTRUCTURING_GUIDE.md      # Codebase restructuring history
```

---

### `/sample-data/` - Sample Data
```
sample-data/
├── M88_ITEquipment2025.csv     # IT equipment inventory data
├── sample_assets.csv           # Sample asset data for import
├── sample_assignments.csv      # Sample assignment data
└── sample_employees.csv        # Sample employee data for import
```

---

### `/tests/` - Test Files
```
tests/
└── test-audit.html             # Audit functionality test page
```

---

## 🔗 Path Reference

### From `index.html` (root) to:
| Target | Path |
|--------|------|
| Images | `/images/` (served from public/) |
| Styles | `/src/styles/styles.css` |
| Scripts | `/src/scripts/*.js` |
| Dashboard | `/src/pages/dashboard.html` |

### From `src/pages/*.html` to:
| Target | Path |
|--------|------|
| Images | `/images/` (absolute, served from public/) |
| Styles | `../styles/styles.css` or `/src/styles/styles.css` |
| Scripts | `../scripts/*.js` or `/src/scripts/*.js` |
| Login (logout) | `/index.html` |
| Other pages | `./page-name.html` |

### From `src/scripts/*.js` to:
| Target | Path |
|--------|------|
| Other scripts | `./script-name.js` |

---

## 🚀 Quick Navigation

### Want to modify...
- **Login page?** → `index.html`
- **Dashboard?** → `src/pages/dashboard.html` + `src/scripts/dashboard.js`
- **Styles?** → `src/styles/styles.css`
- **Configuration?** → `.env` (credentials) or `src/scripts/config.js` (app settings)
- **Database schema?** → `database/migrations/`
- **Documentation?** → `docs/`
- **User roles/regions?** → `src/scripts/config.js` (USER_ROLES, REGIONS)

### Want to add...
- **New page?** → Create in `src/pages/`, add entry to `vite.config.js` rollupOptions.input
- **New feature?** → Add script to `src/scripts/`
- **Database change?** → Create new migration in `database/migrations/` (next number: 035)
- **Documentation?** → Add `.md` file to `docs/`

---

## 🎨 File Naming Conventions

- **HTML pages:** `kebab-case.html` (e.g., `lost-assets.html`)
- **JavaScript:** `camelCase.js` or `kebab-case.js` (e.g., `dashboard.js`, `vendor-chart.js`)
- **CSS:** `kebab-case.css` (e.g., `styles.css`)
- **SQL migrations:** `NNN_snake_case.sql` (e.g., `002_add_audit_columns.sql`)
- **Documentation:** `SCREAMING_SNAKE_CASE.md` (e.g., `AUDIT_LOGS_FIX.md`)

## 📊 File Count Summary

- **Pages:** 10 HTML files (1 entry + 9 app pages)
- **Scripts:** 16 JavaScript modules
- **Styles:** 1 CSS file
- **Migrations:** 13 SQL files
- **Documentation:** 5 markdown files
- **Sample Data:** 2 CSV files
- **Tests:** 1 test file

---

**Last Updated:** February 9, 2026  
**Structure Version:** 2.0 (Restructured)
