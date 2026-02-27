# User Roles & Permissions - M88 ITEIMS

This document describes the four user roles implemented in the Madison 88 IT Equipment Inventory Management System and their access levels across all modules. Users are assigned to specific regions, and data access is scoped accordingly.

## Supported Regions

| Code | Label |
|------|-------|
| PH | Madison88 IT Assets in the Philippines |
| ID | Madison88 IT Assets in Indonesia |
| CN | Madison88 IT Assets in China |
| US | Madison88 IT Assets in United States |

---

## Executive
**For:** CEO, CFO, or any person in a high-level position in the company.

**Accessible Modules:** Dashboard, Reports, Audit Logs, Settings

- **Dashboard:** Has a dropdown to view IT assets across all regions (Philippines, Indonesia, China, United States) or the combined global view.
- **Reports:** Can generate PDF or Excel reports for any region. Available reports: Asset Master List, Assignment Report, Warranty Report, Maintenance History, Employee Directory, Lost Assets Report.
- **Audit Logs:** All audit logs from every user type are visible, ensuring alignment and security.
- **Settings:**
  - **Users:** Can modify all users, their roles, and their assigned region.
  - **Permissions:** Can modify user permissions for every role.
  - **Assignment Rules:** Can configure whether each asset category allows single or multiple assignments to employees.
  - **Categories:** Can add, deactivate, or edit asset categories.

---

## Admin
**For:** Assigned regional manager for a specific location.

**Accessible Modules:** Dashboard, Assets, Employees, Assignments, Maintenance, Lost Assets, Software Licenses, Reports, Audit Logs, Settings

- **Dashboard:** Shows data for their assigned region only.
- **Assets:** Full CRUD and import within their region only.
- **Employees:** Full CRUD and import within their region only.
- **Assignments:** Full management (add, edit, filter, assign) within their region only.
- **Maintenance:** Log, filter, and edit maintenance records within their region only.
- **Lost Assets:** Report, filter, and edit lost assets within their region only.
- **Software Licenses:** Add, filter, and edit licenses within their region. Licenses are automatically scoped to the adding user's region — only admins and IT staff in the same region can manage them.
- **Reports:** Generate PDF or Excel reports for their region only. Same report types as Executive but limited to own region.
- **Audit Logs:** All audit logs from users in all regions (except Executive) are visible.
- **Settings:**
  - **Users:** Can modify IT Staff and Viewer roles within their assigned region (activate/deactivate, edit roles).
  - **Permissions:** Can modify IT Staff permissions for their region.

---

## IT Staff
**For:** IT personnel tasked with managing the system for a specific region.

**Accessible Modules:** Dashboard, Assets, Employees, Assignments, Maintenance, Lost Assets, Software Licenses. Reports and Audit Logs access depends on Admin permission settings.

- **Dashboard:** Shows data for their assigned region only.
- **Assets:** Add, edit, and import (if permitted by Admin) within their region only.
- **Employees:** Add, edit, and import (if permitted by Admin) within their region only.
- **Assignments:** Add, edit, filter, and assign within their region only.
- **Maintenance:** Log, filter, and edit within their region only.
- **Lost Assets:** Report, filter, and edit within their region only.
- **Software Licenses:** Add, filter, and edit within their region. Licenses are automatically scoped to the adding user's region.
- **Reports:** If permitted by Admin, can generate PDF or Excel reports for their region only.
- **Audit Logs:** If permitted by Admin, same access level as current implementation.

---

## Viewer
**For:** All employees or stakeholders who need visibility into the system.

**Accessible Modules:** Dashboard only

- **Dashboard:** Read-only view of IT asset data for their assigned region.