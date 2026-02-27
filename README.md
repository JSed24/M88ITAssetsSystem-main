# Madison 88 IT Equipment Inventory Management System (M88 ITEIMS)

A comprehensive IT asset management system built for Madison 88 to track hardware, software, employee assignments, maintenance schedules, and generate detailed reports. Supports multi-region operations across the Philippines, Indonesia, China, and the United States with role-based access control.

## 🚀 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6 Modules)
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4
- **Database:** Supabase (PostgreSQL)
- **Charts:** Chart.js
- **Export:** SheetJS (XLSX), jsPDF + jsPDF-AutoTable
- **Deployment:** Netlify

## 📁 Project Structure

```
M88ITAssetsSystem/
├── index.html                     # Login page (entry point)
├── .env                           # Environment variables (not in git)
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies & scripts
├── vite.config.js                 # Vite configuration
│
├── public/                        # Static assets (served at /)
│   └── images/                    # Images & branding
│       ├── logo.png
│       ├── favicon.png
│       ├── bg-pattern.png
│       └── Scenic.png
│
├── src/                           # Source code
│   ├── pages/                     # Application pages (12 pages)
│   │   ├── dashboard.html
│   │   ├── assets.html
│   │   ├── employees.html
│   │   ├── assignments.html
│   │   ├── maintenance.html
│   │   ├── software-licenses.html
│   │   ├── lost-assets.html
│   │   ├── audit-logs.html
│   │   ├── reports.html
│   │   ├── settings.html
│   │   ├── user-maintenance.html
│   │   └── set-password.html
│   │
│   ├── styles/
│   │   └── styles.css             # Main stylesheet (Tailwind + custom)
│   │
│   └── scripts/                   # JavaScript modules (19 files)
│       ├── config.js              # Supabase config & app settings
│       ├── auth.js                # Authentication & session management
│       ├── audit.js               # Audit logging
│       ├── utils.js               # Utility functions & helpers
│       ├── components.js          # Reusable UI components
│       ├── notifications.js       # Dashboard alerts & notifications
│       ├── app.js                 # Main app initialization
│       ├── dashboard.js           # Dashboard logic & charts
│       ├── assets.js              # Asset CRUD operations
│       ├── employees.js           # Employee management
│       ├── assignments.js         # Asset assignment tracking
│       ├── maintenance.js         # Maintenance record management
│       ├── licenses.js            # Software license management
│       ├── reports.js             # Report generation
│       ├── export.js              # Excel/PDF export utilities
│       ├── import.js              # CSV/Excel import utilities
│       ├── vendor-chart.js        # Chart.js vendor bundle
│       ├── vendor-pdf.js          # jsPDF vendor bundle
│       └── vendor-xlsx.js         # SheetJS vendor bundle
│
├── database/                      # Database migrations (33 files)
│   └── migrations/
│       └── 002-034_*.sql
│
├── docs/                          # Documentation
├── sample-data/                   # CSV templates & sample data
└── tests/                         # Test files
```

## ⚙️ Setup Instructions

### Prerequisites

