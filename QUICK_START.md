# 🚀 Quick Start Guide

**For:** Madison 88 IT Equipment Inventory Management System (M88 ITEIMS)
**Updated:** February 2026
**Status:** ✅ Ready for Deployment

---

## 🎯 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the project root (copy from `.env.example`):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Get these from **Supabase Dashboard → Settings → API**

### 3. Start Development Server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

### 4. Login & Test

Use your Supabase auth credentials to log in. All functionality is ready.

---

## 📂 Where Is Everything?

| Looking for... | Find it here... |
|---------------|----------------|
| **Login page** | `index.html` (root) |
| **Dashboard** | `src/pages/dashboard.html` |
| **Application pages** | `src/pages/*.html` (12 pages) |
| **JavaScript modules** | `src/scripts/*.js` (19 files) |
| **Styles** | `src/styles/styles.css` |
| **Images/Logo** | `public/images/` |
| **Database SQL** | `database/migrations/` (33 migrations) |
| **Documentation** | `docs/` |
| **App configuration** | `src/scripts/config.js` |
| **Environment variables** | `.env` |
| **Build config** | `vite.config.js` |

---

## 📋 Application Pages

Each HTML file in `src/pages/` represents a feature module:

| Page | Purpose |
|------|---------|
| `dashboard.html` | Dashboard with stats & charts |
| `assets.html` | Asset management (CRUD) |
| `employees.html` | Employee management |
| `assignments.html` | Asset assignment tracking |
| `maintenance.html` | Maintenance & repair logs |
| `software-licenses.html` | Software license management |
| `lost-assets.html` | Lost asset tracking |
| `audit-logs.html` | System audit logs |
| `reports.html` | Reports & data export |
| `settings.html` | System settings & configuration |
| `user-maintenance.html` | User account management |
| `set-password.html` | Password set/reset flow |

---

## 👥 User Roles

| Role | Access |
|------|--------|
| **Executive** | Dashboard (all regions), Reports, Audit Logs, Settings |
| **Admin** | Full access within their assigned region |
| **IT Staff** | Day-to-day management within their region (some features controlled by Admin) |
| **Viewer** | Dashboard read-only for their region |

### 🌍 Regions

- Philippines (PH)
- Indonesia (ID)
- China (CN)
- United States (US)

---

## 🛠️ Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with hot reload (http://localhost:3000) |
| `npm run build` | Build optimized files for production in `dist/` |
| `npm run preview` | Preview production build locally |

---

## 🚀 Deploy to Netlify

### Option 1: Git-based Deploy

1. Push code to GitHub
2. In Netlify → **Add new site** → **Import an existing project**
3. Connect your repository
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deploy

### Option 2: Manual Deploy

```bash
npm run build
```

Then drag and drop the `dist/` folder to Netlify.

> **Important:** Always set the environment variables in Netlify's dashboard under **Site settings → Environment variables** before deploying.

---

## ✅ Pre-Deployment Checklist

- [ ] `.env` has correct Supabase credentials
- [ ] `npm run build` completes without errors
- [ ] All 33 database migrations have been run in Supabase
- [ ] First admin user created in Supabase Auth + `user_profiles` table
- [ ] Login flow works
- [ ] Dashboard loads with charts
- [ ] All navigation links work
- [ ] Images display correctly (logo, favicon)
- [ ] Styles apply correctly (dark theme)
- [ ] Asset CRUD operations work
- [ ] Reports generate successfully (PDF & Excel)
- [ ] Audit logs are recording
- [ ] Role-based access works for all 4 roles
- [ ] Region filtering works correctly
- [ ] Import/Export functionality works
- [ ] Logout redirects to login page

---

## 🔧 Configuration Reference

### Environment Variables (`.env`)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### App Settings (`src/scripts/config.js`)
- Application name, version, pagination defaults
- Asset status definitions
- Maintenance status definitions
- User role hierarchy (Executive > Admin > IT Staff > Viewer)
- Region configuration (PH, ID, CN, US)
- Notification types

---

## 🆘 Troubleshooting

### "Missing Supabase credentials" error
Create a `.env` file with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Restart the dev server.

### Build fails
```bash
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
npm run build
```

### Images not loading
Images are served from `public/images/` at the `/images/` path. Check that files exist in `public/images/`.

### Scripts not working
Check browser console (F12) for errors. Ensure `.env` variables are set correctly.

### Login issues
1. Verify user exists in Supabase Authentication
2. Check that a `user_profiles` record exists for the user
3. Ensure RLS policies are configured
4. Clear browser cache

---

## 📚 Additional Documentation

| Document | Purpose |
|----------|---------|
| `README.md` | Full project overview & setup |
| `docs/FILE_STRUCTURE.md` | Complete file organization reference |
| `docs/ASSIGNMENT_VIEWS.md` | Assignment views documentation |
| `docs/AUDIT_LOGS_FIX.md` | Audit system setup |
| `docs/MAINTENANCE_WORKFLOW.md` | Maintenance process guide |
| `docs/REPORTS_PERMISSION.md` | Report access controls |

---

**Built with ❤️ by the M88 IT Team**
