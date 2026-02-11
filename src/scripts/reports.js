/**
 * ============================================
 * REPORTS MODULE
 * Madison 88 IT Equipment Inventory System
 * ============================================
 * 
 * Report generation and display.
 */

const Reports = {
    // Current report type
    currentReport: null,
    currentData: null,
    
    // ===========================================
    // REPORT TYPES
    // ===========================================
    
    reportTypes: {
        'asset-master': {
            title: 'Asset Master List',
            description: 'Complete list of all active IT assets',
            icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>`,
            generate: async () => await Reports.generateAssetMaster()
        },
        'employee-assignments': {
            title: 'Employee Assignments',
            description: 'Assets assigned to each employee',
            icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`,
            generate: async () => await Reports.generateEmployeeAssignments()
        },
        'warranty': {
            title: 'Warranty Expiry',
            description: 'Assets with warranties expiring within 90 days',
            icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            generate: async () => await Reports.generateWarrantyExpiry()
        },
        'refresh': {
            title: 'Refresh Cycle',
            description: 'Assets 5+ years old due for replacement',
            icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`,
            generate: async () => await Reports.generateRefreshCycle()
        },
        'lost-damaged': {
            title: 'Lost/Damaged Assets',
            description: 'Assets marked as lost or damaged',
            icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`,
            generate: async () => await Reports.generateLostDamaged()
        },
        'maintenance': {
            title: 'Maintenance History',
            description: 'All maintenance and repair records',
            icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
            generate: async () => await Reports.generateMaintenance()
        },
        'licenses': {
            title: 'Software Licenses',
            description: 'All software licenses and their assignments',
            icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`,
            generate: async () => await Reports.generateLicenses()
        },
        'decommissioned': {
            title: 'Decommissioned Assets',
            description: 'Assets that have been decommissioned',
            icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>`,
            generate: async () => await Reports.generateDecommissioned()
        }
    },
    
    // ===========================================
    // INITIALIZATION
    // ===========================================
    
    /**
     * Initialize reports page
     */
    init() {
        this.renderReportCards();
        this.attachEventListeners();
        
        // Check for report parameter in URL
        const params = Utils.getUrlParams();
        if (params.report && this.reportTypes[params.report]) {
            this.selectReport(params.report);
        }
    },
    
    /**
     * Render report selection cards
     */
    renderReportCards() {
        const container = Utils.$('report-cards');
        if (!container) return;
        
        const cards = Object.entries(this.reportTypes).map(([key, report]) => `
            <div class="report-card bg-slate-800 rounded-xl p-6 cursor-pointer hover:bg-slate-700 transition-colors border border-slate-700 hover:border-blue-500"
                 data-report="${key}">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400">
                        ${report.icon}
                    </div>
                    <div>
                        <h3 class="font-medium text-white">${report.title}</h3>
                        <p class="text-sm text-slate-400">${report.description}</p>
                    </div>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = cards;
    },
    
    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Report card selection
        Utils.qsa('.report-card').forEach(card => {
            card.addEventListener('click', () => {
                const reportKey = card.dataset.report;
                this.selectReport(reportKey);
            });
        });
        
        // Export buttons
        Utils.$('export-excel')?.addEventListener('click', () => {
            if (this.currentReport) {
                this.exportCurrent('excel');
            }
        });
        
        Utils.$('export-pdf')?.addEventListener('click', () => {
            if (this.currentReport) {
                this.exportCurrent('pdf');
            }
        });
    },
    
    // ===========================================
    // REPORT SELECTION
    // ===========================================
    
    /**
     * Select and generate a report
     * @param {string} reportKey - Report type key
     */
    async selectReport(reportKey) {
        const report = this.reportTypes[reportKey];
        if (!report) return;
        
        // Update URL
        Utils.setUrlParams({ report: reportKey });
        
        // Highlight selected card
        Utils.qsa('.report-card').forEach(card => {
            card.classList.remove('border-blue-500', 'bg-slate-700');
            card.classList.add('border-slate-700');
            
            if (card.dataset.report === reportKey) {
                card.classList.add('border-blue-500', 'bg-slate-700');
            }
        });
        
        // Show report section
        const reportSection = Utils.$('report-output');
        if (reportSection) {
            reportSection.classList.remove('hidden');
        }
        
        // Update title
        const titleEl = Utils.$('report-title');
        if (titleEl) {
            titleEl.textContent = report.title;
        }
        
        // Generate report
        this.currentReport = reportKey;
        Components.showSpinner(Utils.$('report-content'));
        
        await report.generate();
    },
    
    // ===========================================
    // REPORT GENERATORS
    // ===========================================
    
    /**
     * Generate Asset Master List report
     */
    async generateAssetMaster() {
        try {
            const { data, error } = await window.supabase
                .from('assets')
                .select(`
                    *,
                    category:categories(name),
                    department:departments(name)
                `)
                .neq('status', 'decommissioned')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            
            this.currentData = data;
            
            const columns = [
                { key: 'asset_tag', label: 'Asset Tag' },
                { key: 'serial_number', label: 'Serial Number' },
                { key: 'category', label: 'Category', render: (v, row) => row.category?.name || '-' },
                { key: 'brand', label: 'Brand' },
                { key: 'model', label: 'Model' },
                { key: 'department', label: 'Department', render: (v, row) => row.department?.name || '-' },
                { key: 'status', label: 'Status', render: (v) => Components.statusBadge(v) },
                { key: 'purchase_date', label: 'Purchase Date', render: (v) => Utils.formatDate(v) }
            ];
            
            this.renderTable(data, columns);
            
        } catch (error) {
            console.error('Generate asset master error:', error);
            this.showError(error.message);
        }
    },
    
    /**
     * Generate Employee Assignments report
     */
    async generateEmployeeAssignments() {
        try {
            const result = await Assignments.getActiveAssignmentsReport();
            
            if (!result.success) throw new Error(result.error);
            
            this.currentData = result.data;
            
            const columns = [
                { key: 'employee', label: 'Employee', render: (v, row) => row.employee?.full_name || '-' },
                { key: 'employee_id', label: 'Employee ID', render: (v, row) => row.employee?.employee_id || '-' },
                { key: 'department', label: 'Department', render: (v, row) => row.employee?.department?.name || '-' },
                { key: 'location', label: 'Location', render: (v, row) => row.employee?.location?.name || '-' },
                { key: 'asset', label: 'Asset', render: (v, row) => `${row.asset?.brand || ''} ${row.asset?.model || ''}`.trim() || '-' },
                { key: 'serial', label: 'Serial Number', render: (v, row) => row.asset?.serial_number || '-' },
                { key: 'category', label: 'Category', render: (v, row) => row.asset?.category?.name || '-' },
                { key: 'assigned_date', label: 'Assigned', render: (v) => Utils.formatDate(v) }
            ];
            
            this.renderTable(result.data, columns);
            
        } catch (error) {
            console.error('Generate employee assignments error:', error);
            this.showError(error.message);
        }
    },
    
    /**
     * Generate Warranty Expiry report
     */
    async generateWarrantyExpiry() {
        try {
            const { data, error } = await window.supabase
                .from('v_warranty_expiring')
                .select('*')
                .order('warranty_end_date');
            
            if (error) throw error;
            
            this.currentData = data;
            
            const columns = [
                { key: 'asset_tag', label: 'Asset Tag' },
                { key: 'serial_number', label: 'Serial Number' },
                { key: 'category_name', label: 'Category' },
                { key: 'brand', label: 'Brand' },
                { key: 'model', label: 'Model' },
                { key: 'warranty_end_date', label: 'Warranty End', render: (v) => Utils.formatDate(v) },
                { key: 'days_until_expiry', label: 'Days Left', render: (v) => {
                    const color = v <= 30 ? 'text-red-400' : v <= 60 ? 'text-yellow-400' : 'text-green-400';
                    return `<span class="${color} font-medium">${v} days</span>`;
                }}
            ];
            
            this.renderTable(data, columns);
            
        } catch (error) {
            console.error('Generate warranty expiry error:', error);
            this.showError(error.message);
        }
    },
    
    /**
     * Generate Refresh Cycle report
     */
    async generateRefreshCycle() {
        try {
            const { data, error } = await window.supabase
                .from('v_assets_refresh_due')
                .select('*')
                .order('purchase_date');
            
            if (error) throw error;
            
            this.currentData = data;
            
            const columns = [
                { key: 'asset_tag', label: 'Asset Tag' },
                { key: 'serial_number', label: 'Serial Number' },
                { key: 'category_name', label: 'Category' },
                { key: 'brand', label: 'Brand' },
                { key: 'model', label: 'Model' },
                { key: 'department_name', label: 'Department' },
                { key: 'purchase_date', label: 'Purchase Date', render: (v) => Utils.formatDate(v) },
                { key: 'years_old', label: 'Years Old', render: (v) => `<span class="text-red-400 font-medium">${v} years</span>` },
                { key: 'status', label: 'Status', render: (v) => Components.statusBadge(v) }
            ];
            
            this.renderTable(data, columns);
            
        } catch (error) {
            console.error('Generate refresh cycle error:', error);
            this.showError(error.message);
        }
    },
    
    /**
     * Generate Lost/Damaged report
     */
    async generateLostDamaged() {
        try {
            const { data, error } = await window.supabase
                .from('assets')
                .select(`
                    *,
                    category:categories(name),
                    department:departments(name)
                `)
                .in('status', ['lost', 'damaged'])
                .order('updated_at', { ascending: false });
            
            if (error) throw error;
            
            this.currentData = data;
            
            const columns = [
                { key: 'asset_tag', label: 'Asset Tag' },
                { key: 'serial_number', label: 'Serial Number' },
                { key: 'category', label: 'Category', render: (v, row) => row.category?.name || '-' },
                { key: 'brand', label: 'Brand' },
                { key: 'model', label: 'Model' },
                { key: 'department', label: 'Department', render: (v, row) => row.department?.name || '-' },
                { key: 'status', label: 'Status', render: (v) => Components.statusBadge(v) },
                { key: 'notes', label: 'Notes', render: (v) => Utils.truncate(v, 30) }
            ];
            
            this.renderTable(data, columns);
            
        } catch (error) {
            console.error('Generate lost/damaged error:', error);
            this.showError(error.message);
        }
    },
    
    /**
     * Generate Maintenance report
     */
    async generateMaintenance() {
        try {
            const result = await Maintenance.getReport();
            
            if (!result.success) throw new Error(result.error);
            
            this.currentData = result.data;
            
            const columns = [
                { key: 'asset_tag', label: 'Asset Tag' },
                { key: 'serial_number', label: 'Serial Number' },
                { key: 'category_name', label: 'Category' },
                { key: 'issue_description', label: 'Issue', render: (v) => Utils.truncate(v, 30) },
                { key: 'vendor', label: 'Vendor' },
                { key: 'status', label: 'Status', render: (v) => Components.statusBadge(v, 'maintenance') },
                { key: 'start_date', label: 'Start', render: (v) => Utils.formatDate(v) },
                { key: 'end_date', label: 'End', render: (v) => Utils.formatDate(v) },
                { key: 'cost', label: 'Cost', render: (v) => v ? Utils.formatCurrency(v) : '-' }
            ];
            
            this.renderTable(result.data, columns);
            
        } catch (error) {
            console.error('Generate maintenance error:', error);
            this.showError(error.message);
        }
    },
    
    /**
     * Generate Software Licenses report
     */
    async generateLicenses() {
        try {
            const { data, error } = await window.supabase
                .from('software_licenses')
                .select('*')
                .order('name');
            
            if (error) throw error;
            
            // Get used seats for each license
            for (const license of data) {
                license.used_seats = await Licenses.getUsedSeats(license.id);
            }
            
            this.currentData = data;
            
            const columns = [
                { key: 'name', label: 'License Name' },
                { key: 'vendor', label: 'Vendor' },
                { key: 'license_key', label: 'License Key', render: (v) => v ? Utils.truncate(v, 20) : '-' },
                { key: 'seats', label: 'Seats', render: (v, row) => `${row.used_seats || 0} / ${v}` },
                { key: 'purchase_date', label: 'Purchase', render: (v) => Utils.formatDate(v) },
                { key: 'expiry_date', label: 'Expiry', render: (v) => {
                    const days = Utils.daysUntil(v);
                    const color = days <= 0 ? 'text-red-400' : days <= 30 ? 'text-yellow-400' : 'text-slate-300';
                    return `<span class="${color}">${Utils.formatDate(v)}</span>`;
                }},
                { key: 'cost', label: 'Cost', render: (v) => v ? Utils.formatCurrency(v) : '-' }
            ];
            
            this.renderTable(data, columns);
            
        } catch (error) {
            console.error('Generate licenses error:', error);
            this.showError(error.message);
        }
    },
    
    /**
     * Generate Decommissioned Assets report
     */
    async generateDecommissioned() {
        try {
            const { data, error } = await window.supabase
                .from('assets')
                .select(`
                    *,
                    category:categories(name),
                    department:departments(name)
                `)
                .eq('status', 'decommissioned')
                .order('updated_at', { ascending: false });
            
            if (error) throw error;
            
            this.currentData = data;
            
            const columns = [
                { key: 'asset_tag', label: 'Asset Tag' },
                { key: 'serial_number', label: 'Serial Number' },
                { key: 'category', label: 'Category', render: (v, row) => row.category?.name || '-' },
                { key: 'brand', label: 'Brand' },
                { key: 'model', label: 'Model' },
                { key: 'department', label: 'Department', render: (v, row) => row.department?.name || '-' },
                { key: 'purchase_date', label: 'Purchase Date', render: (v) => Utils.formatDate(v) },
                { key: 'updated_at', label: 'Decommissioned', render: (v) => Utils.formatDate(v) },
                { key: 'notes', label: 'Reason', render: (v) => Utils.truncate(v, 30) }
            ];
            
            this.renderTable(data, columns);
            
        } catch (error) {
            console.error('Generate decommissioned error:', error);
            this.showError(error.message);
        }
    },
    
    // ===========================================
    // RENDERING
    // ===========================================
    
    /**
     * Render data table
     * @param {object[]} data - Table data
     * @param {object[]} columns - Column definitions
     */
    renderTable(data, columns) {
        const container = Utils.$('report-content');
        if (!container) return;
        
        // Update record count
        const countEl = Utils.$('report-count');
        if (countEl) {
            countEl.textContent = `${data.length} records`;
        }
        
        // Show export buttons
        const exportButtons = Utils.$('export-buttons');
        if (exportButtons) {
            exportButtons.classList.remove('hidden');
        }
        
        // Render table
        container.innerHTML = Components.dataTable({
            columns,
            data,
            emptyMessage: 'No records found for this report'
        });
    },
    
    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        const container = Utils.$('report-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="text-center py-12">
                <div class="w-16 h-16 mx-auto bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                </div>
                <p class="text-red-400">${message}</p>
            </div>
        `;
    },
    
    // ===========================================
    // EXPORT
    // ===========================================
    
    /**
     * Export current report
     * @param {string} format - 'excel' or 'pdf'
     */
    async exportCurrent(format) {
        if (!this.currentReport || !this.currentData) {
            Components.showToast('No report data to export', 'warning');
            return;
        }
        
        const report = this.reportTypes[this.currentReport];
        const filename = report.title.replace(/\s+/g, '_');
        
        // Use Export module methods based on report type
        switch (this.currentReport) {
            case 'asset-master':
                await Export.assetMasterList(format);
                break;
            case 'employee-assignments':
                await Export.employeeAssignments(format);
                break;
            case 'warranty':
                await Export.warrantyExpiry(format);
                break;
            case 'refresh':
                await Export.refreshCycle(format);
                break;
            case 'lost-damaged':
                await Export.lostDamagedAssets(format);
                break;
            case 'maintenance':
                await Export.maintenanceReport(format);
                break;
            default:
                // Generic export
                if (format === 'excel') {
                    Export.toExcel(this.currentData, filename);
                } else {
                    Export.toPDF(this.currentData, filename, { title: report.title });
                }
        }
    }
};

// Export for use in other modules
window.Reports = Reports;