- **Node.js** v18 or higher
- **npm** (comes with Node.js)
- **Supabase Account** (free tier available at [supabase.com](https://supabase.com))

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **🔒 Security Note:** Never commit your `.env` file to version control. It's already listed in `.gitignore`.

**Where to find your Supabase credentials:**
1. Go to your Supabase project dashboard
2. Navigate to **Settings → API**
3. Copy the **Project URL** and **anon/public key**

### 3. Database Setup

Run the migration scripts in your Supabase SQL Editor **in order**:

1. Go to **Supabase Dashboard → SQL Editor**
2. Run each file from `database/migrations/` sequentially:
   - `002_add_audit_columns.sql`
   - `003_add_created_by_to_employees.sql`
   - `004_add_import_permission.sql`
   - ... (continue in numerical order through all 33 migrations)
   - `034_add_temporary_replacements.sql`

> **Note:** Migration files are numbered 002–034. Run them in ascending order. Some migrations depend on earlier ones.

### 4. Create First Admin User

**In Supabase Dashboard:**
1. Navigate to **Authentication → Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter email and password
4. After creating, go to **SQL Editor** and run:

```sql
INSERT INTO user_profiles (id, email, full_name, role)
VALUES (
    'user-uuid-from-auth-users',
    'admin@madison88.com',
    'System Administrator',
    'admin'
);
```

### 5. Run Development Server

```bash
npm run dev
```

The application will open at **http://localhost:3000**

---

## 🛠️ Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized files for production |
| `npm run preview` | Preview production build locally |

### When to use each command:

- **`npm run dev`** - Your daily development workflow. Auto-refreshes on file changes, loads `.env` variables, shows helpful error messages.
- **`npm run build`** - Before deploying. Creates optimized, minified files in the `dist/` folder.
- **`npm run preview`** - After building. Test the production build locally before deployment.

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized, minified files ready for deployment. Source maps are disabled and console logs are stripped for security.

### Deploy to Netlify

1. Push your code to GitHub
2. In Netlify, click **"Add new site"** → **"Import an existing project"**
3. Connect your repository
4. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Environment variables:** Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Netlify's environment settings
6. Click **"Deploy site"**

> **Important:** Since this is a multi-page app (not SPA), Netlify will serve each HTML page directly. All 13 HTML pages (root `index.html` + 12 pages in `src/pages/`) are configured as Vite build inputs.

---

## 🔒 Security Best Practices

- ✅ Always use `.env` for credentials (never hardcode in source files)
- ✅ Enable **Row Level Security (RLS)** on all Supabase tables
- ✅ Set up proper authentication policies in Supabase
- ✅ Regularly review audit logs for suspicious activity
- ✅ Use principle of least privilege for user roles
- ❌ Never commit `.env` file to version control
- ❌ Never share your `SUPABASE_SERVICE_KEY` (only use anon key in frontend)

---

## 👥 User Roles & Permissions

| Role | Dashboard | Assets | Employees | Assignments | Maintenance | Lost Assets | Software Licenses | Reports | Audit Logs | Settings |
|------|-----------|--------|-----------|-------------|-------------|-------------|-------------------|---------|------------|----------|
| **Executive** | ✅ All regions | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ All regions | ✅ All | ✅ Full |
| **Admin** | ✅ Own region | ✅ Own region | ✅ Own region | ✅ Own region | ✅ Own region | ✅ Own region | ✅ Own region | ✅ Own region | ✅ All (except Executive) | ✅ Users & Permissions |
| **IT Staff** | ✅ Own region | ✅ Own region | ✅ Own region | ✅ Own region | ✅ Own region | ✅ Own region | ✅ Own region | ⚙️ If permitted | ⚙️ If permitted | ❌ |
| **Viewer** | ✅ Own region | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Role Capabilities:**
- **Executive:** Global overview across all regions, full reports and audit access, user management and system settings
- **Admin:** Full management within their assigned region, can manage IT Staff and Viewer users in their region
- **IT Staff:** Day-to-day asset management within their assigned region (Reports and Audit Logs access controlled by Admin)
- **Viewer:** Read-only dashboard access for their assigned region

### 🌍 Supported Regions

| Code | Region |
|------|--------|
| PH | Madison88 IT Assets in the Philippines |
| ID | Madison88 IT Assets in Indonesia |
| CN | Madison88 IT Assets in China |
| US | Madison88 IT Assets in United States |

---

## 📊 Features

### Core Functionality
- ✅ Asset Registration & Management
- ✅ Employee Management
- ✅ Asset Assignment Tracking (Table View & By Employee View)
- ✅ Maintenance & Repair Logs (with automatic status management)
- ✅ Software License Management
- ✅ Lost Asset Tracking
- ✅ Temporary Asset Replacements
- ✅ Comprehensive Audit Logging

### Multi-Region Support
- ✅ Region-based data isolation (Philippines, Indonesia, China, United States)
- ✅ Executive global overview across all regions
- ✅ Region-scoped admin and staff access
- ✅ Per-region currency formatting

### Analytics & Reporting
- ✅ Interactive Dashboard with Charts
- ✅ Asset Distribution Analytics
- ✅ Warranty Expiration Alerts
- ✅ Refresh Cycle Tracking
- ✅ Custom Report Generation (PDF & Excel)

### User & Access Management
- ✅ Four-tier Role-Based Access Control (Executive, Admin, IT Staff, Viewer)
- ✅ Configurable IT Staff Permissions
- ✅ Password Reset via Email Link
- ✅ User Profile Management

### Data Management
- ✅ Bulk Import (CSV/Excel)
- ✅ Export to Excel/CSV/PDF
- ✅ Sample Data Templates
- ✅ Asset Category Management (with active/inactive state)
- ✅ Assignment Rules (single or multiple assignments per category)

### User Experience
- ✅ Modern Dark Mode UI
- ✅ Real-time Notifications
- ✅ Responsive Design

---

## 🐛 Troubleshooting

### Environment Variables Not Loading

```bash
# Ensure .env file exists in project root
# Variables must start with VITE_ prefix
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

# Restart the dev server
npm run dev
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Database Connection Issues

- Verify Supabase credentials in `.env`
- Check Supabase project status (not paused)
- Ensure Row Level Security policies are configured
- Check browser console for specific errors

### Login Issues

- Verify user exists in Supabase Authentication
- Check that user_profiles record exists
- Ensure RLS policies allow user access
- Clear browser cache and cookies

---

## 📚 Additional Documentation

See the `docs/` folder for detailed guides:
- **ASSIGNMENT_VIEWS.md** - Asset assignment table & grouped views
- **AUDIT_LOGS_FIX.md** - Audit system setup & troubleshooting
- **FILE_STRUCTURE.md** - Complete file organization reference
- **IMAGES.md** - Image asset specifications
- **MAINTENANCE_WORKFLOW.md** - Maintenance process & status management
- **REPORTS_PERMISSION.md** - Report access controls for IT Staff
- **RESTRUCTURING_GUIDE.md** - Codebase migration history

---

## 📝 License

© 2026 Madison 88 Business Solutions Asia Inc. All rights reserved.

---

## 💡 Support

For questions or issues:
- Check the documentation in the `docs/` folder
- Review troubleshooting section above
- Contact your system administrator

---

**Built with ❤️ by the M88 IT Team**
