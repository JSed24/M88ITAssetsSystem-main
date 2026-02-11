# 📂 Project File Structure Reference

Quick reference guide for navigating the Madison 88 IT Assets System codebase.

## 🗂️ Directory Structure

### `/public/` - Public Assets & Entry Point
```
public/
├── index.html          # Login page (application entry point)
└── images/             # Static images
    ├── logo.png        # Company logo
    ├── favicon.png     # Site favicon
    └── bg-pattern.png  # Background pattern
```
**Purpose:** Contains publicly accessible assets and the main entry point.

---

### `/src/` - Source Code
```
src/
├── pages/              # Application HTML pages
├── styles/             # CSS stylesheets
└── scripts/            # JavaScript modules
```

#### `/src/pages/` - Application Pages
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
└── settings.html               # Admin settings & configuration
```
**Navigation Pattern:** All pages use relative paths:
- Images: `../../public/images/`
- Styles: `../styles/`
- Scripts: `../scripts/`
- Logout: `../../public/index.html`

#### `/src/styles/` - Stylesheets
```
styles/
└── styles.css          # Main application styles (includes dark mode)
```
**Contains:**
- Layout styles
- Component styles
- Dark mode theme
- Responsive design
- Custom utility classes

#### `/src/scripts/` - JavaScript Modules
```
scripts/
├── config.js           # Supabase configuration (⚠️ update with your credentials)
├── utils.js            # Utility functions & helpers
├── components.js       # Reusable UI components (modals, toasts, tables)
├── auth.js             # Authentication & session management
├── audit.js            # Audit logging functionality
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
└── import.js           # CSV/Excel import utilities
```
**Module Dependencies:**
- `config.js` → Must be configured first
- `utils.js` → Used by multiple modules
- `components.js` → Depends on utils.js

---

### `/database/` - Database Files
```
database/
└── migrations/         # SQL migration scripts (run in order)
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
    └── 014_update_assignments_view.sql
```
**Purpose:** Version-controlled database schema changes.  
**Usage:** Run migrations in numerical order in Supabase SQL Editor.

---

### `/docs/` - Documentation
```
docs/
├── RESTRUCTURING_GUIDE.md      # Migration guide for new structure
├── ASSIGNMENT_VIEWS.md         # Assignment views documentation
├── AUDIT_LOGS_FIX.md          # Audit logs fix documentation
├── MAINTENANCE_WORKFLOW.md     # Maintenance workflow guide
└── REPORTS_PERMISSION.md       # Reports permission documentation
```
**Purpose:** Technical documentation and implementation guides.

---

### `/sample-data/` - Sample Data
```
sample-data/
├── sample_assets.csv           # Sample asset data for import
└── sample_employees.csv        # Sample employee data for import
```
**Purpose:** Example CSV files for testing import functionality.

---

### `/tests/` - Test Files
```
tests/
└── test-audit.html             # Audit functionality test page
```
**Purpose:** Testing and QA files (not deployed to production).

---

## 📝 Configuration Files

### Root Level Files
```
.
├── .gitignore                  # Git ignore rules
├── .env.example                # Environment variable template
├── package.json                # Project metadata & npm scripts
└── README.md                   # Main project documentation
```

## 🔗 Path Reference Cheat Sheet

### From `public/index.html` to:
| Target | Path |
|--------|------|
| Images | `images/` |
| Styles | `../src/styles/` |
| Scripts | `../src/scripts/` |
| Dashboard | `../src/pages/dashboard.html` |

### From `src/pages/*.html` to:
| Target | Path |
|--------|------|
| Images | `../../public/images/` |
| Styles | `../styles/` |
| Scripts | `../scripts/` |
| Index (logout) | `../../public/index.html` |
| Other pages | `./page-name.html` |

### From `src/scripts/*.js` to:
| Target | Path |
|--------|------|
| Other scripts | `./script-name.js` |

## 🚀 Quick Navigation

### Want to modify...
- **Login page?** → `public/index.html`
- **Dashboard?** → `src/pages/dashboard.html` + `src/scripts/dashboard.js`
- **Styles?** → `src/styles/styles.css`
- **Configuration?** → `src/scripts/config.js`
- **Database schema?** → `database/migrations/`
- **Documentation?** → `docs/`

### Want to add...
- **New page?** → Create in `src/pages/`, use existing pages as template
- **New feature?** → Add script to `src/scripts/`
- **Database change?** → Create new migration in `database/migrations/`
- **Documentation?** → Add `.md` file to `docs/`

## 🎨 File Naming Conventions

- **HTML pages:** `kebab-case.html` (e.g., `lost-assets.html`)
- **JavaScript:** `camelCase.js` (e.g., `dashboard.js`)
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
