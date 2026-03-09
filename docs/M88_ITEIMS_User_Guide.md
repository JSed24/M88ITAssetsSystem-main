# Madison 88 IT Equipment Inventory Management System - User Guide Manual

**Organization:** Madison 88 Business Solutions Asia Inc.
**System Name:** M88 IT Equipment Inventory Management System (M88 ITEIMS)
**Document Type:** User Guide Manual
**Version:** 1.0
**Effective Date:** March 2026
**Prepared By:** IT Department - Madison 88 Business Solutions Asia Inc.

---

[SCREENSHOT: Cover Page - System Login Screen]

---

## Document Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | March 2026 | IT Department | Initial release |

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Getting Started](#2-getting-started)
   - 2.1 Logging In
   - 2.2 Setting Your Password (New Users)
   - 2.3 Resetting Your Password
   - 2.4 Logging Out
3. [Navigation and Layout](#3-navigation-and-layout)
   - 3.1 Sidebar Navigation
   - 3.2 Topbar
   - 3.3 Mobile Behavior
4. [Executive Role Guide](#4-executive-role-guide)
   - 4.1 Dashboard
   - 4.2 Export Reports
   - 4.3 Audit Logs
   - 4.4 Settings
   - 4.5 User Maintenance
5. [Executive-Admin Role Guide](#5-executive-admin-role-guide)
   - 5.1 Role Overview
   - 5.2 Dashboard
   - 5.3 IT Equipments Inventory
   - 5.4 Software Licenses
   - 5.5 Employees
   - 5.6 Assignments
   - 5.7 Asset Maintenance
   - 5.8 Lost Assets
   - 5.9 Export Reports
   - 5.10 Audit Logs
   - 5.11 Settings
   - 5.12 User Maintenance
6. [Admin Role Guide](#6-admin-role-guide)
   - 6.1 Role Overview
   - 6.2 Dashboard
   - 6.3 IT Equipments Inventory
   - 6.4 Software Licenses
   - 6.5 Employees
   - 6.6 Assignments
   - 6.7 Asset Maintenance
   - 6.8 Lost Assets
   - 6.9 Export Reports
   - 6.10 Audit Logs
   - 6.11 Settings
   - 6.12 User Maintenance
7. [IT Staff Role Guide](#7-it-staff-role-guide)
   - 7.1 Role Overview
   - 7.2 Dashboard
   - 7.3 IT Equipments Inventory
   - 7.4 Software Licenses
   - 7.5 Employees
   - 7.6 Assignments
   - 7.7 Asset Maintenance
   - 7.8 Lost Assets
   - 7.9 Export Reports (If Enabled)
   - 7.10 Audit Logs (If Enabled)
8. [Notifications](#8-notifications)
9. [Frequently Asked Questions and Troubleshooting](#9-frequently-asked-questions-and-troubleshooting)
- Appendix A - Field Reference Tables
- Appendix B - Role Permissions Matrix
- Appendix C - Report Column Reference

---

## Glossary of Terms

| Term | Definition |
|------|------------|
| **Asset** | Any IT hardware item tracked in the system (e.g., laptop, monitor, keyboard) |
| **Asset Tag** | A unique auto-generated identifier assigned to each hardware asset |
| **Assignment** | The linking of an asset or software license to an employee |
| **Category** | A classification group for hardware assets (e.g., Laptop, Desktop) or software products |
| **Region** | One of four geographic operating zones: Philippines, Indonesia, China, United States |
| **Role** | A user's access level: Executive, Admin, IT Staff, or Viewer |
| **License** | A software entitlement tracked under a software product category |
| **Maintenance Record** | A log of a repair, preventive check, or upgrade performed on an asset |
| **Lost Asset** | A record tracking an asset reported as lost, under investigation, found, or permanently lost |
| **Audit Log** | A system-generated record of every action performed by users |
| **Import** | The process of bulk-loading data via a CSV or Excel file |
| **Decommission** | The final status of an asset that is no longer in service |
| **Refresh Date** | The recommended replacement date of an asset, based on a 5-year lifecycle |
| **Perpetual License** | A software license with no expiry date |
| **RPC** | Remote Procedure Call - a backend database function used by the system |
| **Exec+Admin** | A user assigned both the Executive and Admin roles simultaneously |

---

# 1. System Overview

## 1.1 Purpose

The **Madison 88 IT Equipment Inventory Management System (M88 ITEIMS)** is a web-based platform developed exclusively for Madison 88 Business Solutions Asia Inc. It centralizes the tracking, assignment, maintenance, and reporting of all IT hardware assets and software licenses across the company's global operations.

## 1.2 Key Capabilities

- Hardware asset lifecycle management from procurement through decommissioning
- Software license tracking grouped by product, with individual employee-level assignments
- Employee directory with configurable required asset category tracking
- Multi-region support across four operating territories
- Role-based access control with configurable IT Staff permissions
- Full audit trail of every user action in the system
- Export of reports to Excel (.xlsx) and PDF formats

## 1.3 Supported Regions

| Region | Code | Currency |
|--------|------|----------|
| Madison88 IT Assets in the Philippines | PH | PHP |
| Madison88 IT Assets in Indonesia | ID | IDR |
| Madison88 IT Assets in China | CN | CNY |
| Madison88 IT Assets in United States | US | USD |

## 1.4 Role Hierarchy

The system supports four roles in a hierarchy. A user may also carry a combination of roles (e.g., Executive + Admin).

| Level | Role | Description |
|-------|------|-------------|
| 4 | **Executive** | Cross-region oversight and reporting; no direct data entry |
| 3 | **Admin** | Full operational access within one assigned region |
| 2 | **IT Staff** | Day-to-day asset and employee management within one region |
| 1 | **Viewer** | Read-only access to the Dashboard only |

## 1.5 System URL

The system is accessed through a web browser at the URL provided by the IT Department. No software installation is required. A stable internet connection is necessary for all operations.

---

# 2. Getting Started

## 2.1 Logging In

The Login page is the entry point to the system. It is displayed whenever you are not yet authenticated.

[SCREENSHOT: Login Page - Full View]

### Steps to Log In

**Step 1.** Open your web browser and navigate to the system URL provided by your IT Department.

**Step 2.** The Login page will appear with two panels. The right panel contains the login form.

**Step 3.** Enter your **Email Address** in the Email Address field. This is the email address registered for your account by your system administrator.

**Step 4.** Enter your **Password** in the Password field. Your password is case-sensitive and must be at least 8 characters long.

> **Tip:** Click the eye icon on the right side of the Password field to show or hide your password characters.

[SCREENSHOT: Password Show/Hide Toggle]

**Step 5.** Optionally, check the **Remember me** checkbox if you wish the browser to retain your session information.

**Step 6.** Read and accept the **Terms and Conditions** by checking the Terms and Conditions checkbox. This checkbox is required before you can submit the form.

> **Note:** To read the full Terms and Conditions, click the blue "Terms and Conditions" link text. A scrollable modal window will open displaying all eight sections of the agreement.

[SCREENSHOT: Terms and Conditions Modal]

**Step 7.** Inside the Terms and Conditions modal, you may:
- Scroll through the full text of the agreement.
- Click **Accept Terms** to automatically check the checkbox and close the modal.
- Click **Close** to close the modal without accepting (the checkbox will remain unchecked).

**Step 8.** Once the Terms and Conditions checkbox is checked, click the **Sign In** button.

**Step 9.** The system will verify your credentials. While processing, the button will display "Signing in..." with a loading spinner.

**Step 10.** Upon successful authentication, you will be automatically redirected to the Dashboard.

[SCREENSHOT: Dashboard After Successful Login]

### Login Error Messages

| Error Displayed | Meaning and Action |
|---|---|
| "Invalid email or password. Please try again." | Your email or password is incorrect. Check for typos and try again. |
| "Please verify your email address before logging in." | Your account email has not yet been confirmed. Contact your administrator. |
| "Please accept the Terms and Conditions to continue." | The Terms and Conditions checkbox is not checked. Check it before clicking Sign In. |
| Other message | A system or network issue occurred. Note the message and contact the IT Department. |

---

## 2.2 Setting Your Password (New Users)

When a system administrator creates your account and sends you an invitation, you will receive an email containing a password setup link. This is the only way to set your initial password.

[SCREENSHOT: Password Invitation Email (Sample)]

> **Important:** The password setup link is valid for **3 minutes** from the time the administrator sends the invitation. If the link has expired, ask your administrator to resend the invitation.

### Steps to Set Your Password

**Step 1.** Open the invitation email you received from the system.

**Step 2.** Click the password setup link in the email. Your browser will open and navigate to the Set Password page.

**Step 3.** The Set Password page will display the password form if the link is still valid.

[SCREENSHOT: Set Password Page - Password Form]

**Step 4.** Enter your desired password in the **New Password** field. Your password must meet all of the following requirements:

- At least 8 characters long
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)
- At least 1 special character (such as !, @, #, $, %, ^, &, *)

**Step 5.** As you type, the **Password Strength indicator** will update in real time showing a bar and label:

| Bar Level | Label | Meaning |
|-----------|-------|---------|
| 1 bar | Very Weak | Password does not meet requirements |
| 2 bars | Weak | Password partially meets requirements |
| 3 bars | Fair | Password meets some requirements |
| 4 bars | Good | Password almost meets all requirements |
| 5 bars | Strong | Password meets all requirements |

[SCREENSHOT: Set Password Page - Strength Indicator at "Strong"]

> **Tip:** Click the eye icon next to each password field to reveal the characters you have typed.

**Step 6.** Enter the same password again in the **Confirm Password** field. If the two passwords do not match, a red error message will appear below the field.

**Step 7.** Once all five password requirements are met and both fields match, the **Set Password** button will become active.

**Step 8.** Click **Set Password**.

**Step 9.** A success message will appear: *"Password set successfully! Redirecting to login..."*

**Step 10.** After 2.5 seconds, you will be automatically redirected to the Login page. You may now log in using your email and the password you just created.

### Link Status Messages

If the password link is no longer usable, the Set Password page will display one of the following messages:

| Message Displayed | Meaning | Action |
|---|---|---|
| "This password link has already been used." | You have already set your password with this link. | Click "Go to Login" and log in normally. |
| "This password link has expired." | More than 3 minutes have passed since the link was sent. | Contact your administrator to resend the invitation. |
| "Link expired or invalid." | The link is malformed or the session is missing. | Contact your administrator. |

---

## 2.3 Resetting Your Password

If your administrator sends you a password reset email, the process is identical to Section 2.2 above. The password reset link also expires after 3 minutes.

**Step 1.** Open the password reset email you received.

**Step 2.** Click the reset link. You will be taken to the Set Password page.

**Step 3.** Follow Steps 4 through 10 in Section 2.2 to create and confirm your new password.

> **Note:** After clicking the reset link and setting a new password, your previous password will no longer work.

---

## 2.4 Logging Out

**Step 1.** Locate the sidebar on the left side of any page.

**Step 2.** At the bottom of the sidebar, find your name, role badge, and initials avatar.

**Step 3.** Click the **Logout** button (shown as an icon or "Logout" text next to your profile area).

[SCREENSHOT: Sidebar Footer - User Profile and Logout Button]

**Step 4.** You will be immediately signed out and redirected to the Login page.

> **Note:** A LOGOUT event is automatically written to the system's Audit Log every time you log out.

---

# 3. Navigation and Layout

## 3.1 Sidebar Navigation

All authenticated pages share the same two-panel layout: a collapsible **Sidebar** on the left and the **Main Content Area** on the right.

[SCREENSHOT: Full Page Layout - Sidebar and Main Content]

The sidebar is organized into sections and links. The links visible to you depend on your role.

### Sidebar Sections and Links

| Section | Link | Roles That See It |
|---------|------|-------------------|
| **Main** | Dashboard | All roles |
| **Asset Management** | IT Equipments Inventory | Admin, IT Staff, Exec+Admin |
| | Software Licenses | Admin, IT Staff, Exec+Admin |
| | Employees | Admin, IT Staff, Exec+Admin |
| | Assignments | Admin, IT Staff, Exec+Admin |
| **Asset Tracking** | Asset Maintenance | Admin, IT Staff, Exec+Admin |
| | Lost Assets | Admin, IT Staff, Exec+Admin |
| **Reports** | Export Reports | Executive, Admin, Exec+Admin; IT Staff (if enabled) |
| | Audit Logs | Executive, Admin, Exec+Admin; IT Staff (if enabled) |
| **Administration** | Settings | Executive, Admin, Exec+Admin |
| | User Maintenance | Executive, Admin, Exec+Admin |

> **Note for IT Staff:** If your administrator has disabled the Reports or Audit Logs permissions, those links will not appear in your sidebar.

[SCREENSHOT: Sidebar - Admin Role View (All Links Visible)]

[SCREENSHOT: Sidebar - IT Staff Role View (Reduced Links)]

### Sidebar Footer

At the bottom of the sidebar:
- Your **initials avatar** (a colored circle with your name initials)
- Your **full name**
- Your **role badge** (color-coded: Gold for Executive, Purple for Admin, Blue for IT Staff)
- A **Logout button**

## 3.2 Topbar

The topbar is located at the top of the main content area.

| Element | Location | Description |
|---------|----------|-------------|
| Hamburger Menu icon | Left (mobile only) | Opens/closes the sidebar overlay on small screens |
| Page Title | Left | The name of the current page |
| Region Selector | Right | **Executive and Exec+Admin only** - dropdown to switch regions; not shown on other pages |
| Region Label | Right | **Admin and IT Staff** - read-only badge showing assigned region |
| Month Selector | Right | **Dashboard page only** - filter stats by month |
| Notification Bell | Right | Any unread notifications show a red badge count |
| User Menu | Right | Displays your name; click to access account options |

[SCREENSHOT: Topbar - Executive View with Region Selector and Notification Bell]

[SCREENSHOT: Topbar - Admin View with Region Label]

## 3.3 Mobile Behavior

On smaller screens (mobile or tablet):
- The sidebar is hidden by default.
- Tap the hamburger menu icon in the topbar to open the sidebar as an overlay.
- A semi-transparent backdrop appears behind the open sidebar.
- Tap anywhere on the backdrop to close the sidebar without navigating.

[SCREENSHOT: Mobile View - Sidebar Overlay Open]

---

# 4. Executive Role Guide

The Executive role provides cross-region, read-only oversight of the entire IT asset estate. Executives can view all data across all regions, generate reports, review audit logs, manage system settings, and administer user accounts. Executives do not directly add, edit, or delete asset or employee records.

> **Note:** If you are an Executive AND Admin (Exec+Admin combined role), please refer to **Chapter 5** instead, as your access is broader.

## 4.1 Dashboard

The Dashboard is the first page you see after logging in. It provides a real-time snapshot of the IT estate.

[SCREENSHOT: Dashboard - Executive View, Hardware Tab, All Regions]

### Selecting a Region

By default, the Dashboard shows data across **all regions**. As an Executive, you can focus on a specific region using the Region Selector in the topbar.

**Step 1.** Locate the **Region Selector** dropdown in the topbar (labeled with the current region or "All Regions").

**Step 2.** Click the dropdown and select the desired region:
- All Regions
- Philippines
- Indonesia
- China
- United States

**Step 3.** The Dashboard will instantly reload all stats, charts, and panels for the selected region.

[SCREENSHOT: Region Selector Dropdown - Open with All Options]

### Selecting a Month

**Step 1.** Locate the **Month Selector** dropdown in the topbar (next to the Region Selector).

**Step 2.** Click the dropdown and select the desired month and year.

**Step 3.** The Dashboard stats will filter to reflect the selected month's data.

### Hardware View

The Hardware View is the default Dashboard view. It displays the following elements:

#### Stats Cards

Five summary cards are displayed at the top of the Dashboard:

| Card | Color | What It Shows |
|------|-------|---------------|
| Available Assets | Green | Count of assets with status "Available" |
| Assigned | Blue | Count of assets currently assigned to employees |
| Under Repair | Yellow | Count of assets currently in maintenance |
| Issues (Lost + Damaged) | Red | Count of assets with status "Lost" or "Damaged" |
| Decommissioned | Gray | Count of retired assets |

[SCREENSHOT: Dashboard - Five Hardware Stats Cards]

#### Charts

- **Assets by Status** - A doughnut chart showing the proportion of assets in each status.
- **Assets by Category** - A bar chart showing the count of assets in each hardware category.

[SCREENSHOT: Dashboard - Assets by Status Doughnut Chart]

[SCREENSHOT: Dashboard - Assets by Category Bar Chart]

#### Asset Activity Trends

A 12-month line chart showing three trend lines over time:
- Asset acquisitions
- Reported losses
- Repair completions

[SCREENSHOT: Dashboard - 12-Month Asset Activity Trends Chart]

#### Alerts and Reminders

A panel listing automated system alerts:
- Warranty expiry warnings (triggered when a warranty is within 90 days of expiry)
- Upcoming asset refresh dates (based on 5-year lifecycle)

[SCREENSHOT: Dashboard - Alerts and Reminders Panel]

#### Financial Overview (Executive Only)

A carousel panel at the bottom of the Dashboard, visible to Executives only. Use the left and right arrow buttons to cycle through financial metrics related to asset costs.

[SCREENSHOT: Dashboard - Financial Overview Carousel (Executive Only)]

#### Asset Health and Status Matrix

A heatmap grid below the charts showing the distribution of asset statuses across all hardware categories. This gives a quick visual of which categories have the most issues.

[SCREENSHOT: Dashboard - Asset Health and Status Matrix]

### Software View

**Step 1.** Click the **Software** toggle button at the top of the Dashboard page header area to switch to the Software view.

[SCREENSHOT: Dashboard - Hardware/Software Toggle Buttons]

The Software View displays four summary cards:

| Card | What It Shows |
|------|---------------|
| Total Products | Count of distinct software product categories |
| Assigned | Total number of active software license assignments to employees |
| Expiring Soon | Count of licenses expiring within the next 30 days |
| Expired | Count of licenses that have already passed their expiry date |

[SCREENSHOT: Dashboard - Software View Stats Cards]

**Step 2.** To return to the Hardware view, click the **Hardware** toggle button.

---

## 4.2 Export Reports

The Export Reports page allows you to download 7 types of pre-formatted reports in both Excel and PDF formats.

[SCREENSHOT: Export Reports Page - Full View]

### Selecting a Region for Reports

**Step 1.** At the top of the Export Reports page, locate the **Region** dropdown.

**Step 2.** Select the desired region (or "All Regions" to include data from all territories).

**Step 3.** Your selection will apply to all report downloads made on this page.

[SCREENSHOT: Export Reports - Region Dropdown Selected]

### Available Reports

Seven report cards are displayed on this page. Each card has two buttons: **Excel** (green) and **PDF** (red).

#### Report 1: IT Equipment Inventory Master List
A complete list of all hardware assets including their status, assignment details, cost, warranty, and refresh date.

**Step 1.** Locate the **IT Equipment Inventory Master List** card.

**Step 2.** Click **Excel** to download the report as an .xlsx file, or click **PDF** to download as a PDF.

[SCREENSHOT: IT Equipment Inventory Master List Report Card with Excel and PDF Buttons]

#### Report 2: Assignment Report
Shows which assets are assigned to which employees, including assignment dates and the staff member who made the assignment.

**Step 1.** Locate the **Assignment Report** card.

**Step 2.** Click **Excel** or **PDF** to download.

#### Report 3: Warranty Report
Lists all assets with upcoming or expired warranty dates. Useful for planning renewals and replacements.

**Step 1.** Locate the **Warranty Report** card.

**Step 2.** Click **Excel** or **PDF** to download.

#### Report 4: Maintenance History
A full log of all repair, preventive maintenance, and upgrade records including cost and outcome.

**Step 1.** Locate the **Maintenance History** card.

**Step 2.** Click **Excel** or **PDF** to download.

#### Report 5: Employee Directory
A list of all employees in the selected region with their department, position, and status.

**Step 1.** Locate the **Employee Directory** card.

**Step 2.** Click **Excel** or **PDF** to download.

#### Report 6: Lost Assets Report
Lists all reported lost assets including investigation status, financial liability details, and recovery outcomes.

**Step 1.** Locate the **Lost Assets Report** card.

**Step 2.** Click **Excel** or **PDF** to download.

#### Report 7: Software Licenses
A list of all software licenses grouped by product. Note that license keys and credentials are included in the Excel version only; the PDF version omits them for security.

**Step 1.** Locate the **Software Licenses** card.

**Step 2.** Click **Excel** to download with license key data, or **PDF** to download without sensitive key data.

---

## 4.3 Audit Logs

The Audit Logs page records every action performed in the system, including logins, data changes, imports, and exports.

[SCREENSHOT: Audit Logs Page - Full View]

### Filtering Audit Logs

**Step 1.** Navigate to **Audit Logs** in the sidebar under the Reports section.

**Step 2.** Use the filter controls at the top of the page to narrow the results:

| Filter | How to Use |
|--------|-----------|
| **Date From** | Click and select the start date for the date range |
| **Date To** | Click and select the end date for the date range |
| **Category** | Select a log category from the dropdown (see category list below) |
| **User** | Select a specific user to see only their actions |
| **Search** | Type any keyword to search descriptions and actions |

[SCREENSHOT: Audit Logs - Filter Controls]

**Step 3.** The table will automatically update as you change filters (search applies after a short delay).

**Step 4.** To remove all active filters, click the **Clear Filters** button.

### Audit Log Categories

| Category | Badge Color | What It Covers |
|----------|-------------|----------------|
| Authentication | Blue | Logins, logouts, password changes |
| Asset Management | Green | Asset creates, edits, deletes |
| User Management | Yellow | User invitations, edits, role changes |
| Settings | Gray | Changes to system settings |
| Import/Export | Purple | All bulk data imports and report exports |
| Maintenance | Yellow | Maintenance record changes |
| Assignment | Blue | Asset and software assignment and returns |
| Lost Assets | Red | Lost asset report changes |
| Software Licenses | Pink | Software license changes |

### Reading the Audit Log Table

| Column | Description |
|--------|-------------|
| Timestamp | The exact date and time the action occurred |
| User | The email address of the user who performed the action |
| Category | Color-coded badge showing what area of the system was affected |
| Action | The action verb (CREATE, UPDATE, DELETE, LOGIN, EXPORT, etc.) |
| Description | A human-readable summary of what was done |
| Details | A View button to see full before-and-after details |

[SCREENSHOT: Audit Logs - Table with Sample Records]

### Viewing Log Details

**Step 1.** Locate the log entry you want to inspect.

**Step 2.** Click the **View** button in the Details column.

**Step 3.** A details panel will open showing:
- Timestamp
- User
- Action and Category
- Full description
- Table and record affected
- **Previous Values** - the data before the change (shown in formatted JSON)
- **New Values** - the data after the change (shown in formatted JSON)

[SCREENSHOT: Audit Log Details Modal - Showing Previous and New Values]

**Step 4.** Close the modal by clicking outside it or the close button.

### Exporting Audit Logs

**Step 1.** Apply any desired filters to narrow the log records.

**Step 2.** Click the **Export** button at the top right of the page.

**Step 3.** A CSV file named audit-logs-[date].csv will be downloaded to your computer. It contains: Date, Time, User, Category, Action, Description, Table Affected.

[SCREENSHOT: Audit Logs - Export Button Highlighted]

---

## 4.4 Settings

The Settings page lets Executives manage system-wide configurations. Executives have access to all four tabs.

[SCREENSHOT: Settings Page - All Four Tabs Visible]

### Tab 1: Permissions

This tab controls which additional capabilities IT Staff users have access to.

[SCREENSHOT: Settings - Permissions Tab]

**Step 1.** Navigate to **Settings** in the sidebar under Administration.

**Step 2.** Ensure the **Permissions** tab is active (it is selected by default).

**Step 3.** The three permission toggles are displayed:

| Toggle | Setting | Effect When Enabled |
|--------|---------|---------------------|
| IT Staff Reports Access | it_staff_can_access_reports | IT Staff can view and download reports |
| IT Staff Import Access | it_staff_can_import_data | IT Staff can import assets and employees from CSV/Excel |
| IT Staff Audit Logs Access | it_staff_can_access_audit_logs | IT Staff can view the Audit Logs page |

**Step 4.** Click the toggle switch next to any permission to enable (green/on) or disable (gray/off) it.

**Step 5.** Changes are saved automatically. A confirmation toast will appear briefly at the bottom of the screen.

> **Note:** Admin and Executive users always have full access regardless of these settings. Viewer users are never granted these capabilities regardless of the toggles.

### Tab 2: Assignment Rules

This tab controls how assets are assigned per category - whether a category allows only one active assignment at a time (Single) or multiple simultaneous assignments (Multiple).

[SCREENSHOT: Settings - Assignment Rules Tab]

**Step 1.** Click the **Assignment Rules** tab.

**Step 2.** A table is displayed listing all active hardware categories with their current assignment mode:

| Mode | Badge | Description |
|------|-------|-------------|
| Single Assignment Only | Blue | An asset in this category can only be assigned to one employee at a time |
| Multiple Assignment Allowed | Green | Assets in this category can be assigned to multiple employees simultaneously |

**Step 3.** To change a category's mode:
- If currently "Single Assignment Only", click the **Allow Multiple** button to switch it to Multiple.
- If currently "Multiple Assignment Allowed", click the **Set to Single** button to switch it back to Single.

**Step 4.** The change takes effect immediately.

[SCREENSHOT: Settings - Assignment Rules Table with Toggle Buttons]

### Tab 3: IT Hardware Categories

This tab manages the master list of hardware asset categories (e.g., Laptop, Desktop, Monitor, Printer).

[SCREENSHOT: Settings - IT Hardware Categories Tab]

#### Adding a New Category

**Step 1.** Click the **Assignment Rules** tab, then click **IT Hardware Categories**.

**Step 2.** Click the **Add Category** button at the top right of the table.

**Step 3.** A modal will open. Fill in the following fields:

| Field | Description | Limit |
|-------|-------------|-------|
| Name | The category name (required) | 25 characters |
| Description | Optional description | No limit |

**Step 4.** Click **Save**. The new category will appear in the table with an Active status.

[SCREENSHOT: Add Hardware Category Modal]

#### Editing a Category

**Step 1.** Locate the category row in the table.

**Step 2.** Click the **Edit** button in that row.

**Step 3.** The same modal opens pre-filled with the current values. Make your changes.

**Step 4.** Click **Save**.

#### Deactivating a Category

**Step 1.** Locate the category row.

**Step 2.** Click the **Deactivate** button.

> **Note:** If the category has active assets assigned to it, the system will block the deactivation and display how many assets exist in each status. You must resolve those assets first.

**Step 3.** Confirm the deactivation in the prompt. The category status will change to Inactive and it will no longer appear in dropdown menus across the system.

#### Reactivating a Category

**Step 1.** Locate the Inactive category row.

**Step 2.** Click the **Activate** button. The category will immediately return to Active status.

### Tab 4: IT Software Products

This tab manages the master list of software products (e.g., Microsoft Office, Adobe Acrobat). These products group the software licenses managed on the Software Licenses page.

[SCREENSHOT: Settings - IT Software Products Tab]

The steps for adding, editing, deactivating, and reactivating software products are identical to those for IT Hardware Categories in Tab 3 above. Note that deactivation is blocked if the product has active software licenses associated with it.

---

## 4.5 User Maintenance

The User Maintenance page is where user accounts are created, edited, and managed.

[SCREENSHOT: User Maintenance Page - Full View with User Table]

### Understanding the User Table

The table displays all users with a **role matrix** layout, showing which roles each user holds.

| Column | Description |
|--------|-------------|
| User | Full name and email address |
| Executive | Checkmark if the user has the Executive role |
| Admin | Checkmark if the user has the Admin role |
| IT Staff | Checkmark if the user has the IT Staff role |
| Viewer | Checkmark if the user has the Viewer role |
| Regions | Badge codes (PH, ID, CN, US) for each region assigned |
| Status | Green "Active" or Red "Inactive" badge |
| Actions | Edit button |

### Searching and Filtering Users

**Step 1.** Use the **Search** field to search by name or email address.

**Step 2.** Use the **Role filter** dropdown to show only users with a specific role.

**Step 3.** Use the **Region filter** dropdown to show only users assigned to a specific region.

[SCREENSHOT: User Maintenance - Search and Filter Controls]

### Inviting a New User

**Step 1.** Click the **Invite User** button at the top of the page.

**Step 2.** The Invite User modal will open. Fill in the required fields:

[SCREENSHOT: Invite User Modal - All Fields Visible]

| Field | Description | Required |
|-------|-------------|----------|
| Email Address | The new user's email address | Yes |
| Full Name | The new user's full name | Yes |
| Roles | Check one or more roles (see rules below) | Yes |
| Assigned Region | The region to assign for operational access | Conditional |

**Step 3.** Select the appropriate role(s). The following combination rules apply automatically:

| Role Selection | What Happens |
|----------------|--------------|
| Executive only | IT Staff and Viewer checkboxes are disabled; Region field is disabled (Executives access all regions) |
| Executive + Admin | IT Staff and Viewer are disabled; Region field is enabled (required for Admin operations) |
| Admin only | IT Staff and Viewer are disabled; Region field is required |
| IT Staff only | All other role checkboxes are disabled; Region field is required |
| Viewer only | All other role checkboxes are disabled; Region field is required |

**Step 4.** Select the **Assigned Region** from the dropdown (if applicable).

**Step 5.** Click **Send Invite**.

**Step 6.** The system will:
1. Create the user account in the authentication system.
2. Set up the user's profile, roles, and region.
3. Send an invitation email to the new user's email address.
4. The invitation link in the email expires after **3 minutes**.

**Step 7.** Inform the new user to check their email and set their password promptly.

> **Note:** If the email address already has an account, an error message will appear: *"An account with email [address] already exists."*

[SCREENSHOT: Invite User Modal - After Successful Invite, Success Message]

### Editing an Existing User

**Step 1.** Locate the user in the table.

**Step 2.** Click the **Edit** button in that user's row.

**Step 3.** The Edit User modal opens, showing the user's current name, email, roles, region, and status.

[SCREENSHOT: Edit User Modal - All Fields Visible]

**Step 4.** Make the desired changes:
- **Roles** - Check or uncheck roles (same combination rules as Invite apply).
- **Assigned Region** - Change the region using the dropdown.
- **Status** - Change between Active and Inactive.

**Step 5.** Click **Save Changes**. The user's roles and region are immediately updated.

### Sending a Password Reset to a User

Use this when a user cannot log in and needs a new password.

**Step 1.** Open the Edit User modal for the user.

**Step 2.** Scroll to the **Send Password Reset** button inside the modal.

**Step 3.** Click **Send Password Reset**.

**Step 4.** A confirmation prompt will appear. Confirm the action.

**Step 5.** The system sends a password reset email to the user. The link in that email is valid for **3 minutes**.

**Step 6.** Inform the user to check their email immediately and follow the Set Password steps from Section 2.3.

> **Note:** A success or error message will appear inline below the button confirming whether the email was sent.

[SCREENSHOT: Edit User Modal - Send Password Reset Button and Inline Result]

---

# 5. Executive-Admin Role Guide

## 5.1 Role Overview

The **Executive-Admin** (Exec+Admin) role is a special combination where a single user holds both the Executive and Admin roles simultaneously. This grants:

- **Cross-region visibility** - Like a pure Executive, you can view data from all regions on the Dashboard and select regions on the Reports page.
- **Operational access in one region** - Like a pure Admin, you can add, edit, and delete assets, employees, assignments, maintenance records, software licenses, and lost asset records within your assigned region.
- **Full access to Settings** (all four tabs) and **User Maintenance**.

> **Differences from pure Executive:** You can see and use all operational pages (Assets, Employees, Assignments, etc.).
> **Differences from pure Admin:** Your Dashboard shows the Region Selector (not a fixed region label), and you have access to all four Settings tabs.

## 5.2 Dashboard

Your Dashboard experience is identical to Section 4.1 (Executive Dashboard), including:
- The Region Selector dropdown in the topbar
- The Financial Overview carousel panel
- All charts, stat cards, and alerts

Refer to **Section 4.1** for full step-by-step instructions.

---

## 5.3 IT Equipments Inventory

The IT Equipments Inventory page displays all hardware assets in your assigned region.

[SCREENSHOT: IT Equipments Inventory Page - Full View]

### Searching and Filtering Assets

**Step 1.** Navigate to **IT Equipments Inventory** in the sidebar.

**Step 2.** Use the filter controls at the top of the table:

| Filter | How to Use |
|--------|-----------|
| **Search** | Type an asset tag, name, or serial number; results update instantly |
| **Region** | Select a region from the dropdown (Exec+Admin sees this filter) |
| **Status** | Select a status to filter: Available, Assigned, Under Repair, Lost, Damaged, Decommissioned |
| **Category** | Select a hardware category from the dropdown |

[SCREENSHOT: IT Equipments Inventory - Filter Controls in Use]

### Reading the Asset Table

The table displays:

| Column | Description |
|--------|-------------|
| Asset Tag | The unique system-generated identifier |
| Name | The asset's display name |
| Category | Hardware category badge |
| Status | Color-coded status badge |
| Serial Number | The hardware serial number |
| Warranty Date | Highlighted in yellow when within 90 days; red when expired |
| Actions | Edit and Delete buttons |

Results are paginated at 25 records per page. Use the page navigation buttons at the bottom to move between pages.

### Adding a New Asset

**Step 1.** Click the **Add Asset** button at the top of the page.

**Step 2.** The Add Asset modal will open.

[SCREENSHOT: Add Asset Modal - All Fields Visible]

**Step 3.** Fill in the fields as described below:

| Field | Description | Required | Limit/Notes |
|-------|-------------|----------|-------------|
| Asset Name | The name of the asset (e.g., "Dell Latitude 5520") | Yes | 25 characters max |
| Category | Select the hardware category from the dropdown | Yes | Shows only active categories |
| Location | Your region's location - auto-filled and cannot be edited | No | Read-only |
| Brand | The manufacturer brand (e.g., "Dell") | No | 25 characters max |
| Model | The specific model designation | No | 25 characters max |
| Serial Number | The hardware serial number - automatically converted to uppercase | Yes | 25 characters max |
| Status | The current asset status | Yes | Available / Assigned / Under Repair / Lost / Damaged / Decommissioned |
| Purchase Date | The date the asset was acquired | No | Date picker |
| Purchase Cost | The acquisition cost in your region's currency | No | Decimal number |
| Warranty Expiry | The date the manufacturer warranty expires | No | Date picker |
| Refresh Date | The recommended replacement date (auto-suggested as 5 years after purchase) | No | Date picker |
| Specifications | Technical specifications or configuration details | No | Free text |
| Notes | Any additional notes | No | Free text |

**Step 4.** After filling in all required fields, click **Save Asset**.

**Step 5.** A success toast notification will appear, and the new asset will appear in the table.

### Editing an Asset

**Step 1.** Locate the asset in the table using the search or filter controls.

**Step 2.** Click the **Edit** button (pencil icon) in the Actions column of that row.

**Step 3.** The Edit Asset modal opens pre-filled with the asset's current data.

[SCREENSHOT: Edit Asset Modal - Pre-filled with Existing Data]

**Step 4.** Make the desired changes to any editable field.

**Step 5.** Click **Save Asset** to confirm. A success toast will confirm the update.

### Deleting an Asset

> **Warning:** Asset deletion is permanent. Assets that have active assignments cannot be deleted until all assignments are returned.

**Step 1.** Locate the asset in the table.

**Step 2.** Click the **Delete** button (trash icon) in the Actions column.

**Step 3.** A confirmation dialog will appear asking you to confirm the deletion.

**Step 4.** Click **Confirm** to permanently delete the asset, or **Cancel** to abort.

[SCREENSHOT: Delete Asset Confirmation Dialog]

### Importing Assets from CSV or Excel

Use this feature to add multiple assets at once from a spreadsheet file.

**Step 1.** Click the **Import** button at the top of the page.

**Step 2.** A file selection dialog will open. Select a `.csv`, `.xlsx`, or `.xls` file from your computer.

**Step 3.** The system will start processing the file. A loading overlay will appear with a progress indicator and a **Cancel Import** button.

[SCREENSHOT: Asset Import - Loading Overlay with Cancel Button]

**Step 4.** Upon completion, a results summary will display showing:
- Number of records successfully imported
- Number of records skipped or errored, with reasons

**Step 5.** Review the summary and close it. The newly imported assets will appear in the table.

> **Tip:** Refer to the sample CSV template (sample_assets.csv) provided by your IT Department to ensure your file uses the correct column headers and format.

---

## 5.4 Software Licenses

The Software Licenses page displays all software licenses grouped by product.

[SCREENSHOT: Software Licenses Page - Full View with Product Cards]

### Stats Cards

Four summary cards are shown at the top:

| Card | Description |
|------|-------------|
| Total Products | Number of distinct software product categories |
| Assigned | Total active license assignments to employees |
| Expiring Soon | Licenses expiring within the next 30 days |
| Expired | Licenses that have passed their expiry date |

### Searching and Filtering Licenses

Use the filter controls at the top of the table:

| Filter | Options |
|--------|---------|
| Product | Select a specific software product |
| Status | Active / Expiring Soon / Expired / Perpetual / Inactive |
| Search | Type any keyword |

### Viewing License Details

**Step 1.** Locate the software product row in the table.

**Step 2.** Click the **View Details** button in the Actions column.

**Step 3.** The License Detail modal opens showing:
- Product name and status
- Total number of active assignments
- Nearest upcoming expiry date
- List of currently assigned employees with their license details

[SCREENSHOT: License Detail Modal - Product Details and Assigned Employees List]

### Assigning a License to an Employee

**Step 1.** Open the License Detail modal for the desired product (see above).

**Step 2.** Click the **Assign** button within the modal.

**Step 3.** An inline assignment form will appear below the button:
- Select the **Employee** from the dropdown.

**Step 4.** Click **Assign** to confirm.

**Step 5.** The employee will appear in the assigned list.

[SCREENSHOT: License Detail Modal - Inline Assign Form Expanded]

### Returning a License

**Step 1.** Open the License Detail modal for the product.

**Step 2.** In the assigned employees list, locate the employee whose license you are returning.

**Step 3.** Click the **Return** action button for that employee's row.

**Step 4.** Confirm the return in the dialog that appears.

### Editing a License Record

**Step 1.** Open the License Detail modal.

**Step 2.** Locate the license entry you want to edit and click its **Edit** button.

**Step 3.** The Edit License modal opens.

[SCREENSHOT: Edit License Modal - All Fields Visible]

**Step 4.** Edit the following fields as needed:

| Field | Description | Notes |
|-------|-------------|-------|
| Product Name | Read-only; cannot be changed here | Change via Settings -> IT Software Products |
| Credential Type | Toggle between License Key or Email | |
| License Key | The license key string | 25 characters max; real-time duplicate warning shown if key already exists |
| Expiry Date | When the license expires | Leave blank for a perpetual (no-expiry) license |
| Notes | Additional notes | Free text |

**Step 5.** Click **Save Changes**.

### Deactivating or Reactivating a License

**Step 1.** Open the License Detail modal for the product.

**Step 2.** Click the **Deactivate** button for a license entry you wish to deactivate.

**Step 3.** A confirmation modal will appear. Confirm to deactivate.

> **Note:** Deactivation is blocked if the software product category itself still has active licenses. Manage product categories from Settings -> IT Software Products.

**Step 4.** To reactivate, click the **Activate** button on an inactive license entry and confirm.

---

## 5.5 Employees

The Employees page manages the employee directory for your region.

[SCREENSHOT: Employees Page - Full View with Employee Table]

### Searching and Filtering Employees

Use the filter controls at the top:

| Filter | Options |
|--------|---------|
| Search | Name, employee ID, or email |
| Department | Select a department from the dropdown |
| Status | Active Only / Inactive Only / All Status |

### Adding a New Employee

**Step 1.** Click the **Add Employee** button at the top of the page.

**Step 2.** The Add Employee modal opens.

[SCREENSHOT: Add Employee Modal - All Fields Visible]

**Step 3.** Fill in the fields:

| Field | Description | Required | Notes |
|-------|-------------|----------|-------|
| Full Name | The employee's complete name | Yes | 25 characters max |
| Employee ID | The unique employee number | Yes | 25 characters max; auto-converts to uppercase; system warns immediately if a duplicate is detected |
| Email | The employee's company email | No | Email format validation |
| Department | Select from the dropdown | Yes | |
| Position | The employee's job title | No | 25 characters max |
| Location | Auto-filled from your region | No | Read-only |
| Status | Active or Inactive | No | Defaults to Active for new employees |
| Hardware Assets | Checkboxes for required hardware categories | No | Check the categories this employee needs |
| Software Licenses | Checkboxes for required software products | No | Check the software products this employee needs |

> **Note on Employee ID:** If you type an Employee ID that already exists in the system, a red warning banner will appear: *"WARNING: An employee with this employee number already exists."* You must enter a unique ID before saving.

**Step 4.** Click **Save**. The new employee will appear in the table.

### Editing an Employee

**Step 1.** Locate the employee in the table.

**Step 2.** Click the **Edit** button in the Actions column.

**Step 3.** The Edit Employee modal opens with current data pre-filled.

**Step 4.** Make the desired changes.

**Step 5.** Click **Save**.

### Deactivating an Employee

> **Important:** An employee with active asset assignments cannot be deactivated. You must return all their assets first.

**Step 1.** Locate the employee in the table.

**Step 2.** Click the **Deactivate** button in the Actions column.

**Step 3.** If the employee has active assignments, the system will display a **"Cannot Deactivate"** modal explaining the reason and showing the count of active assignments.

[SCREENSHOT: Cannot Deactivate Employee Modal]

**Step 4.** Click the **View Assigned Assets** link in that modal. You will be taken directly to the Assignments page, filtered to show only that employee's assignments.

**Step 5.** Return all active assets from the Assignments page (see Section 5.6 for steps).

**Step 6.** Return to the Employees page and attempt deactivation again.

**Step 7.** Once no active assignments exist, the deactivation will succeed.

### Importing Employees from CSV or Excel

**Step 1.** Click the **Import** button at the top of the page.

**Step 2.** Select a `.csv`, `.xlsx`, or `.xls` file.

**Step 3.** A loading overlay will appear during processing. You may click **Cancel Import** to stop.

**Step 4.** Review the results summary when processing completes.

---

## 5.6 Assignments

The Assignments page is the central hub for managing which employees are assigned which assets and software licenses.

[SCREENSHOT: Assignments Page - Full View with Requirements Checklist]

### Quick Stats Cards

Four summary cards appear at the top:

| Card | Color | Description |
|------|-------|-------------|
| Active Assignments | Blue | Number of currently assigned assets |
| Available Assets | Green | Assets that can be assigned |
| Returned This Month | Yellow | Returns recorded in the current calendar month |
| Employees Lacking Assets | Red | Employees who do not have all their required asset categories |

> **Tip:** Click the **Employees Lacking Assets** card to instantly filter the table to show only those employees.

### Filtering the Assignments Table

| Filter | Options |
|--------|---------|
| Status | All / Active / Returned |
| Department | Select a department |
| Lacking | All / Lacking Assets Only / No Assignment |

[SCREENSHOT: Assignments - Filter Controls]

### The Requirements Checklist View

The default view shows employees as rows with a visual checklist of their required categories. Categories colored green are fulfilled; categories colored red are missing.

[SCREENSHOT: Assignments - Requirements Checklist View with Green and Red Indicators]

### Assigning Assets and Licenses to an Employee

**Step 1.** Click the **Assign Asset** button at the top of the page.

**Step 2.** The Assign Modal opens.

[SCREENSHOT: Assign Asset Modal - Employee Selector Step]

**Step 3.** Select an **Employee** from the dropdown.

**Step 4.** After selecting an employee, two checklists appear:
- **Hardware Assets** - grouped by category; each item represents an available asset
- **Software Licenses** - grouped by software product; each item represents a license

**Step 5.** Check the box next to each asset or license you want to assign to this employee.

[SCREENSHOT: Assign Asset Modal - Hardware and Software Checklists Visible]

**Step 6.** Click **Save Assignments**.

**Step 7.** The selected assets and licenses are immediately assigned and the table updates.

### Quick Assign (From Checklist View)

When an employee is missing a specific required category, a **Quick Assign** button appears next to the gap.

**Step 1.** In the checklist view, locate a row where an employee has a red (missing) category.

**Step 2.** Click the **Quick Assign** button next to that category.

**Step 3.** The Quick Assign modal opens, pre-filled with:
- Employee name and department
- The specific missing category

[SCREENSHOT: Quick Assign Modal]

**Step 4.** Select an available asset from the dropdown.

**Step 5.** Optionally add notes.

**Step 6.** Click **Assign Asset**.

### Returning an Asset

**Step 1.** Locate the employee's assignment row in the table.

**Step 2.** Click the **Return** action button for the specific asset being returned.

**Step 3.** The Return Asset modal opens.

[SCREENSHOT: Return Asset Modal - Condition Selector and Notes Field]

**Step 4.** Select the **Return Condition**:
- **Good** - The asset is in acceptable condition. Status will change to "Available."
- **Damaged** - The asset came back damaged. Status will change to "Damaged."

**Step 5.** Optionally enter **Notes** about the return.

**Step 6.** Click **Return Asset**.

### Returning a Software License

**Step 1.** Click the **Return** action button next to a software license assignment.

**Step 2.** The Return Software License modal opens.

[SCREENSHOT: Return Software License Modal]

**Step 3.** Choose one of the following:
- **Assign a new license** - Select this if you want to simultaneously assign a different license to the employee.
- **Just return** - Select this to simply remove the license assignment.

**Step 4.** If "Assign a new license" is selected:
- Toggle the **Key Type** (License Key or Email).
- Enter the new license key or credentials.
- Enter the new expiry date (if applicable).

**Step 5.** Click **Save**.

### Defining Required Asset Categories for an Employee

**Step 1.** Locate the employee in the assignments table.

**Step 2.** Click the **View** button to expand or open that employee's assignment details.

**Step 3.** Click the **Define Required Categories** button.

**Step 4.** The Define Required Categories modal opens with two checklists: Hardware and Software.

[SCREENSHOT: Define Required Categories Modal]

**Step 5.** Check or uncheck the categories this employee requires.

**Step 6.** Click **Save Requirements**.

**Step 7.** The requirements checklist view in the table will update immediately to reflect the new requirements.

---

## 5.7 Asset Maintenance

The Asset Maintenance page tracks all repair, preventive maintenance, and upgrade records.

[SCREENSHOT: Asset Maintenance Page - Full View]

### Stats Cards

| Card | Color | Description |
|------|-------|-------------|
| In Progress | Yellow | Open maintenance records not yet completed |
| Completed | Green | Completed maintenance records |
| Cannot Repair | Red | Records marked as unrepairable |
| Total Repair Cost | Blue | Sum of all logged maintenance costs in your region's currency |

### The Damaged Assets Panel

**Step 1.** Click the **Damaged Assets** button at the top of the page. A red badge on the button shows the current count of damaged assets.

**Step 2.** A collapsible panel appears below the topbar listing all damaged assets by name, tag, and category.

[SCREENSHOT: Damaged Assets Panel - Expanded with Asset List]

**Step 3.** For any asset in this list, click the **Log Repair** button. This opens the Maintenance Modal with that asset pre-selected.

**Step 4.** Click the **Damaged Assets** button again to collapse the panel.

### Searching and Filtering Maintenance Records

| Filter | Options |
|--------|---------|
| Search | Asset name or asset tag |
| Status | In Progress / Completed / Cannot Repair |
| Type | Repair / Preventive / Upgrade |

### Logging a New Maintenance Record

**Step 1.** Click the **Log Maintenance** button at the top of the page.

**Step 2.** The Maintenance Modal opens.

[SCREENSHOT: Log Maintenance Modal - All Fields Visible]

**Step 3.** Fill in the fields:

| Field | Description | Required | Notes |
|-------|-------------|----------|-------|
| Asset | Select the asset being serviced | Yes | Excludes decommissioned, lost-under-investigation, and assets already in progress |
| Type | The type of service | Yes | Repair / Preventive / Upgrade |
| Status | Current status of this maintenance | Yes | In Progress / Completed / Cannot Repair |
| Issue Description | What is wrong or what is being done | Yes | Free text |
| Resolution | What was done to resolve the issue | No | Free text |
| Start Date | When maintenance began | No | Defaults to today's date |
| Completed Date | When maintenance was finished | Conditional | Required when Status = Completed or Cannot Repair |
| Cost | The cost of parts or labor | No | Decimal number; currency symbol from your region |
| Performed By | The technician or vendor who did the work | No | 25 characters max |

**Step 4.** If you set the Status to **Completed** or **Cannot Repair**, a **Confirm Completion** modal will appear before saving, summarizing:
- Status
- Completed Date
- Cost
- Performed By

[SCREENSHOT: Confirm Completion Modal - Summary Before Saving]

**Step 5.** Click **Confirm Save** in the Confirm Completion modal to finalize the record.

### Editing a Maintenance Record

**Step 1.** Locate the maintenance record in the table.

**Step 2.** Click the **Edit** button in the Actions column.

**Step 3.** The Edit Maintenance modal opens with current data pre-filled.

**Step 4.** Make the desired changes.

**Step 5.** If changing the status to Completed or Cannot Repair, the Confirm Completion modal will again appear.

**Step 6.** Click **Save** (or **Confirm Save** if prompted).

> **Note for IT Staff:** IT Staff cannot edit records with a Completed or Cannot Repair status. Those rows show a **View** button instead of an Edit button.

---

## 5.8 Lost Assets

The Lost Assets page tracks assets that have been reported missing, are under investigation, or have been recovered.

[SCREENSHOT: Lost Assets Page - Full View]

### Stats Cards

| Card | Color | Description |
|------|-------|-------------|
| Under Investigation | Yellow | Active reports being investigated |
| Found | Green | Assets that have been recovered |
| Permanently Lost | Red | Assets confirmed permanently lost |

### Filtering Records

| Filter | Options |
|--------|---------|
| Status | Under Investigation / Found / Permanently Lost |
| Date From | Start of date range filter |
| Date To | End of date range filter |

### Reporting a Lost Asset

**Step 1.** Click the **Report Lost Asset** button.

**Step 2.** The Lost Asset modal opens.

[SCREENSHOT: Report Lost Asset Modal - All Fields Visible]

**Step 3.** Fill in the fields:

| Field | Description | Required | Notes |
|-------|-------------|----------|-------|
| Asset | Select the asset that was lost | Yes | Select from dropdown |
| Employee Responsible | Select the responsible employee | No | Auto-populated from last assignment; can be set to "Unassigned" |
| Date Reported | When the loss was reported | Yes | Defaults to today |
| Last Known Location | Where the asset was last seen | No | 25 characters max |
| Status | Current investigation status | Yes | Under Investigation / Found / Permanently Lost |
| Date Found | When the asset was recovered | Conditional | Shown only when Status = Found |
| Estimated Value | The estimated value of the asset | No | Decimal; currency from your region |
| Liability Amount | The amount assigned as liability | No | Decimal; currency from your region |
| Liability Action | What liability action is being taken | No | None / Warning / Cost Recovery / Write-off |
| Payment Status | Current payment status of liability | No | N/A / Pending / Partial Payment / Paid in Full / Waived |
| Circumstances | Description of how the loss occurred | Yes | Free text |
| Recovery Notes | Notes on how the asset was recovered | Conditional | Shown when Status = Found |
| Resolution Notes | General resolution notes | No | Free text |

**Step 4.** Click **Save Record**. The new record appears in the table.

### Editing a Lost Asset Record

**Step 1.** Locate the record in the table.

**Step 2.** Click the **Edit** button.

**Step 3.** The Edit modal opens.

**Step 4.** Make changes. Note that once a record's status is set to **Found** or **Permanently Lost**, the status field cannot be changed back.

**Step 5.** Click **Save Record**.

### Viewing a Lost Asset Record (Read-Only)

**Step 1.** Click the **View** button for any record.

**Step 2.** A read-only View modal opens showing all fields. No changes can be made from this view.

[SCREENSHOT: Lost Asset View Modal - Read-Only Fields]

---

## 5.9 Export Reports

Refer to **Section 4.2** for full step-by-step instructions. As an Exec+Admin, your experience is identical to that of a pure Executive on the Reports page, including the Region dropdown for selecting which region's data to export.

---

## 5.10 Audit Logs

Refer to **Section 4.3** for full step-by-step instructions. As an Exec+Admin, you have the same full access to Audit Logs as a pure Executive, including the ability to filter by any user.

---

## 5.11 Settings

Refer to **Section 4.4** for full step-by-step instructions. As an Exec+Admin, you have access to all four Settings tabs (Permissions, Assignment Rules, IT Hardware Categories, IT Software Products), exactly the same as a pure Executive.

---

## 5.12 User Maintenance

Refer to **Section 4.5** for full step-by-step instructions. As an Exec+Admin, your User Maintenance access and capabilities are the same as a pure Executive.

---

# 6. Admin Role Guide

## 6.1 Role Overview

The **Admin** role provides full operational management of IT assets within a **single assigned region**. Admins can add, edit, and delete all records in their region, manage user accounts for their territory, access reports and audit logs, and control IT Staff permissions.

**Key differences from Exec+Admin:**
- The Dashboard shows a fixed region label (not a Region Selector dropdown)
- Settings only shows the **Permissions** tab (Assignment Rules, Hardware Categories, and Software Products tabs are not visible)
- User Maintenance: You can see all Executives and Admins (all regions), but can only see IT Staff and Viewers in your own region. You cannot invite Executive-level users.
- Reports: A fixed region label is shown (not a dropdown)

## 6.2 Dashboard

Your Dashboard is identical to that of Exec+Admin but limited to your assigned region. The topbar shows a read-only region label instead of a dropdown selector.

**Steps:** Refer to Section 5.2 (Dashboard). The Month Selector is still available. All charts, stat cards, alerts, and panels function the same way within your region.

> **Note:** The Financial Overview carousel is not visible for the Admin role.

[SCREENSHOT: Dashboard - Admin View with Fixed Region Label in Topbar]

---

## 6.3 IT Equipments Inventory

Full instructions are in **Section 5.3**. All steps are identical for an Admin. The following notes apply:

- The **Region** filter dropdown visible to Exec+Admin is not shown; your region is fixed.
- Import, Add, Edit, and Delete functions are all available.

---

## 6.4 Software Licenses

Full instructions are in **Section 5.4**. All steps are identical for an Admin.

---

## 6.5 Employees

Full instructions are in **Section 5.5**. All steps are identical for an Admin.

---

## 6.6 Assignments

Full instructions are in **Section 5.6**. All steps are identical for an Admin.

---

## 6.7 Asset Maintenance

Full instructions are in **Section 5.7**. All steps are identical for an Admin.

> **Note:** Admins can edit **all** maintenance records, including those with Completed and Cannot Repair status. This is a capability that IT Staff do not have.

---

## 6.8 Lost Assets

Full instructions are in **Section 5.8**. All steps are identical for an Admin.

---

## 6.9 Export Reports

Full instructions are in **Section 4.2**. As an Admin, the Reports page shows a fixed region label instead of a dropdown. Your reports will only contain data from your assigned region.

[SCREENSHOT: Export Reports - Admin View with Fixed Region Label]

---

## 6.10 Audit Logs

Full instructions are in **Section 4.3**. As an Admin, you can view all users' audit logs within the system (including IT Staff and Viewer logs for your region, as well as Executive and Admin logs). You can also filter by any user.

---

## 6.11 Settings

As an Admin, you can access the **Settings** page, but only the **Permissions** tab is visible to you. The Assignment Rules, IT Hardware Categories, and IT Software Products tabs are hidden.

[SCREENSHOT: Settings Page - Admin View, Only Permissions Tab Visible]

**Permissions Tab:** Refer to **Section 4.4, Tab 1: Permissions** for full instructions on enabling or disabling IT Staff access to Reports, Import, and Audit Logs.

---

## 6.12 User Maintenance

### What You Can See

| User Type | Visibility |
|-----------|------------|
| All Executives (any region) | Visible |
| All Admins (any region) | Visible |
| All Exec+Admin users (any region) | Visible |
| IT Staff and Viewers in your region | Visible |
| IT Staff and Viewers in other regions | Not visible |

### Inviting Users

**Step 1.** Click **Invite User**. Refer to **Section 4.5** for the complete Invite User steps.

> **Important Restrictions for Admins:**
> - You can invite **IT Staff** and **Viewers** for your region only.
> - You **cannot** invite Executive-only or Admin-level users; those accounts must be created by an Executive.
> - When inviting, the Assigned Region is automatically set to your region and cannot be changed.

### Editing Users

Full instructions are in **Section 4.5**. Note: You can only edit the roles and status of IT Staff and Viewers in your own region. Executive and Admin records are visible but not editable by a pure Admin.

### Sending a Password Reset

Refer to **Section 4.5 - Sending a Password Reset to a User** for step-by-step instructions. This capability is available for users in your region.

---

# 7. IT Staff Role Guide

## 7.1 Role Overview

The **IT Staff** role handles the day-to-day operational management of IT assets, employees, and assignments within a single assigned region. This role cannot access Settings or User Maintenance.

**Access summary:**
- Can add and edit assets, employees, assignments, maintenance records, software licenses, and lost assets
- Cannot edit maintenance records that have a Completed or Cannot Repair status (view-only for those)
- Cannot access Settings or User Maintenance
- Access to Reports, Import functions, and Audit Logs depends on permissions configured by your Admin or Executive

[SCREENSHOT: Dashboard - IT Staff View with Blue Role Badge in Sidebar]

## 7.2 Dashboard

Your Dashboard is fixed to your assigned region. The topbar displays a read-only region label.

**Step 1.** After logging in, you are taken to the Dashboard by default.

**Step 2.** The Dashboard shows up-to-date stats for your region: Available, Assigned, Under Repair, Issues (Lost + Damaged), and Decommissioned asset counts.

**Step 3.** Use the **Month Selector** in the topbar to filter the stats by a specific month.

**Step 4.** Click the **Software** toggle to switch to the Software dashboard view (Total Products, Assigned, Expiring Soon, Expired).

All chart and panel behavior is the same as described in Section 4.1, limited to your region's data.

[SCREENSHOT: Dashboard - IT Staff View, Hardware Stats for One Region]

---

## 7.3 IT Equipments Inventory

Full instructions are in **Section 5.3**. All add, edit, search, and filter steps are available to you with the following notes:

- The Region filter dropdown is not shown (your region is fixed).
- The **Delete** button is available to IT Staff.
- The **Import** button is visible only if your Admin has enabled **IT Staff Import Access** in Settings. If you do not see the Import button, contact your Admin to enable this permission.

[SCREENSHOT: IT Equipments Inventory - IT Staff View (Import Button May Be Hidden)]

---

## 7.4 Software Licenses

Full instructions are in **Section 5.4**. All features are available to IT Staff: viewing, assigning, returning, and editing licenses.

---

## 7.5 Employees

Full instructions are in **Section 5.5**. All add, edit, search, and filter steps apply. The same Import permission note applies: the Import button is only shown if your Admin has enabled this for IT Staff.

---

## 7.6 Assignments

Full instructions are in **Section 5.6**. All assignment features are available to IT Staff:
- Assign Asset modal
- Quick Assign from checklist view
- Return Asset
- Return Software License
- Define Required Categories

---

## 7.7 Asset Maintenance

Full instructions are in **Section 5.7** with the following important restriction:

> **IT Staff Edit Restriction:** You can log new maintenance records and edit records with **In Progress** status. However, you **cannot** edit records that have a **Completed** or **Cannot Repair** status. Those rows will show a **View** button instead of an Edit button. If you need a completed record corrected, contact your Admin.

[SCREENSHOT: Maintenance Table - IT Staff View, "View" Button on Completed Record]

---

## 7.8 Lost Assets

Full instructions are in **Section 5.8**. All report and edit functions are available to IT Staff.

---

## 7.9 Export Reports (If Enabled)

> **Note:** The Export Reports link will only appear in your sidebar if your Admin has enabled **IT Staff Reports Access** in Settings. If the link is not visible, contact your Admin.

If the link is visible, refer to **Section 4.2** for complete instructions. As an IT Staff user, a fixed region label is shown on the page (not a dropdown); your reports will contain data from your assigned region only.

[SCREENSHOT: Export Reports - IT Staff View with Region Label]

---

## 7.10 Audit Logs (If Enabled)

> **Note:** The Audit Logs link will only appear in your sidebar if your Admin has enabled **IT Staff Audit Logs Access** in Settings. If the link is not visible, contact your Admin.

If the link is visible, the Audit Logs page functions as described in **Section 4.3** with the following restriction:

> **IT Staff Log Restriction:** You can only see your **own** audit log entries. The User filter dropdown is not shown. You cannot view the actions of other users.

[SCREENSHOT: Audit Logs - IT Staff View, No User Filter Dropdown]

---

# 8. Notifications

The system generates automated notifications to alert users about important events related to assets in their region.

[SCREENSHOT: Notification Bell Icon with Unread Count Badge]

## 8.1 What Triggers a Notification

| Trigger | Condition |
|---------|-----------|
| Warranty Expiring | An asset's Warranty Expiry Date is within 90 days |
| Refresh Due | An asset's Refresh Date is approaching based on the 5-year lifecycle |

## 8.2 Viewing Notifications

**Step 1.** Look for the **bell icon** in the topbar. If there are unread notifications, a red badge with a number will appear on the icon.

**Step 2.** Click the bell icon to open the notification dropdown.

[SCREENSHOT: Notification Dropdown - Open with Sample Alerts Listed]

**Step 3.** The dropdown lists recent alerts. Each entry shows:
- The alert type (e.g., "Warranty Expiring")
- The asset name and tag
- The relevant date

**Step 4.** Click on a notification entry to navigate to the relevant asset detail.

**Step 5.** Click outside the dropdown to close it.

---

# 9. Frequently Asked Questions and Troubleshooting

## 9.1 Login and Access Issues

**Q: I cannot log in. The error says "Invalid email or password."**
Verify that you are using the correct email address and password. Passwords are case-sensitive. If you have forgotten your password, contact your Admin or Executive to send you a password reset email.

**Q: My password reset link says it has expired.**
Password links are only valid for 3 minutes after being sent. Contact your Admin and ask them to resend the password reset from your account in User Maintenance. Act quickly after receiving the new email.

**Q: I do not see certain pages in my sidebar (e.g., Reports, Audit Logs).**
If you are an IT Staff user, those links are only shown when your Admin has enabled the corresponding permission in Settings -> Permissions. Contact your Admin to enable access.

**Q: I get redirected to the Dashboard when I try to open a page directly.**
Your role does not have access to that page. Refer to the Role Permissions Matrix in Appendix B to confirm what your role can access.

---

## 9.2 Asset Management Issues

**Q: I cannot delete an asset.**
Assets with active assignments cannot be deleted. Return all active assignments for that asset first (via the Assignments page), then attempt the deletion.

**Q: The asset's Location field is blank or shows the wrong region.**
The Location field is automatically populated from your assigned region. If the value appears incorrect, contact your Admin to verify your account's region assignment.

**Q: The Warranty Expiry date is highlighted in red.**
A red highlight means the warranty has already expired. A yellow highlight means it will expire within 90 days. Plan for renewal or replacement accordingly.

---

## 9.3 Employee and Assignment Issues

**Q: I cannot deactivate an employee.**
The employee has one or more active asset assignments. You must return all their assigned assets and licenses before deactivating them. Click the "View Assigned Assets" link in the Cannot Deactivate modal to go directly to their assignments.

**Q: An employee shows in red on the Assignments checklist.**
This means the employee has one or more required asset categories that are not currently assigned. Use the Quick Assign button next to the missing category to assign an available asset.

**Q: I entered an Employee ID and a warning appeared saying it already exists.**
Employee IDs must be unique across the system in your region. Enter a different, unique ID before saving.

---

## 9.4 Maintenance Issues

**Q: I cannot edit a maintenance record - I only see a View button.**
If you are an IT Staff user, you cannot edit records with Completed or Cannot Repair status. Contact your Admin if a correction is needed.

**Q: The Completed Date field is not showing on the maintenance form.**
The Completed Date field only appears when the Status is set to "Completed" or "Cannot Repair." Change the Status field first.

---

## 9.5 Software License Issues

**Q: A warning appeared when I entered a license key saying a duplicate was detected.**
The license key you entered already exists in the system. Check whether this license has already been recorded. Use a different, unique key or clarify with the software vendor.

**Q: I cannot deactivate a software product in Settings.**
Software products (categories) can only be deactivated if they have no active licenses. Deactivate or reassign all licenses for that product first from the Software Licenses page.

---

## 9.6 Import Issues

**Q: My import failed or some records were skipped.**
Ensure your file uses the correct column headers. Download the sample template file (sample_assets.csv or sample_employees.csv) from the IT Department and compare the format. Common issues include:
- Extra or missing columns
- Incorrect date formats (use YYYY-MM-DD)
- Values that do not match the system's allowed options (e.g., status values must match exactly)

**Q: The Import button is not visible on the Assets or Employees page.**
If you are an IT Staff user, the Import button is only shown when your Admin has enabled IT Staff Import Access in Settings. Contact your Admin.

---

## 9.7 Reports and Audit Log Issues

**Q: When I export a PDF of the Software Licenses report, license keys are missing.**
This is by design. License keys and credentials are omitted from PDF exports for security reasons. Download the Excel version to get the full data including keys.

**Q: I cannot see other users' actions in the Audit Log.**
IT Staff users can only see their own audit log entries. Admins and Executives can see all users' logs.

---

# Appendix A - Field Reference Tables

## A.1 Asset Form Fields

| Field | Type | Required | Max Length | Notes |
|-------|------|----------|------------|-------|
| Asset Name | Text | Yes | 25 chars | |
| Category | Select | Yes | - | Active categories only |
| Location | Text | No | - | Read-only; auto from region |
| Brand | Text | No | 25 chars | |
| Model | Text | No | 25 chars | |
| Serial Number | Text | Yes | 25 chars | Auto-uppercase |
| Status | Select | Yes | - | Available / Assigned / Under Repair / Lost / Damaged / Decommissioned |
| Purchase Date | Date | No | - | |
| Purchase Cost | Number | No | - | Regional currency |
| Warranty Expiry | Date | No | - | Alerts at 90 days |
| Refresh Date | Date | No | - | Suggested: purchase date + 5 years |
| Specifications | Textarea | No | - | |
| Notes | Textarea | No | - | |

## A.2 Employee Form Fields

| Field | Type | Required | Max Length | Notes |
|-------|------|----------|------------|-------|
| Full Name | Text | Yes | 25 chars | |
| Employee ID | Text | Yes | 25 chars | Auto-uppercase; duplicate check |
| Email | Email | No | - | |
| Department | Select | Yes | - | |
| Position | Text | No | 25 chars | |
| Location | Text | No | - | Read-only; auto from region |
| Status | Select | No | - | Active / Inactive; defaults to Active |
| Hardware Assets | Checkboxes | No | - | Required categories |
| Software Licenses | Checkboxes | No | - | Required software products |

## A.3 Maintenance Record Form Fields

| Field | Type | Required | Condition | Notes |
|-------|------|----------|-----------|-------|
| Asset | Select | Yes | - | Excludes decommissioned, lost-under-investigation, in-progress |
| Type | Select | Yes | - | Repair / Preventive / Upgrade |
| Status | Select | Yes | - | In Progress / Completed / Cannot Repair |
| Issue Description | Textarea | Yes | - | |
| Resolution | Textarea | No | - | |
| Start Date | Date | No | - | Defaults to today |
| Completed Date | Date | Conditional | Status = Completed or Cannot Repair | |
| Cost | Number | No | - | Regional currency |
| Performed By | Text | No | 25 chars | |

## A.4 Lost Asset Report Form Fields

| Field | Type | Required | Condition | Notes |
|-------|------|----------|-----------|-------|
| Asset | Select | Yes | - | |
| Employee Responsible | Select | No | - | Auto from last assignment; can be Unassigned |
| Date Reported | Date | Yes | - | Defaults to today |
| Last Known Location | Text | No | 25 chars | |
| Status | Select | Yes | - | Under Investigation / Found / Permanently Lost |
| Date Found | Date | Conditional | Status = Found | |
| Estimated Value | Number | No | - | Regional currency |
| Liability Amount | Number | No | - | Regional currency |
| Liability Action | Select | No | - | None / Warning / Cost Recovery / Write-off |
| Payment Status | Select | No | - | N/A / Pending / Partial Payment / Paid in Full / Waived |
| Circumstances | Textarea | Yes | - | |
| Recovery Notes | Textarea | Conditional | Status = Found | |
| Resolution Notes | Textarea | No | - | |

## A.5 Software License Edit Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Product Name | Text | - | Read-only |
| Credential Type | Radio | No | License Key / Email |
| License Key | Text | No | 25 chars; duplicate warning |
| Expiry Date | Date | No | Leave blank for perpetual |
| Notes | Textarea | No | |

## A.6 Invite / Edit User Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Email Address | Email | Yes | Must be unique |
| Full Name | Text | Yes | |
| Roles | Checkboxes | Yes | Executive / Admin / IT Staff / Viewer; combination rules apply |
| Assigned Region | Select | Conditional | Required for non-Executive-only users |
| Status (Edit only) | Select | No | Active / Inactive |

---

# Appendix B - Role Permissions Matrix

| Feature | Executive | Exec+Admin | Admin | IT Staff |
|---------|-----------|------------|-------|----------|
| Dashboard - all regions | Yes | Yes | Region only | Region only |
| Dashboard - month selector | Yes | Yes | Yes | Yes |
| Dashboard - financial overview | Yes | Yes | No | No |
| Assets - view | Yes (read-only) | Yes | Yes | Yes |
| Assets - add / edit / delete | No | Yes | Yes | Yes |
| Assets - import | No | Yes | Yes | If enabled |
| Employees - view | No | Yes | Yes | Yes |
| Employees - add / edit / deactivate | No | Yes | Yes | Yes |
| Employees - import | No | Yes | Yes | If enabled |
| Assignments - view | No | Yes | Yes | Yes |
| Assignments - assign / return | No | Yes | Yes | Yes |
| Maintenance - view | No | Yes | Yes | Yes |
| Maintenance - log new | No | Yes | Yes | Yes |
| Maintenance - edit In Progress | No | Yes | Yes | Yes |
| Maintenance - edit Completed / Cannot Repair | No | Yes | Yes | No |
| Lost Assets - view | No | Yes | Yes | Yes |
| Lost Assets - report / edit | No | Yes | Yes | Yes |
| Software Licenses - view | No | Yes | Yes | Yes |
| Software Licenses - assign / return / edit | No | Yes | Yes | Yes |
| Export Reports | Yes | Yes | Yes | If enabled |
| Audit Logs - view | Yes | Yes | Yes | If enabled |
| Audit Logs - view all users | Yes | Yes | Yes | Own only |
| Settings - Permissions tab | Yes | Yes | Yes | No |
| Settings - Assignment Rules tab | Yes | Yes | No | No |
| Settings - IT Hardware Categories tab | Yes | Yes | No | No |
| Settings - IT Software Products tab | Yes | Yes | No | No |
| User Maintenance - view | Yes | Yes | Yes | No |
| User Maintenance - invite Executive / Admin | Yes | Yes | No | No |
| User Maintenance - invite IT Staff / Viewer | Yes | Yes | Own region | No |
| User Maintenance - send password reset | Yes | Yes | Yes | No |
| Notifications | Yes | Yes | Yes | Yes |

---

# Appendix C - Report Column Reference

## C.1 IT Equipment Inventory Master List

Asset Tag, Name, Category, Brand, Model, Serial Number, Status, Assigned To, Department, Location, Region, Purchase Date, Purchase Cost, Warranty Expiry, Refresh Date, Notes, Logged By, Date Added

## C.2 Assignment Report

Asset Tag, Asset Name, Category, Serial Number, Employee ID, Employee Name, Department, Assignment Type, Assigned Date, Assigned By, Notes

## C.3 Warranty Report

Asset Tag, Name, Category, Brand, Model, Serial Number, Status, Department, Location, Warranty Expiry, Days Until Expiry

## C.4 Maintenance History

Asset Tag, Asset Name, Serial Number, Type, Issue Description, Resolution, Status, Performed By, Start Date, Completed Date, Cost, Notes, Logged By, Date Logged

## C.5 Employee Directory

Employee ID, Full Name, Email, Phone, Department, Position, Location, Region, Status, Added By, Date Added

## C.6 Lost Assets Report

Asset Tag, Asset Name, Serial Number, Employee Responsible, Department, Date Reported, Last Known Location, Status, Date Found, Estimated Value, Liability Amount, Liability Action, Payment Status, Circumstances, Recovery Notes, Resolution Notes, Reported By

## C.7 Software Licenses Report

Software Name, Category, License Type, Key/Credential Type, License Key/Email *(Excel only - omitted from PDF)*, Seats, Assigned (Employees), Assigned (Assets), Total Assignments, Expiry Date, Status, Region, Date Added

---

*End of Document*

**Madison 88 Business Solutions Asia Inc. - IT Department**
*M88 IT Equipment Inventory Management System - User Guide Manual v1.0 - March 2026*