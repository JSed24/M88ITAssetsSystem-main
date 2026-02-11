# Madison 88 IT Equipment Inventory Management System (M88 ITEIMS)

A comprehensive IT asset management system built for Madison 88 to track hardware, software, employee assignments, maintenance schedules, and generate detailed reports.

## 🚀 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6 Modules)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Charts:** Chart.js
- **Export:** SheetJS (XLSX), jsPDF
- **Deployment:** Netlify / Vercel

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
├── public/                        # Static assets
│   └── images/                    # Images & branding
│       ├── logo.png
│       ├── favicon.png
│       └── bg-pattern.png
│
├── src/                           # Source code
│   ├── pages/                     # Application pages
│   │   ├── dashboard.html
│   │   ├── assets.html
│   │   ├── employees.html
│   │   ├── assignments.html
│   │   ├── maintenance.html
│   │   ├── software-licenses.html
│   │   ├── lost-assets.html
│   │   ├── audit-logs.html
│   │   ├── reports.html
│   │   └── settings.html
│   │
│   ├── styles/
│   │   └── styles.css
│   │
│   └── scripts/                   # JavaScript modules
│       ├── config.js              # App configuration
│       ├── auth.js
│       ├── audit.js
│       ├── utils.js
│       ├── components.js
│       ├── notifications.js
│       ├── dashboard.js
│       ├── assets.js
│       ├── employees.js
│       ├── assignments.js
│       ├── maintenance.js
│       ├── licenses.js
│       ├── reports.js
│       ├── export.js
│       └── import.js
│
├── database/                      # Database migrations
│   └── migrations/
│       └── *.sql
│
├── docs/                          # Documentation
├── sample-data/                   # CSV templates
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
   - ... (continue in order)
   - `014_update_assignments_view.sql`

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

This creates a `dist/` folder with optimized files ready for deployment.

### Deploy to Netlify

1. Push your code to GitHub
2. In Netlify, click **"Add new site"** → **"Import an existing project"**
3. Connect your repository
4. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Environment variables:** Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
6. Click **"Deploy site"**

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in project settings
4. Deploy automatically

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

| Role | View | Add/Edit | Delete | Import/Export | Admin Settings |
|------|------|----------|--------|---------------|----------------|
| **Admin** | ✅ All | ✅ All | ✅ All | ✅ | ✅ |
| **IT Staff** | ✅ All | ✅ Most | ✅ Most | ✅ | ❌ |
| **Viewer** | ✅ Limited | ❌ | ❌ | ✅ Export only | ❌ |

**Role Capabilities:**
- **Admin:** Full system access, user management, system settings
- **IT Staff:** Manage assets, employees, assignments, maintenance (no user management)
- **Viewer:** Read-only access to dashboards and reports

---

## 📊 Features

### Core Functionality
- ✅ Asset Registration & Management
- ✅ Employee Management
- ✅ Asset Assignment Tracking
- ✅ Maintenance & Repair Logs
- ✅ Software License Management
- ✅ Lost Asset Tracking
- ✅ Comprehensive Audit Logging

### Analytics & Reporting
- ✅ Interactive Dashboard with Charts
- ✅ Asset Distribution Analytics
- ✅ Warranty Expiration Alerts
- ✅ Refresh Cycle Tracking
- ✅ Custom Report Generation

### Data Management
- ✅ Bulk Import (CSV/Excel)
- ✅ Export to Excel/CSV/PDF
- ✅ Sample Data Templates

### User Experience
- ✅ Modern Dark Mode UI
- ✅ Role-Based Access Control
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
- **ASSIGNMENT_VIEWS.md** - Asset assignment workflows
- **MAINTENANCE_WORKFLOW.md** - Maintenance process guide
- **AUDIT_LOGS_FIX.md** - Audit system details
- **REPORTS_PERMISSION.md** - Report access controls

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

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
