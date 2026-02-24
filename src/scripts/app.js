/**
 * ============================================
 * MAIN APPLICATION
 * Madison 88 IT Equipment Inventory System
 * ============================================
 * 
 * Core application initialization and shared functionality.
 */

const App = {
    // ===========================================
    // INITIALIZATION
    // ===========================================
    
    /**
     * Initialize the application
     * Call this on every page load
     */
    async init() {
        // console.log('🚀 Initializing M88 IT Assets System...');
        
        // Show loading screen
        Components.showLoading();
        
        try {
            // Validate configuration
            if (!this.validateConfig()) {
                throw new Error('Invalid configuration. Please check js/config.js');
            }
            
            // Initialize Supabase client
            this.initSupabase();
            
            // Initialize authentication
            const isAuthenticated = await Auth.init();
            
            // Get current page
            const currentPage = this.getCurrentPage();
            
            // Handle public vs protected pages
            const publicPages = ['index.html', 'reset-password.html', 'set-password.html'];
            
            if (publicPages.includes(currentPage)) {
                // Public page - redirect if already authenticated
                if (isAuthenticated && currentPage === 'index.html') {
                    window.location.href = 'dashboard.html';
                    return;
                }
            } else {
                // Protected page - require authentication
                if (!isAuthenticated) {
                    window.location.href = 'index.html';
                    return;
                }
                
                // Initialize notifications
                await Notifications.init();
                
                // Load common data
                await this.loadCommonData();
                
                // Update UI with user info
                Auth.updateUserUI();
                
                // Setup navigation
                this.setupNavigation();
                
                // Setup theme
                this.initTheme();
            }
            
            // console.log('✅ Application initialized successfully');
            
        } catch (error) {
            console.error('❌ Application initialization error:', error);
            Components.showToast('Failed to initialize application', 'error');
        } finally {
            // Hide loading screen
            Components.hideLoading();
        }
    },
    
    /**
     * Validate configuration
     * @returns {boolean} Is valid
     */
    validateConfig() {
        if (!window.CONFIG) {
            console.error('Configuration not loaded');
            return false;
        }
        
        if (CONFIG.SUPABASE_URL === 'YOUR_SUPABASE_URL') {
            console.error('Supabase URL not configured');
            this.showConfigError();
            return false;
        }
        
        if (CONFIG.SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
            console.error('Supabase key not configured');
            this.showConfigError();
            return false;
        }
        
        return true;
    },
    
    /**
     * Show configuration error message
     */
    showConfigError() {
        document.body.innerHTML = `
            <div class="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div class="bg-slate-800 rounded-xl p-8 max-w-md text-center">
                    <div class="w-16 h-16 mx-auto bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                    </div>
                    <h2 class="text-xl font-bold text-white mb-2">Configuration Required</h2>
                    <p class="text-slate-400 mb-4">Please configure your Supabase credentials in <code class="text-blue-400">js/config.js</code></p>
                    <div class="bg-slate-700 rounded-lg p-4 text-left">
                        <code class="text-sm text-slate-300">
                            const SUPABASE_URL = 'your-url';<br>
                            const SUPABASE_ANON_KEY = 'your-key';
                        </code>
                    </div>
                </div>
            </div>
        `;
    },
    
    /**
     * Initialize Supabase client
     */
    initSupabase() {
        if (window.supabase) return; // Already initialized
        
        window.supabase = supabase.createClient(
            CONFIG.SUPABASE_URL,
            CONFIG.SUPABASE_ANON_KEY
        );
        
        // console.log('📦 Supabase client initialized');
    },
    
    // ===========================================
    // COMMON DATA
    // ===========================================
    
    // Cached lookup data
    departments: [],
    locations: [],
    categories: [],
    
    /**
     * Load common lookup data
     */
    async loadCommonData() {
        try {
            // Load all in parallel
            const [deptResult, locResult, catResult] = await Promise.all([
                window.supabase.from('departments').select('*').order('name'),
                window.supabase.from('locations').select('*').order('name'),
                window.supabase.from('categories').select('*').order('name')
            ]);
            
            this.departments = deptResult.data || [];
            this.locations = locResult.data || [];
            this.categories = catResult.data || [];
            
            // console.log('📊 Common data loaded');
            
        } catch (error) {
            console.error('Load common data error:', error);
        }
    },
    
    /**
     * Get department by ID
     * @param {string} id - Department ID
     * @returns {object|null} Department
     */
    getDepartment(id) {
        return this.departments.find(d => d.id === id) || null;
    },
    
    /**
     * Get location by ID
     * @param {string} id - Location ID
     * @returns {object|null} Location
     */
    getLocation(id) {
        return this.locations.find(l => l.id === id) || null;
    },
    
    /**
     * Get category by ID
     * @param {string} id - Category ID
     * @returns {object|null} Category
     */
    getCategory(id) {
        return this.categories.find(c => c.id === id) || null;
    },
    
    // ===========================================
    // NAVIGATION
    // ===========================================
    
    /**
     * Get current page name
     * @returns {string} Page name
     */
    getCurrentPage() {
        const path = window.location.pathname;
        return path.split('/').pop() || 'index.html';
    },
    
    /**
     * Setup navigation sidebar
     */
    setupNavigation() {
        const currentPage = this.getCurrentPage();
        
        // Highlight current nav item
        Utils.qsa('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active', 'bg-slate-700');
            } else {
                link.classList.remove('active', 'bg-slate-700');
            }
        });
        
        // Mobile menu toggle
        const menuToggle = Utils.$('menu-toggle');
        const sidebar = Utils.$('sidebar');
        const overlay = Utils.$('sidebar-overlay');
        
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('-translate-x-full');
                overlay?.classList.toggle('hidden');
            });
            
            overlay?.addEventListener('click', () => {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
            });
        }
        
        // Notification dropdown
        const notifBtn = Utils.$('notification-btn');
        const notifDropdown = Utils.$('notification-dropdown');
        
        if (notifBtn && notifDropdown) {
            notifBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notifDropdown.classList.toggle('hidden');
                if (!notifDropdown.classList.contains('hidden')) {
                    Notifications.renderDropdown(notifDropdown);
                }
            });
            
            document.addEventListener('click', () => {
                notifDropdown.classList.add('hidden');
            });
        }
        
        // User menu dropdown
        const userBtn = Utils.$('user-menu-btn');
        const userDropdown = Utils.$('user-dropdown');
        
        if (userBtn && userDropdown) {
            userBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('hidden');
            });
            
            document.addEventListener('click', () => {
                userDropdown.classList.add('hidden');
            });
        }
        
        // Logout button
        Utils.qsa('.logout-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const confirmed = await Components.confirm('Are you sure you want to log out?');
                if (confirmed) {
                    await Auth.signOut();
                    window.location.href = 'index.html';
                }
            });
        });
    },
    
    // ===========================================
    // THEME MANAGEMENT
    // ===========================================
    
    /**
     * Initialize theme
     */
    initTheme() {
        const savedTheme = Utils.storage.get('m88_theme', 'dark');
        this.setTheme(savedTheme);
        
        // Theme toggle button
        const themeToggle = Utils.$('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
                this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
            });
        }
    },
    
    /**
     * Set theme
     * @param {string} theme - 'dark' or 'light'
     */
    setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        Utils.storage.set('m88_theme', theme);
        
        // Update toggle icon
        const themeToggle = Utils.$('theme-toggle');
        if (themeToggle) {
            const icon = theme === 'dark' ? 
                '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>' :
                '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>';
            themeToggle.innerHTML = icon;
        }
    },
    
    // ===========================================
    // UTILITY METHODS
    // ===========================================
    
    /**
     * Navigate to a page
     * @param {string} page - Page URL
     * @param {object} params - URL parameters
     */
    navigateTo(page, params = {}) {
        const url = new URL(page, window.location.origin);
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        window.location.href = url.toString();
    },
    
    /**
     * Go back to previous page
     */
    goBack() {
        if (document.referrer && document.referrer.includes(window.location.host)) {
            history.back();
        } else {
            window.location.href = 'dashboard.html';
        }
    },
    
    /**
     * Refresh current page data
     */
    async refresh() {
        Components.showLoading();
        
        // Reload common data
        await this.loadCommonData();
        
        // Trigger page-specific refresh
        if (typeof window.refreshPage === 'function') {
            await window.refreshPage();
        }
        
        Components.hideLoading();
        Components.showToast('Data refreshed', 'success');
    }
};

// Export for use in other modules
window.App = App;

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
