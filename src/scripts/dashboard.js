/**
 * ============================================
 * DASHBOARD MODULE
 * Madison 88 IT Equipment Inventory System
 * ============================================
 * 
 * Dashboard charts and statistics.
 */

const Dashboard = {
    // Chart instances
    charts: {},
    
    // ===========================================
    // INITIALIZATION
    // ===========================================
    
    /**
     * Initialize dashboard
     */
    async init() {
        console.log('📊 Initializing dashboard...');
        
        try {
            // Load all data in parallel
            const [stats, alerts] = await Promise.all([
                this.loadStatistics(),
                this.loadAlerts()
            ]);
            
            // Render stat cards
            this.renderStatCards(stats);
            
            // Render alerts
            this.renderAlerts(alerts);
            
            // Load and render charts
            await this.initCharts();
            
            // Load recent activity
            await this.loadRecentActivity();
            
            console.log('✅ Dashboard initialized');
        } catch (error) {
            console.error('Dashboard init error:', error);
            Components.showToast('Failed to load dashboard data', 'error');
        }
    },
    
    // ===========================================
    // STATISTICS
    // ===========================================
    
    /**
     * Load dashboard statistics
     * @returns {Promise<object>} Statistics data
     */
    async loadStatistics() {
        const stats = {
            totalAssets: 0,
            assignedAssets: 0,
            availableAssets: 0,
            underRepair: 0,
            totalEmployees: 0,
            expiringWarranty: 0
        };
        
        try {
            // Asset counts by status
            const statuses = ['available', 'assigned', 'under_repair', 'lost', 'damaged'];
            
            for (const status of statuses) {
                const { count } = await window.supabase
                    .from('assets')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', status);
                
                if (status === 'available') stats.availableAssets = count || 0;
                if (status === 'assigned') stats.assignedAssets = count || 0;
                if (status === 'under_repair') stats.underRepair = count || 0;
                
                if (status !== 'decommissioned') {
                    stats.totalAssets += count || 0;
                }
            }
            
            // Total employees
            const { count: empCount } = await window.supabase
                .from('employees')
                .select('*', { count: 'exact', head: true })
                .eq('is_active', true);
            stats.totalEmployees = empCount || 0;
            
            // Expiring warranties
            const { data: warrantyData } = await window.supabase
                .from('v_warranty_expiring')
                .select('id');
            stats.expiringWarranty = warrantyData?.length || 0;
            
        } catch (error) {
            console.error('Load statistics error:', error);
        }
        
        return stats;
    },
    
    /**
     * Render stat cards
     * @param {object} stats - Statistics data
     */
    renderStatCards(stats) {
        const container = Utils.$('stat-cards');
        if (!container) return;
        
        const cards = [
            {
                title: 'Total Assets',
                value: Utils.formatNumber(stats.totalAssets),
                icon: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>`,
                color: 'blue',
                link: 'assets.html'
            },
            {
                title: 'Assigned',
                value: Utils.formatNumber(stats.assignedAssets),
                icon: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>`,
                color: 'green',
                link: 'assignments.html'
            },
            {
                title: 'Available',
                value: Utils.formatNumber(stats.availableAssets),
                icon: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
                color: 'purple',
                link: 'assets.html?status=available'
            },
            {
                title: 'Under Repair',
                value: Utils.formatNumber(stats.underRepair),
                icon: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
                color: 'yellow',
                link: 'maintenance.html'
            }
        ];
        
        container.innerHTML = cards.map(card => Components.statCard(card)).join('');
    },
    
    // ===========================================
    // ALERTS
    // ===========================================
    
    /**
     * Load dashboard alerts
     * @returns {Promise<object[]>} Alerts
     */
    async loadAlerts() {
        return await Notifications.getDashboardAlerts();
    },
    
    /**
     * Render alerts section
     * @param {object[]} alerts - Alert objects
     */
    renderAlerts(alerts) {
        const container = Utils.$('alerts-container');
        if (!container) return;
        
        if (!alerts || alerts.length === 0) {
            container.innerHTML = `
                <div class="text-center py-4 text-slate-400">
                    <svg class="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p class="text-sm">No alerts at this time</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = alerts.map(alert => Components.alertCard(alert)).join('');
        
        // Attach dismiss handlers
        container.querySelectorAll('.alert-dismiss').forEach(btn => {
            btn.addEventListener('click', function() {
                this.closest('.alert-card').remove();
            });
        });
    },
    
    // ===========================================
    // CHARTS
    // ===========================================
    
    /**
     * Initialize all charts
     */
    async initCharts() {
        await Promise.all([
            this.initAssetsByCategory(),
            this.initAssetsByDepartment(),
            this.initAssetsByStatus()
        ]);
    },
    
    /**
     * Initialize assets by category chart
     */
    async initAssetsByCategory() {
        const canvas = Utils.$('chart-by-category');
        if (!canvas) return;
        
        try {
            const result = await Assets.getByCategory();
            if (!result.success) return;
            
            const data = result.data;
            const labels = Object.keys(data);
            const values = Object.values(data);
            
            // Destroy existing chart
            if (this.charts.byCategory) {
                this.charts.byCategory.destroy();
            }
            
            this.charts.byCategory = new Chart(canvas, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: values,
                        backgroundColor: [
                            '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', 
                            '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16',
                            '#f97316', '#6366f1', '#14b8a6'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                color: '#94a3b8',
                                font: { size: 11 },
                                padding: 10
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Category chart error:', error);
        }
    },
    
    /**
     * Initialize assets by department chart
     */
    async initAssetsByDepartment() {
        const canvas = Utils.$('chart-by-department');
        if (!canvas) return;
        
        try {
            const result = await Assets.getByDepartment();
            if (!result.success) return;
            
            const data = result.data;
            const labels = Object.keys(data);
            const values = Object.values(data);
            
            // Destroy existing chart
            if (this.charts.byDepartment) {
                this.charts.byDepartment.destroy();
            }
            
            this.charts.byDepartment = new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Assets',
                        data: values,
                        backgroundColor: '#3b82f6',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: {
                            ticks: { color: '#94a3b8' },
                            grid: { color: '#334155' }
                        },
                        y: {
                            ticks: { color: '#94a3b8' },
                            grid: { display: false }
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Department chart error:', error);
        }
    },
    
    /**
     * Initialize assets by status chart
     */
    async initAssetsByStatus() {
        const canvas = Utils.$('chart-by-status');
        if (!canvas) return;
        
        try {
            const statuses = ['available', 'assigned', 'under_repair', 'lost', 'damaged'];
            const counts = [];
            
            for (const status of statuses) {
                const { count } = await window.supabase
                    .from('assets')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', status);
                counts.push(count || 0);
            }
            
            // Destroy existing chart
            if (this.charts.byStatus) {
                this.charts.byStatus.destroy();
            }
            
            this.charts.byStatus = new Chart(canvas, {
                type: 'pie',
                data: {
                    labels: ['Available', 'Assigned', 'Under Repair', 'Lost', 'Damaged'],
                    datasets: [{
                        data: counts,
                        backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#f97316'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#94a3b8',
                                font: { size: 11 },
                                padding: 15
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Status chart error:', error);
        }
    },
    
    // ===========================================
    // RECENT ACTIVITY
    // ===========================================
    
    /**
     * Load and render recent activity
     */
    async loadRecentActivity() {
        const container = Utils.$('recent-activity');
        if (!container) return;
        
        try {
            const result = await Audit.getActivitySummary(7);
            
            if (!result.success || !result.data.recent.length) {
                container.innerHTML = `
                    <div class="text-center py-8 text-slate-400">
                        <p class="text-sm">No recent activity</p>
                    </div>
                `;
                return;
            }
            
            const activities = result.data.recent.map(log => {
                const action = Audit.formatAction(log.action);
                const table = Audit.formatTableName(log.table_name);
                
                return `
                    <div class="flex items-start gap-3 py-3 border-b border-slate-700 last:border-0">
                        <div class="w-8 h-8 rounded-full bg-${action.color}-600/20 flex items-center justify-center flex-shrink-0">
                            <span class="text-${action.color}-400 text-xs">${action.label.charAt(0)}</span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm text-white">
                                <span class="font-medium">${action.label}</span> ${table}
                            </p>
                            <p class="text-xs text-slate-400">${Utils.getRelativeTime(log.created_at)}</p>
                        </div>
                    </div>
                `;
            }).join('');
            
            container.innerHTML = activities;
        } catch (error) {
            console.error('Load recent activity error:', error);
        }
    },
    
    // ===========================================
    // REFRESH
    // ===========================================
    
    /**
     * Refresh dashboard data
     */
    async refresh() {
        await this.init();
    }
};

// Export for use in other modules
window.Dashboard = Dashboard;

// Page refresh function
window.refreshPage = () => Dashboard.refresh();

// ES Module export - DashboardManager is just an alias for Dashboard
export { Dashboard, Dashboard as DashboardManager };
