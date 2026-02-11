/**
 * ============================================
 * CONFIGURATION FILE
 * Madison 88 IT Equipment Inventory System
 * ============================================
 * 
 * This file contains all configuration settings.
 * Update the Supabase credentials below with your own.
 */

// Import Supabase from CDN (loaded via importmap or global)
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ===========================================
// SUPABASE CONFIGURATION
// ===========================================
// Get these from: Supabase Dashboard → Settings → API

const SUPABASE_URL = 'https://hhnvjkxsuhvtsoxzrahi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhobnZqa3hzdWh2dHNveHpyYWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MTg5MjYsImV4cCI6MjA4NTM5NDkyNn0.9vUE2LvCJLCNSkyjVm3HdHTmphF_1HF4_zKob-QnTnE';

// Create and export the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Also make available globally for non-module scripts
window.supabase = supabase;

// Export URL for reference
export { SUPABASE_URL };

// ===========================================
// APPLICATION SETTINGS
// ===========================================

const APP_CONFIG = {
    // Application name
    appName: 'Madison 88 IT Assets',
    
    // Company name
    companyName: 'Madison 88',
    
    // Version
    version: '1.0.0',
    
    // Default pagination
    itemsPerPage: 25,
    
    // Asset refresh cycle (years)
    refreshCycleYears: 5,
    
    // Warranty alert threshold (days)
    warrantyAlertDays: 90,
    
    // Date format
    dateFormat: 'YYYY-MM-DD',
    
    // Currency
    currency: 'PHP',
    
    // Theme
    defaultTheme: 'dark'
};

// ===========================================
// STATUS CONFIGURATIONS
// ===========================================

const ASSET_STATUS = {
    available: { label: 'Available', color: 'green', icon: 'check-circle' },
    assigned: { label: 'Assigned', color: 'blue', icon: 'user' },
    under_repair: { label: 'Under Repair', color: 'yellow', icon: 'wrench' },
    lost: { label: 'Lost', color: 'red', icon: 'x-circle' },
    damaged: { label: 'Damaged', color: 'orange', icon: 'alert-triangle' },
    decommissioned: { label: 'Decommissioned', color: 'gray', icon: 'archive' }
};

const MAINTENANCE_STATUS = {
    pending: { label: 'Pending', color: 'yellow', icon: 'clock' },
    in_progress: { label: 'In Progress', color: 'blue', icon: 'loader' },
    completed: { label: 'Completed', color: 'green', icon: 'check' },
    cancelled: { label: 'Cancelled', color: 'gray', icon: 'x' }
};

const USER_ROLES = {
    admin: { label: 'Administrator', level: 3 },
    it_staff: { label: 'IT Staff', level: 2 },
    viewer: { label: 'Viewer', level: 1 }
};

// ===========================================
// NOTIFICATION TYPES
// ===========================================

const NOTIFICATION_TYPES = {
    info: { icon: 'info', color: 'blue' },
    warning: { icon: 'alert-triangle', color: 'yellow' },
    error: { icon: 'x-circle', color: 'red' },
    success: { icon: 'check-circle', color: 'green' }
};

// ===========================================
// EXPORT CONFIGURATION
// Don't modify unless necessary
// ===========================================

// Export all configurations as named exports
export { APP_CONFIG, ASSET_STATUS, MAINTENANCE_STATUS, USER_ROLES, NOTIFICATION_TYPES };

// Also make config available globally for non-module scripts
window.CONFIG = {
    SUPABASE_URL,
    APP: APP_CONFIG,
    ASSET_STATUS,
    MAINTENANCE_STATUS,
    USER_ROLES,
    NOTIFICATION_TYPES
};

// Log success
console.log('✅ Config loaded, Supabase client ready');
