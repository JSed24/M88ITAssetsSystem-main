/**
 * ============================================
 * NOTIFICATIONS MODULE
 * Madison 88 IT Equipment Inventory System
 * ============================================
 * 
 * Handles dashboard notifications and alerts.
 */

const Notifications = {
    // Cached notifications
    notifications: [],
    unreadCount: 0,
    
    // ===========================================
    // INITIALIZATION
    // ===========================================
    
    /**
     * Initialize notifications
     */
    async init() {
        await this.loadNotifications();
        this.updateBadge();
        this.checkAlerts();
    },
    
    // ===========================================
    // NOTIFICATION CRUD
    // ===========================================
    
    /**
     * Load user notifications
     */
    async loadNotifications() {
        if (!Auth.user) return;
        
        try {
            const { data, error } = await window.supabase
                .from('notifications')
                .select('*')
                .or(`user_id.eq.${Auth.user.id},user_id.is.null`)
                .order('created_at', { ascending: false })
                .limit(50);
            
            if (error) throw error;
            
            this.notifications = data || [];
            this.unreadCount = this.notifications.filter(n => !n.is_read).length;
            
            return this.notifications;
        } catch (error) {
            console.error('Load notifications error:', error);
            return [];
        }
    },
    
    /**
     * Create a notification
     * @param {object} notification - Notification data
     */
    async create({ title, message, type = 'info', userId = null, link = null }) {
        try {
            const { data, error } = await window.supabase
                .from('notifications')
                .insert({
                    user_id: userId,
                    title,
                    message,
                    type,
                    link,
                    is_read: false
                })
                .select()
                .single();
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('Create notification error:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Mark notification as read
     * @param {string} notificationId - Notification ID
     */
    async markAsRead(notificationId) {
        try {
            const { error } = await window.supabase
                .from('notifications')
                .update({ is_read: true })
                .eq('id', notificationId);
            
            if (error) throw error;
            
            // Update local cache
            const notification = this.notifications.find(n => n.id === notificationId);
            if (notification && !notification.is_read) {
                notification.is_read = true;
                this.unreadCount = Math.max(0, this.unreadCount - 1);
                this.updateBadge();
            }
            
            return { success: true };
        } catch (error) {
            console.error('Mark as read error:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Mark all notifications as read
     */
    async markAllAsRead() {
        if (!Auth.user) return;
        
        try {
            const { error } = await window.supabase
                .from('notifications')
                .update({ is_read: true })
                .or(`user_id.eq.${Auth.user.id},user_id.is.null`)
                .eq('is_read', false);
            
            if (error) throw error;
            
            // Update local cache
            this.notifications.forEach(n => n.is_read = true);
            this.unreadCount = 0;
            this.updateBadge();
            
            return { success: true };
        } catch (error) {
            console.error('Mark all as read error:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Delete a notification
     * @param {string} notificationId - Notification ID
     */
    async delete(notificationId) {
        try {
            const { error } = await window.supabase
                .from('notifications')
                .delete()
                .eq('id', notificationId);
            
            if (error) throw error;
            
            // Update local cache
            const index = this.notifications.findIndex(n => n.id === notificationId);
            if (index > -1) {
                if (!this.notifications[index].is_read) {
                    this.unreadCount = Math.max(0, this.unreadCount - 1);
                }
                this.notifications.splice(index, 1);
                this.updateBadge();
            }
            
            return { success: true };
        } catch (error) {
            console.error('Delete notification error:', error);
            return { success: false, error: error.message };
        }
    },
    
    // ===========================================
    // AUTOMATIC ALERTS
    // ===========================================
    
    /**
     * Check for system alerts
     * Creates notifications for warranties, maintenance, etc.
     */
    async checkAlerts() {
        if (!Auth.canEdit()) return; // Only IT staff and admins see these
        
        await this.checkWarrantyExpiring();
        await this.checkPendingMaintenance();
        await this.checkRefreshDue();
    },
    
    /**
     * Check for expiring warranties
     */
    async checkWarrantyExpiring() {
        try {
            const { data, error } = await window.supabase
                .from('v_warranty_expiring')
                .select('*')
                .limit(10);
            
            if (error) throw error;
            
            if (data && data.length > 0) {
                // Check if we already have a recent warranty notification
                const existingNotification = this.notifications.find(n => 
                    n.title.includes('Warranty') && 
                    new Date(n.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
                );
                
                if (!existingNotification) {
                    await this.create({
                        title: 'Warranties Expiring Soon',
                        message: `${data.length} asset(s) have warranties expiring within 90 days.`,
                        type: 'warning',
                        link: 'reports.html?report=warranty'
                    });
                }
            }
        } catch (error) {
            console.error('Check warranty expiring error:', error);
        }
    },
    
    /**
     * Check for pending maintenance
     */
    async checkPendingMaintenance() {
        try {
            const { data, count, error } = await window.supabase
                .from('maintenance_records')
                .select('*', { count: 'exact' })
                .in('status', ['pending', 'in_progress']);
            
            if (error) throw error;
            
            if (count > 0) {
                const existingNotification = this.notifications.find(n => 
                    n.title.includes('Maintenance') && 
                    new Date(n.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
                );
                
                if (!existingNotification) {
                    await this.create({
                        title: 'Pending Maintenance',
                        message: `${count} asset(s) are currently under repair or pending maintenance.`,
                        type: 'info',
                        link: 'maintenance.html'
                    });
                }
            }
        } catch (error) {
            console.error('Check pending maintenance error:', error);
        }
    },
    
    /**
     * Check for assets due for refresh
     */
    async checkRefreshDue() {
        try {
            const { data, error } = await window.supabase
                .from('v_assets_refresh_due')
                .select('*')
                .limit(10);
            
            if (error) throw error;
            
            if (data && data.length > 0) {
                const existingNotification = this.notifications.find(n => 
                    n.title.includes('Refresh') && 
                    new Date(n.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Weekly
                );
                
                if (!existingNotification) {
                    await this.create({
                        title: 'Assets Due for Refresh',
                        message: `${data.length} asset(s) are 5+ years old and may need replacement.`,
                        type: 'warning',
                        link: 'reports.html?report=refresh'
                    });
                }
            }
        } catch (error) {
            console.error('Check refresh due error:', error);
        }
    },
    
    // ===========================================
    // UI METHODS
    // ===========================================
    
    /**
     * Update notification badge count
     */
    updateBadge() {
        const badges = Utils.qsa('.notification-badge');
        badges.forEach(badge => {
            if (this.unreadCount > 0) {
                badge.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        });
    },
    
    /**
     * Render notifications dropdown
     * @param {HTMLElement} container - Container element
     */
    renderDropdown(container) {
        if (!container) return;
        
        if (this.notifications.length === 0) {
            container.innerHTML = `
                <div class="p-4 text-center text-slate-400">
                    <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                    <p class="text-sm">No notifications</p>
                </div>
            `;
            return;
        }
        
        const notificationsHtml = this.notifications.slice(0, 10).map(n => this.renderNotificationItem(n)).join('');
        
        container.innerHTML = `
            <div class="p-3 border-b border-slate-700 flex items-center justify-between">
                <h4 class="font-medium text-white">Notifications</h4>
                ${this.unreadCount > 0 ? `
                    <button id="mark-all-read" class="text-xs text-blue-400 hover:text-blue-300">
                        Mark all read
                    </button>
                ` : ''}
            </div>
            <div class="max-h-80 overflow-y-auto">
                ${notificationsHtml}
            </div>
            <div class="p-2 border-t border-slate-700 text-center">
                <a href="notifications.html" class="text-sm text-blue-400 hover:text-blue-300">
                    View all notifications
                </a>
            </div>
        `;
        
        // Attach event handlers
        container.querySelector('#mark-all-read')?.addEventListener('click', async () => {
            await this.markAllAsRead();
            this.renderDropdown(container);
        });
        
        container.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', async (e) => {
                const id = item.dataset.id;
                await this.markAsRead(id);
                
                const link = item.dataset.link;
                if (link) {
                    window.location.href = link;
                }
            });
        });
    },
    
    /**
     * Render single notification item
     * @param {object} notification - Notification object
     * @returns {string} HTML string
     */
    renderNotificationItem(notification) {
        const typeConfig = CONFIG.NOTIFICATION_TYPES[notification.type] || CONFIG.NOTIFICATION_TYPES.info;
        const isUnread = !notification.is_read;
        
        return `
            <div class="notification-item p-3 hover:bg-slate-700/50 cursor-pointer ${isUnread ? 'bg-slate-700/30' : ''} transition-colors"
                 data-id="${notification.id}"
                 data-link="${notification.link || ''}">
                <div class="flex gap-3">
                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-${typeConfig.color}-600/20 flex items-center justify-center">
                        <span class="text-${typeConfig.color}-400 text-sm">
                            ${isUnread ? '●' : '○'}
                        </span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-white truncate">${notification.title}</p>
                        <p class="text-xs text-slate-400 truncate">${notification.message}</p>
                        <p class="text-xs text-slate-500 mt-1">${Utils.getRelativeTime(notification.created_at)}</p>
                    </div>
                </div>
            </div>
        `;
    },
    
    /**
     * Get alerts for dashboard display
     * @returns {Promise<object[]>} Alert objects
     */
    async getDashboardAlerts() {
        const alerts = [];
        
        try {
            // Warranty alerts
            const { data: warrantyData } = await window.supabase
                .from('v_warranty_expiring')
                .select('*', { count: 'exact' });
            
            if (warrantyData && warrantyData.length > 0) {
                alerts.push({
                    type: 'warning',
                    title: 'Warranty Expiring',
                    message: `${warrantyData.length} assets have warranties expiring soon`,
                    link: 'reports.html?report=warranty',
                    count: warrantyData.length
                });
            }
            
            // Under repair alerts
            const { count: repairCount } = await window.supabase
                .from('assets')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'under_repair');
            
            if (repairCount > 0) {
                alerts.push({
                    type: 'info',
                    title: 'Under Repair',
                    message: `${repairCount} assets are currently under repair`,
                    link: 'maintenance.html',
                    count: repairCount
                });
            }
            
            // Lost/Damaged alerts
            const { count: lostCount } = await window.supabase
                .from('assets')
                .select('*', { count: 'exact', head: true })
                .in('status', ['lost', 'damaged']);
            
            if (lostCount > 0) {
                alerts.push({
                    type: 'error',
                    title: 'Lost/Damaged',
                    message: `${lostCount} assets are marked as lost or damaged`,
                    link: 'assets.html?status=lost,damaged',
                    count: lostCount
                });
            }
            
            // Refresh due alerts
            const { data: refreshData } = await window.supabase
                .from('v_assets_refresh_due')
                .select('*', { count: 'exact' });
            
            if (refreshData && refreshData.length > 0) {
                alerts.push({
                    type: 'warning',
                    title: 'Refresh Due',
                    message: `${refreshData.length} assets are due for refresh (5+ years old)`,
                    link: 'reports.html?report=refresh',
                    count: refreshData.length
                });
            }
            
        } catch (error) {
            console.error('Get dashboard alerts error:', error);
        }
        
        return alerts;
    }
};

// Export for use in other modules
window.Notifications = Notifications;
