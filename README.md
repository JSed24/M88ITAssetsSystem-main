# Madison 88 IT Equipment Inventory Management System

A comprehensive IT asset management system built for Madison 88.

## 🚀 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Charts:** Chart.js
- **Export:** SheetJS (XLSX), jsPDF
- **Deployment:** Netlify

## 📁 Project Structure

```
M88ITAssetsSystem/
├── .gitignore                      # Git ignore rules
├── .env.example                    # Environment template
├── package.json                    # Project metadata & scripts
├── README.md                       # Main documentation
│
├── public/                         # Entry point & static assets
│   ├── index.html                 # Login page
│   └── images/                    # Images & branding
│       ├── logo.png               # Company logo
│       ├── favicon.png            # Site favicon
│       └── bg-pattern.png         # Background pattern
│
├── src/                           # Source code
│   ├── pages/                     # Application pages
│   │   ├── dashboard.html         # Main dashboard
│   │   ├── assets.html            # Asset management
│   │   ├── employees.html         # Employee management
│   │   ├── assignments.html       # Asset assignments
│   │   ├── maintenance.html       # Maintenance logs
│   │   ├── software-licenses.html # Software licenses
│   │   ├── lost-assets.html       # Lost asset tracking
│   │   ├── audit-logs.html        # System audit logs
│   │   ├── reports.html           # Reports & analytics
│   │   └── settings.html          # Admin settings
│   │
│   ├── styles/                    # CSS stylesheets
│   │   └── styles.css             # Main styles
│   │
│   └── scripts/                   # JavaScript modules
│       ├── config.js              # Supabase config
│       ├── utils.js               # Helper functions
│       ├── components.js          # Reusable UI components
│       ├── auth.js                # Authentication
│       ├── audit.js               # Audit logging
│       ├── notifications.js       # Notifications
│       ├── app.js                 # Main application
│       ├── dashboard.js           # Dashboard logic
│       ├── assets.js              # Asset operations
│       ├── employees.js           # Employee management
│       ├── assignments.js         # Assignment tracking
│       ├── maintenance.js         # Maintenance records
│       ├── licenses.js            # License management
│       ├── reports.js             # Report generation
│       ├── export.js              # Export utilities
│       └── import.js              # Import utilities
│
├── database/                      # Database files
│   └── migrations/                # SQL migration scripts
│       ├── 002_add_audit_columns.sql
│       ├── 003_add_created_by_to_employees.sql
│       ├── 004_add_import_permission.sql
│       ├── 005_add_is_active_to_categories.sql
│       ├── 006_add_logged_by_column.sql
│       ├── 007_add_original_status_column.sql
│       ├── 008_create_lost_assets_table.sql
│       ├── 009_create_system_settings.sql
│       ├── 010_create_views.sql
│       ├── 011_fix_audit_logs.sql
│       ├── 012_fix_maintenance_columns.sql
│       ├── 013_fix_maintenance_status_constraint.sql
│       └── 014_update_assignments_view.sql
│
├── docs/                          # Documentation
│   ├── ASSIGNMENT_VIEWS.md
│   ├── AUDIT_LOGS_FIX.md
│   ├── MAINTENANCE_WORKFLOW.md
│   └── REPORTS_PERMISSION.md
│
├── sample-data/                   # Sample/seed data
│   ├── sample_assets.csv
│   └── sample_employees.csv
│
└── tests/                         # Test files
    └── test-audit.html
```

## ⚙️ Setup Instructions

### 1. Configure Supabase

1. Open `src/scripts/config.js`
2. Replace the placeholder values with your Supabase credentials:
   ```javascript
   const SUPABASE_URL = 'your-project-url';
   const SUPABASE_ANON_KEY = 'your-anon-key';
   ```

### 2. Create First Admin User

1. Go to your Supabase Dashboard
2. Navigate to Authentication → Users
3. Click "Add user" → "Create new user"
4. Enter email and password
5. After creating, go to SQL Editor and run:
   ```sql
   INSERT INTO user_profiles (id, email, full_name, role)
   VALUES (
       'user-uuid-from-auth-users',
       'admin@madison88.com',
       'System Administrator',
       'admin'
   );
   ```

### 3. Run Locally

Navigate to the project root and start a local server:

```bash
# Using npm (recommended)
npm run dev

# Or using Python
python -m http.server 8000

# Or using Node.js
npx serve .

# Or using VS Code
# Install "Live Server" extension, right-click public/index.html and select "Open with Live Server"
```

Then open your browser to:
- http://localhost:8000/public/ (for Python)
- http://localhost:3000/public/ (for npm serve)

### 4. Database Setup

Run the SQL migration scripts in order from `database/migrations/`:

### 4. Deploy to Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Deploy!

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| Admin | Full access - manage users, all CRUD operations |
| IT Staff | Can manage assets, employees, assignments, maintenance |
| Viewer | Read-only access to view assets and reports |

## 📊 Features

- ✅ Asset Registration & Management
- ✅ Employee Management
- ✅ Asset Assignment Tracking
- ✅ Maintenance & Repair Logs
- ✅ Software License Tracking
- ✅ Dashboard with Charts
- ✅ Warranty Expiration Alerts
- ✅ Refresh Cycle Tracking
- ✅ Excel/CSV Import
- ✅ Excel/PDF Export
- ✅ Audit Logging
- ✅ Dark Mode UI
- ✅ Role-Based Access Control

## 📝 License

© 2026 Madison 88. All rights reserved.
