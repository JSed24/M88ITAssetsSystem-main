/**
 * ============================================
 * EXPORT MODULE
 * Madison 88 IT Equipment Inventory System
 * ============================================
 * 
 * Handles Excel and PDF export functionality.
 */

const Export = {
    // ===========================================
    // EXCEL EXPORT
    // ===========================================
    
    /**
     * Export data to Excel
     * @param {object[]} data - Data to export
     * @param {string} filename - Output filename
     * @param {object[]} columns - Column definitions
     */
    toExcel(data, filename, columns = null) {
        try {
            // Transform data if columns specified
            let exportData = data;
            
            if (columns) {
                exportData = data.map(row => {
                    const newRow = {};
                    columns.forEach(col => {
                        const value = col.getValue ? col.getValue(row) : row[col.key];
                        newRow[col.label] = value ?? '';
                    });
                    return newRow;
                });
            }
            
            // Create worksheet
            const worksheet = XLSX.utils.json_to_sheet(exportData);
            
            // Auto-size columns
            const colWidths = [];
            if (exportData.length > 0) {
                const keys = Object.keys(exportData[0]);
                keys.forEach(key => {
                    const maxLength = Math.max(
                        key.length,
                        ...exportData.map(row => String(row[key] || '').length)
                    );
                    colWidths.push({ wch: Math.min(maxLength + 2, 50) });
                });
                worksheet['!cols'] = colWidths;
            }
            
            // Create workbook
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
            
            // Generate filename with date
            const dateStr = new Date().toISOString().split('T')[0];
            const fullFilename = `${filename}_${dateStr}.xlsx`;
            
            // Download
            XLSX.writeFile(workbook, fullFilename);
            
            Components.showToast('Excel file downloaded', 'success');
            
            // Log audit
            Audit.log('EXPORT', 'report', null, null, { 
                format: 'excel', 
                filename: fullFilename, 
                rows: data.length 
            });
            
        } catch (error) {
            console.error('Excel export error:', error);
            Components.showToast('Failed to export Excel file', 'error');
        }
    },
    
    /**
     * Export multiple sheets to Excel
     * @param {object} sheets - Object with sheet names as keys and data arrays as values
     * @param {string} filename - Output filename
     */
    toExcelMultiSheet(sheets, filename) {
        try {
            const workbook = XLSX.utils.book_new();
            
            Object.entries(sheets).forEach(([sheetName, data]) => {
                const worksheet = XLSX.utils.json_to_sheet(data);
                XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
            });
            
            const dateStr = new Date().toISOString().split('T')[0];
            const fullFilename = `${filename}_${dateStr}.xlsx`;
            
            XLSX.writeFile(workbook, fullFilename);
            
            Components.showToast('Excel file downloaded', 'success');
            
        } catch (error) {
            console.error('Multi-sheet Excel export error:', error);
            Components.showToast('Failed to export Excel file', 'error');
        }
    },
    
    // ===========================================
    // PDF EXPORT
    // ===========================================
    
    /**
     * Export data to PDF
     * @param {object[]} data - Data to export
     * @param {string} filename - Output filename
     * @param {object} options - PDF options
     */
    toPDF(data, filename, options = {}) {
        try {
            const {
                title = 'Report',
                columns = null,
                orientation = 'portrait',
                pageSize = 'a4'
            } = options;
            
            // Create PDF document
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                orientation,
                unit: 'mm',
                format: pageSize
            });
            
            // Colors
            const primaryColor = [59, 130, 246]; // Blue
            const headerBg = [30, 41, 59]; // Slate
            const textColor = [255, 255, 255];
            const bodyText = [51, 65, 85];
            
            // Add header
            doc.setFillColor(...headerBg);
            doc.rect(0, 0, doc.internal.pageSize.width, 25, 'F');
            
            doc.setTextColor(...textColor);
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.text(title, 14, 16);
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text(`Generated: ${Utils.formatDate(new Date(), 'long')}`, doc.internal.pageSize.width - 14, 16, { align: 'right' });
            
            // Company name
            doc.setFontSize(8);
            doc.text('Madison 88 IT Assets', 14, 22);
            
            // Prepare table data
            let headers = [];
            let rows = [];
            
            if (columns) {
                headers = columns.map(col => col.label);
                rows = data.map(row => 
                    columns.map(col => {
                        const value = col.getValue ? col.getValue(row) : row[col.key];
                        return String(value ?? '');
                    })
                );
            } else if (data.length > 0) {
                headers = Object.keys(data[0]);
                rows = data.map(row => headers.map(key => String(row[key] ?? '')));
            }
            
            // Add table
            if (rows.length > 0) {
                doc.autoTable({
                    head: [headers],
                    body: rows,
                    startY: 30,
                    theme: 'striped',
                    headStyles: {
                        fillColor: primaryColor,
                        textColor: textColor,
                        fontStyle: 'bold',
                        fontSize: 9
                    },
                    bodyStyles: {
                        textColor: bodyText,
                        fontSize: 8
                    },
                    alternateRowStyles: {
                        fillColor: [241, 245, 249]
                    },
                    margin: { left: 14, right: 14 },
                    didDrawPage: function(data) {
                        // Footer
                        doc.setFontSize(8);
                        doc.setTextColor(100);
                        doc.text(
                            `Page ${data.pageNumber}`,
                            doc.internal.pageSize.width / 2,
                            doc.internal.pageSize.height - 10,
                            { align: 'center' }
                        );
                    }
                });
            } else {
                doc.setTextColor(...bodyText);
                doc.setFontSize(12);
                doc.text('No data to display', 14, 40);
            }
            
            // Generate filename with date
            const dateStr = new Date().toISOString().split('T')[0];
            const fullFilename = `${filename}_${dateStr}.pdf`;
            
            // Download
            doc.save(fullFilename);
            
            Components.showToast('PDF file downloaded', 'success');
            
            // Log audit
            Audit.log('EXPORT', 'report', null, null, { 
                format: 'pdf', 
                filename: fullFilename, 
                rows: data.length 
            });
            
        } catch (error) {
            console.error('PDF export error:', error);
            Components.showToast('Failed to export PDF file', 'error');
        }
    },
    
    // ===========================================
    // PREDEFINED REPORTS
    // ===========================================
    
    /**
     * Export asset master list
     * @param {string} format - 'excel' or 'pdf'
     */
    async assetMasterList(format = 'excel') {
        Components.showLoading();
        
        try {
            const { data } = await window.supabase
                .from('assets')
                .select(`
                    *,
                    category:categories(name),
                    department:departments(name)
                `)
                .neq('status', 'decommissioned')
                .order('created_at', { ascending: false });
            
            const columns = [
                { key: 'asset_tag', label: 'Asset Tag' },
                { key: 'serial_number', label: 'Serial Number' },
                { key: 'category', label: 'Category', getValue: (row) => row.category?.name || '' },
                { key: 'brand', label: 'Brand' },
                { key: 'model', label: 'Model' },
                { key: 'department', label: 'Department', getValue: (row) => row.department?.name || '' },
                { key: 'status', label: 'Status', getValue: (row) => Utils.snakeToTitle(row.status) },
                { key: 'purchase_date', label: 'Purchase Date', getValue: (row) => Utils.formatDate(row.purchase_date) },
                { key: 'vendor', label: 'Vendor' },
                { key: 'warranty_end_date', label: 'Warranty End', getValue: (row) => Utils.formatDate(row.warranty_end_date) }
            ];
            
            if (format === 'excel') {
                this.toExcel(data || [], 'Asset_Master_List', columns);
            } else {
                this.toPDF(data || [], 'Asset_Master_List', {
                    title: 'Asset Master List',
                    columns,
                    orientation: 'landscape'
                });
            }
        } finally {
            Components.hideLoading();
        }
    },
    
    /**
     * Export employee assignment report
     * @param {string} format - 'excel' or 'pdf'
     */
    async employeeAssignments(format = 'excel') {
        Components.showLoading();
        
        try {
            const result = await Assignments.getActiveAssignmentsReport();
            
            const columns = [
                { key: 'employee_id', label: 'Employee ID', getValue: (row) => row.employee?.employee_id || '' },
                { key: 'employee_name', label: 'Employee Name', getValue: (row) => row.employee?.full_name || '' },
                { key: 'department', label: 'Department', getValue: (row) => row.employee?.department?.name || '' },
                { key: 'location', label: 'Location', getValue: (row) => row.employee?.location?.name || '' },
                { key: 'asset_tag', label: 'Asset Tag', getValue: (row) => row.asset?.asset_tag || '' },
                { key: 'serial_number', label: 'Serial Number', getValue: (row) => row.asset?.serial_number || '' },
                { key: 'category', label: 'Category', getValue: (row) => row.asset?.category?.name || '' },
                { key: 'asset_desc', label: 'Asset Description', getValue: (row) => `${row.asset?.brand || ''} ${row.asset?.model || ''}`.trim() },
                { key: 'assigned_date', label: 'Assigned Date', getValue: (row) => Utils.formatDate(row.assigned_date) }
            ];
            
            if (format === 'excel') {
                this.toExcel(result.data || [], 'Employee_Assignments', columns);
            } else {
                this.toPDF(result.data || [], 'Employee_Assignments', {
                    title: 'Employee Asset Assignments',
                    columns,
                    orientation: 'landscape'
                });
            }
        } finally {
            Components.hideLoading();
        }
    },
    
    /**
     * Export warranty expiry report
     * @param {string} format - 'excel' or 'pdf'
     */
    async warrantyExpiry(format = 'excel') {
        Components.showLoading();
        
        try {
            const { data } = await window.supabase
                .from('v_warranty_expiring')
                .select('*')
                .order('warranty_end_date');
            
            const columns = [
                { key: 'asset_tag', label: 'Asset Tag' },
                { key: 'serial_number', label: 'Serial Number' },
                { key: 'category_name', label: 'Category' },
                { key: 'brand', label: 'Brand' },
                { key: 'model', label: 'Model' },
                { key: 'department_name', label: 'Department' },
                { key: 'warranty_end_date', label: 'Warranty End', getValue: (row) => Utils.formatDate(row.warranty_end_date) },
                { key: 'days_until_expiry', label: 'Days Until Expiry' }
            ];
            
            if (format === 'excel') {
                this.toExcel(data || [], 'Warranty_Expiry_Report', columns);
            } else {
                this.toPDF(data || [], 'Warranty_Expiry_Report', {
                    title: 'Warranty Expiry Report',
                    columns
                });
            }
        } finally {
            Components.hideLoading();
        }
    },
    
    /**
     * Export refresh cycle report
     * @param {string} format - 'excel' or 'pdf'
     */
    async refreshCycle(format = 'excel') {
        Components.showLoading();
        
        try {
            const { data } = await window.supabase
                .from('v_assets_refresh_due')
                .select('*')
                .order('purchase_date');
            
            const columns = [
                { key: 'asset_tag', label: 'Asset Tag' },
                { key: 'serial_number', label: 'Serial Number' },
                { key: 'category_name', label: 'Category' },
                { key: 'brand', label: 'Brand' },
                { key: 'model', label: 'Model' },
                { key: 'department_name', label: 'Department' },
                { key: 'purchase_date', label: 'Purchase Date', getValue: (row) => Utils.formatDate(row.purchase_date) },
                { key: 'years_old', label: 'Years Old' },
                { key: 'status', label: 'Status', getValue: (row) => Utils.snakeToTitle(row.status) }
            ];
            
            if (format === 'excel') {
                this.toExcel(data || [], 'Refresh_Cycle_Report', columns);
            } else {
                this.toPDF(data || [], 'Refresh_Cycle_Report', {
                    title: 'Asset Refresh Cycle Report',
                    columns
                });
            }
        } finally {
            Components.hideLoading();
        }
    },
    
    /**
     * Export lost/damaged assets report
     * @param {string} format - 'excel' or 'pdf'
     */
    async lostDamagedAssets(format = 'excel') {
        Components.showLoading();
        
        try {
            const { data } = await window.supabase
                .from('assets')
                .select(`
                    *,
                    category:categories(name),
                    department:departments(name)
                `)
                .in('status', ['lost', 'damaged'])
                .order('updated_at', { ascending: false });
            
            const columns = [
                { key: 'asset_tag', label: 'Asset Tag' },
                { key: 'serial_number', label: 'Serial Number' },
                { key: 'category', label: 'Category', getValue: (row) => row.category?.name || '' },
                { key: 'brand', label: 'Brand' },
                { key: 'model', label: 'Model' },
                { key: 'department', label: 'Department', getValue: (row) => row.department?.name || '' },
                { key: 'status', label: 'Status', getValue: (row) => Utils.snakeToTitle(row.status) },
                { key: 'notes', label: 'Notes' }
            ];
            
            if (format === 'excel') {
                this.toExcel(data || [], 'Lost_Damaged_Assets', columns);
            } else {
                this.toPDF(data || [], 'Lost_Damaged_Assets', {
                    title: 'Lost/Damaged Assets Report',
                    columns
                });
            }
        } finally {
            Components.hideLoading();
        }
    },
    
    /**
     * Export maintenance report
     * @param {string} format - 'excel' or 'pdf'
     */
    async maintenanceReport(format = 'excel') {
        Components.showLoading();
        
        try {
            const result = await Maintenance.getReport();
            
            const columns = [
                { key: 'asset_tag', label: 'Asset Tag' },
                { key: 'serial_number', label: 'Serial Number' },
                { key: 'category_name', label: 'Category' },
                { key: 'issue_description', label: 'Issue' },
                { key: 'vendor', label: 'Repair Vendor' },
                { key: 'status', label: 'Status', getValue: (row) => Utils.snakeToTitle(row.status) },
                { key: 'start_date', label: 'Start Date', getValue: (row) => Utils.formatDate(row.start_date) },
                { key: 'end_date', label: 'End Date', getValue: (row) => Utils.formatDate(row.end_date) },
                { key: 'cost', label: 'Cost', getValue: (row) => row.cost ? Utils.formatCurrency(row.cost) : '' }
            ];
            
            if (format === 'excel') {
                this.toExcel(result.data || [], 'Maintenance_Report', columns);
            } else {
                this.toPDF(result.data || [], 'Maintenance_Report', {
                    title: 'Maintenance & Repairs Report',
                    columns,
                    orientation: 'landscape'
                });
            }
        } finally {
            Components.hideLoading();
        }
    }
};

// Export for use in other modules
window.Export = Export;

// ES Module exports
export { Export, Export as ExportManager };
