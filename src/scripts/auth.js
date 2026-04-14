/**
 * ============================================
 * AUTHENTICATION MODULE
 * Madison 88 IT Equipment Inventory System
 * ============================================
 * 
 * Handles user authentication with Supabase.
 */

const Auth = {
    // Current user data
    user: null,
    profile: null,
    userRoles: [],
    userRegionIds: [],
    userRegions: [],
    _initialized: false,
    
    // ===========================================
    // INITIALIZATION
    // ===========================================
    
    /**
     * Initialize authentication
     * Sets up auth state listener
     */
    async init() {
        if (this._initialized) {
            this._syncSessionManager();
            return !!this.user;
        }

        if (!window.supabase?.auth) {
            return false;
        }

        this._initialized = true;

        try {
            // Listen for auth state changes
            window.supabase.auth.onAuthStateChange(async (event, session) => {
                // console.log('Auth state changed:', event);
                
                if (event === 'SIGNED_IN' && session) {
                    this.user = session.user;
                    await this.loadUserProfile();
                    this._syncSessionManager(session);
                    this.handleAuthenticatedUser();
                } else if (event === 'SIGNED_OUT') {
                    this.user = null;
                    this.profile = null;
                    this._syncSessionManager(null);
                    this.handleUnauthenticatedUser();
                }
            });
            
            // Check current session
            const { data: { session } } = await window.supabase.auth.getSession();
            
            if (session) {
                this.user = session.user;
                await this.loadUserProfile();
                this._syncSessionManager(session);
                return true;
            }

            this._syncSessionManager(null);
            
            return false;
        } catch (error) {
            this._initialized = false;
            console.error('Auth init error:', error);
            return false;
        }
    },

    /**
     * Keep SessionManager state aligned with auth state on protected pages.
     * @param {object|null} session - Optional Supabase session
     */
    _syncSessionManager(session = null) {
        if (!window.SessionManager) return;

        const publicPages = ['index.html', 'reset-password.html', 'set-password.html'];
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const isPublicPage = publicPages.includes(currentPage);

        const hasSession = !!(session?.user || this.user);

        if (isPublicPage || !hasSession) {
            SessionManager.stop();
            return;
        }

        SessionManager.start();
    },
    
    // ===========================================
    // AUTHENTICATION METHODS
    // ===========================================
    
    /**
     * Sign in with email and password
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {object} Result object
     */
    async signIn(email, password) {
        try {
            const { data, error } = await window.supabase.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) throw error;
            
            this.user = data.user;
            await this.loadUserProfile();
            
            // Log audit
            await Audit.log('LOGIN', 'user_profiles', this.user.id);
            
            return { success: true, user: data.user };
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Sign out current user
     * @returns {object} Result object
     */
    async signOut() {
        try {
            // Log audit before signing out
            if (this.user) {
                await Audit.log('LOGOUT', 'user_profiles', this.user.id);
            }
            
            const { error } = await window.supabase.auth.signOut();
            
            if (error) throw error;
            
            this.user = null;
            this.profile = null;
            Utils.storage.remove('m88_user_profile');
            
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Request password reset
     * @param {string} email - User email
     * @returns {object} Result object
     */
    async resetPassword(email) {
        try {
            const { error } = await window.supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/src/pages/set-password.html`
            });
            
            if (error) throw error;
            
            return { success: true };
        } catch (error) {
            console.error('Password reset error:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Update password
     * @param {string} newPassword - New password
     * @returns {object} Result object
     */
    async updatePassword(newPassword) {
        try {
            const { error } = await window.supabase.auth.updateUser({
                password: newPassword
            });
            
            if (error) throw error;
            
            return { success: true };
        } catch (error) {
            console.error('Update password error:', error);
            return { success: false, error: error.message };
        }
    },
    
    // ===========================================
    // USER PROFILE
    // ===========================================
    
    /**
     * Load user profile from database
     */
    async loadUserProfile() {
        if (!this.user) return null;
        
        try {
            const { data, error } = await window.supabase
                .from('user_profiles')
                .select(`
                    *,
                    department:departments(id, name),
                    region:regions(id, name, code, country)
                `)
                .eq('id', this.user.id)
                .single();
            
            if (error) {
                // Profile doesn't exist, might be first login
                console.warn('Profile not found, user may need setup');
                return null;
            }
            
            this.profile = data;
            Utils.storage.set('m88_user_profile', data);
            
            // Load junction table data (roles and regions)
            await this.loadJunctionData();
            
            return data;
        } catch (error) {
            console.error('Load profile error:', error);
            return null;
        }
    },

    /**
     * Load user roles and regions from junction tables
     */
    async loadJunctionData() {
        if (!this.user) return;
        try {
            const [rolesRes, regionsRes] = await Promise.all([
                window.supabase.from('user_roles').select('role').eq('user_id', this.user.id),
                window.supabase.from('user_regions').select('region_id, region:regions(id, name, code)').eq('user_id', this.user.id)
            ]);
            this.userRoles = (rolesRes.data || []).map(r => r.role);
            this.userRegions = (regionsRes.data || []).map(r => r.region);
            this.userRegionIds = this.userRegions.map(r => r.id);
            // Fallback to legacy columns
            if (this.userRoles.length === 0 && this.profile?.role) {
                this.userRoles = [this.profile.role];
            }
            if (this.userRegionIds.length === 0 && this.profile?.region_id) {
                this.userRegionIds = [this.profile.region_id];
            }
        } catch (e) {
            console.warn('Junction table load failed, using legacy columns:', e);
            if (this.profile?.role) this.userRoles = [this.profile.role];
            if (this.profile?.region_id) this.userRegionIds = [this.profile.region_id];
        }
    },
    
    /**
     * Create user profile (for new users)
     * @param {object} profileData - Profile data
     * @returns {object} Result object
     */
    async createProfile(profileData) {
        if (!this.user) {
            return { success: false, error: 'No authenticated user' };
        }
        
        try {
            const { data, error } = await window.supabase
                .from('user_profiles')
                .insert({
                    id: this.user.id,
                    email: this.user.email,
                    full_name: profileData.full_name,
                    role: profileData.role || 'viewer',
                    department_id: profileData.department_id
                })
                .select()
                .single();
            
            if (error) throw error;
            
            this.profile = data;
            return { success: true, profile: data };
        } catch (error) {
            console.error('Create profile error:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Update user profile
     * @param {object} updates - Profile updates
     * @returns {object} Result object
     */
    async updateProfile(updates) {
        if (!this.user) {
            return { success: false, error: 'No authenticated user' };
        }
        
        try {
            const { data, error } = await window.supabase
                .from('user_profiles')
                .update(updates)
                .eq('id', this.user.id)
                .select()
                .single();
            
            if (error) throw error;
            
            this.profile = data;
            Utils.storage.set('m88_user_profile', data);
            
            return { success: true, profile: data };
        } catch (error) {
            console.error('Update profile error:', error);
            return { success: false, error: error.message };
        }
    },
    
    // ===========================================
    // AUTHORIZATION HELPERS
    // ===========================================
    
    /**
     * Check if user is authenticated
     * @returns {boolean} Is authenticated
     */
    isAuthenticated() {
        return !!this.user;
    },
    
    /**
     * Check if user has a specific role
     * @param {string|string[]} roles - Role(s) to check
     * @returns {boolean} Has role
     */
    hasRole(roles) {
        if (!this.profile) return false;
        
        const roleArray = Array.isArray(roles) ? roles : [roles];
        // Check junction table roles first, fall back to profile.role
        const effectiveRoles = this.userRoles.length > 0 ? this.userRoles : [this.profile.role];
        return roleArray.some(r => effectiveRoles.includes(r));
    },

    /**
     * Check if user has both executive and admin roles (exec+admin dual role)
     * @returns {boolean}
     */
    isExecAdmin() {
        const roles = this.userRoles.length > 0 ? this.userRoles : [this.profile?.role];
        return roles.includes('executive') && roles.includes('admin');
    },
    
    /**
     * Check if user is admin
     * @returns {boolean} Is admin
     */
    isAdmin() {
        return this.hasRole('admin');
    },
    
    /**
     * Check if user is executive
     * @returns {boolean} Is executive
     */
    isExecutive() {
        return this.hasRole('executive');
    },
    
    /**
     * Check if user is admin or executive
     * @returns {boolean} Is admin or above
     */
    isAdminOrAbove() {
        return this.hasRole(['executive', 'admin']);
    },
    
    /**
     * Check if user can edit (admin, executive, or IT staff)
     * @returns {boolean} Can edit
     */
    canEdit() {
        return this.hasRole(['executive', 'admin', 'it_staff']);
    },
    
    /**
     * Check if user is viewer only
     * @returns {boolean} Is viewer
     */
    isViewer() {
        return this.hasRole('viewer');
    },
    
    /**
     * Get current user's role level
     * @returns {number} Role level (1-4)
     */
    getRoleLevel() {
        if (!this.profile) return 0;
        return CONFIG.USER_ROLES[this.profile.role]?.level || 0;
    },
    
    /**
     * Get current user's region ID
     * @returns {string|null} Region UUID, or null for executives (all regions)
     */
    getRegionId() {
        if (!this.profile) return null;
        return this.profile.region_id || null;
    },
    
    /**
     * Get current user's region info
     * @returns {object|null} Region object with id, name, code, country
     */
    getRegion() {
        if (!this.profile) return null;
        return this.profile.region || null;
    },
    
    /**
     * Check if user has access to all regions (executive)
     * @returns {boolean} Has all-region access
     */
    hasAllRegionAccess() {
        // Executive and exec+admin both have all-region viewing access (dashboard, reports)
        // For admin operations, exec+admin uses their assigned region via getRegionId()
        return this.isExecutive() || !this.profile?.region_id;
    },
    
    /**
     * Get the effective region ID for data queries.
     * - Executive: uses the globally selected region (window.selectedRegionId), null = all regions
     * - Admin/IT Staff/Viewer: uses their assigned region_id
     * @returns {string|null} Region UUID or null (null means all/no filter)
     */
    getEffectiveRegionId() {
        if (this.isExecutive()) {
            // Executive uses the dashboard/page region selector
            return window.selectedRegionId || null;
        }
        return this.getRegionId();
    },

    /**
     * Apply region filter to a Supabase query.
     * If regionId is null, no filter is applied (show all).
     * @param {object} query - Supabase query builder
     * @param {string|null} regionId - Region UUID to filter by
     * @param {string} column - Column name for region_id (default: 'region_id')
     * @returns {object} Filtered query
     */
    applyRegionFilter(query, regionId = null, column = 'region_id') {
        const effectiveRegion = regionId !== undefined ? regionId : this.getEffectiveRegionId();
        if (effectiveRegion) {
            return query.eq(column, effectiveRegion);
        }
        return query;
    },

    // ===========================================
    // NAVIGATION HANDLERS
    // ===========================================
    
    /**
     * Handle authenticated user navigation
     */
    handleAuthenticatedUser() {
        // If on login page, redirect to dashboard
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
            window.location.href = 'dashboard.html';
        }
    },
    
    /**
     * Handle unauthenticated user navigation
     */
    handleUnauthenticatedUser() {
        // If not on login page, redirect to login
        const publicPages = ['index.html', 'reset-password.html', 'set-password.html'];
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        if (!publicPages.includes(currentPage)) {
            window.location.href = 'index.html';
        }
    },
    
    /**
     * Require authentication for page
     * Call this at the start of protected pages
     */
    async requireAuth() {
        const isAuth = await this.init();
        
        if (!isAuth) {
            window.location.href = 'index.html';
            return false;
        }
        
        return true;
    },
    
    /**
     * Require specific role(s) for page
     * @param {string|string[]} roles - Required role(s)
     */
    async requireRole(roles) {
        const isAuth = await this.requireAuth();
        if (!isAuth) return false;
        
        if (!this.hasRole(roles)) {
            Components.showToast('You do not have permission to access this page', 'error');
            window.location.href = 'dashboard.html';
            return false;
        }
        
        return true;
    },
    
    // ===========================================
    // UI HELPERS
    // ===========================================
    
    /**
     * Get user display name
     * @returns {string} Display name
     */
    getDisplayName() {
        if (this.profile) return this.profile.full_name;
        if (this.user) return this.user.email;
        return 'Guest';
    },
    
    /**
     * Get user initials for avatar
     * @returns {string} Initials
     */
    getInitials() {
        const name = this.getDisplayName();
        const parts = name.split(' ');
        
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        
        return name.substring(0, 2).toUpperCase();
    },
    
    /**
     * Update UI elements with user info
     */
    updateUserUI() {
        // Update user name displays
        Utils.qsa('.user-name').forEach(el => {
            el.textContent = this.getDisplayName();
        });
        
        // Update user email displays
        Utils.qsa('.user-email').forEach(el => {
            el.textContent = this.user?.email || '';
        });
        
        // Update user avatar/initials
        Utils.qsa('.user-initials').forEach(el => {
            el.textContent = this.getInitials();
        });
        
        // Update role badges
        Utils.qsa('.user-role').forEach(el => {
            el.innerHTML = Components.roleBadge(this.profile?.role || 'viewer');
        });
        
        // Show/hide elements based on role
        Utils.qsa('[data-require-role]').forEach(el => {
            const requiredRoles = el.dataset.requireRole.split(',');
            if (this.hasRole(requiredRoles)) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });
        
        // Show elements for edit capability
        Utils.qsa('[data-require-edit]').forEach(el => {
            if (this.canEdit()) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });
        
        // Hide elements for viewers
        Utils.qsa('[data-hide-viewer]').forEach(el => {
            if (this.isViewer()) {
                el.classList.add('hidden');
            }
        });
    }
};

// Export for use in other modules
window.Auth = Auth;

// =============================================================
// SESSION MANAGER
// Handles idle timeout
// =============================================================

const SessionManager = {
    // Idle timeout in milliseconds (1 minute)
    IDLE_TIMEOUT: 60 * 1000,
    // Warning before logout in milliseconds
    WARNING_BEFORE: 30 * 1000,
    
    _idleTimer: null,
    _warningTimer: null,
    _warningVisible: false,
    _countdownInterval: null,
    _started: false,

    /**
     * Start tracking user activity.
     * Call after successful authentication on protected pages.
     */
    start() {
        if (this._started) return;
        this._started = true;

        // Track user activity events
        const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
        activityEvents.forEach(evt => {
            document.addEventListener(evt, () => this._onActivity(), { passive: true });
        });

        // Reset timer on start
        this._resetTimers();
    },

    /**
     * Stop tracking (called on sign-out)
     */
    stop() {
        this._started = false;
        clearTimeout(this._idleTimer);
        clearTimeout(this._warningTimer);
        clearInterval(this._countdownInterval);
        this._dismissWarning();
    },

    /**
     * Called on any user activity
     */
    _onActivity() {
        if (!this._started) return;
        // If warning is visible, dismiss it and reset
        if (this._warningVisible) {
            this._dismissWarning();
        }
        this._resetTimers();
    },

    /**
     * Reset the idle and warning timers
     */
    _resetTimers() {
        clearTimeout(this._idleTimer);
        clearTimeout(this._warningTimer);

        // Show warning before logout (if configured)
        if (this.WARNING_BEFORE > 0) {
            const warningDelay = Math.max(this.IDLE_TIMEOUT - this.WARNING_BEFORE, 0);
            this._warningTimer = setTimeout(() => {
                this._showWarning();
            }, warningDelay);
        }

        // Auto-logout after full timeout
        this._idleTimer = setTimeout(() => {
            this._autoLogout();
        }, this.IDLE_TIMEOUT);
    },

    /**
     * Show idle warning modal with countdown
     */
    _showWarning() {
        if (this._warningVisible) return;
        this._warningVisible = true;

        let secondsLeft = Math.ceil(this.WARNING_BEFORE / 1000);

        // Create warning overlay
        const overlay = document.createElement('div');
        overlay.id = 'idle-warning-overlay';
        overlay.className = 'fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4';
        overlay.innerHTML = `
            <div class="bg-slate-800 rounded-xl shadow-xl max-w-sm w-full p-6 text-center">
                <div class="w-14 h-14 mx-auto bg-yellow-600/20 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-white mb-2">Session Timeout Warning</h3>
                <p class="text-slate-400 mb-1">You have been inactive for a while.</p>
                <p class="text-slate-400 mb-4">You will be logged out in <span id="idle-countdown" class="text-yellow-400 font-bold">${secondsLeft}</span> seconds.</p>
                <button id="idle-stay-btn" class="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors">Stay Logged In</button>
            </div>
        `;
        document.body.appendChild(overlay);

        // Countdown
        this._countdownInterval = setInterval(() => {
            secondsLeft--;
            const el = document.getElementById('idle-countdown');
            if (el) el.textContent = secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(this._countdownInterval);
            }
        }, 1000);

        // "Stay Logged In" button
        document.getElementById('idle-stay-btn')?.addEventListener('click', () => {
            this._dismissWarning();
            this._resetTimers();
        });
    },

    /**
     * Dismiss the warning modal
     */
    _dismissWarning() {
        this._warningVisible = false;
        clearInterval(this._countdownInterval);
        const overlay = document.getElementById('idle-warning-overlay');
        if (overlay) overlay.remove();
    },

    /**
     * Perform automatic logout due to inactivity
     */
    async _autoLogout() {
        this.stop();
        await Auth.signOut();
        // Redirect to login with a message
        window.location.href = 'index.html?reason=idle';
    }
};

window.SessionManager = SessionManager;

// Auto-initialize auth/session sync once Supabase is available.
// Some pages use custom init scripts and never call App.init().
(function bootstrapAuth() {
    const maxAttempts = 100;
    const retryDelayMs = 100;
    let attempts = 0;

    const tryInit = async () => {
        if (Auth._initialized) return;

        if (!window.supabase?.auth) {
            attempts += 1;
            if (attempts < maxAttempts) {
                setTimeout(tryInit, retryDelayMs);
            }
            return;
        }

        try {
            await Auth.init();
        } catch (error) {
            console.error('Auth bootstrap error:', error);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInit, { once: true });
    } else {
        tryInit();
    }
})();
