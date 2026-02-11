/**
 * ============================================
 * MAINTENANCE MODULE
 * Madison 88 IT Equipment Inventory System
 * ============================================
 * 
 * Handles maintenance and repair tracking.
 */

const Maintenance = {
    // ===========================================
    // CRUD OPERATIONS
    // ===========================================
    
    /**
     * Get all maintenance records with filters
     * @param {object} options - Query options
     * @returns {Promise<object>} Records and pagination info
     */
    async getAll({ 
        page = 1, 
        perPage = 25, 
        status = null,
        assetId = null,
        excludeDecommissioned = true,
        sortBy = 'created_at',
        sortOrder = 'desc'
    } = {}) {
        try {
            // Use the view that excludes decommissioned assets
            const tableName = excludeDecommissioned ? 'v_maintenance_active' : 'maintenance_records';
            
            let query = window.supabase
                .from(tableName)
                .select('*', { count: 'exact' });
            
            // Apply filters
            if (status) {
                if (Array.isArray(status)) {
                    query = query.in('status', status);
                } else {
                    query = query.eq('status', status);
                }
            }
            
            if (assetId) {
                query = query.eq('asset_id', assetId);
            }
            
            // Sorting
            query = query.order(sortBy, { ascending: sortOrder === 'asc' });
            
            // Pagination
            const from = (page - 1) * perPage;
            const to = from + perPage - 1;
            query = query.range(from, to);
            
            const { data, error, count } = await query;
            
            if (error) throw error;
            
            return {
                success: true,
                data: data || [],
                count: count || 0,
                totalPages: Math.ceil((count || 0) / perPage),
                currentPage: page
            };
        } catch (error) {
            console.error('Get maintenance records error:', error);
            return { success: false, error: error.message, data: [], count: 0 };
        }
    },
    
    /**
     * Get single maintenance record by ID
     * @param {string} id - Record ID
     * @returns {Promise<object>} Record data
     */
    async getById(id) {
        try {
            const { data, error } = await window.supabase
                .from('maintenance_records')
                .select(`
                    *,
                    asset:assets(
                        id,
                        asset_tag,
                        serial_number,
                        brand,
                        model,
                        status,
                        category:asset_categories(name)
                    )
                `)
                .eq('id', id)
                .single();
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('Get maintenance record error:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Create maintenance record
     * @param {object} recordData - Record data
     * @returns {Promise<object>} Created record
     */
    async create(recordData) {
        try {
            // Validate required fields
            if (!recordData.asset_id) {
                throw new Error('Asset is required');
            }
            
            if (!recordData.issue_description) {
                throw new Error('Issue description is required');
            }
            
            // Check asset exists and is not decommissioned
            const asset = await Assets.getById(recordData.asset_id);
            if (!asset.success) throw new Error('Asset not found');
            
            if (asset.data.status === 'decommissioned') {
                throw new Error('Cannot create maintenance record for decommissioned asset. Decommissioned assets cannot be repaired.');
            }
            
            // Check if asset already has active maintenance
            const { data: activeMaintenance, error: checkError } = await window.supabase
                .from('maintenance_records')
                .select('id, issue_description, start_date')
                .eq('asset_id', recordData.asset_id)
                .in('status', ['pending', 'in_progress'])
                .maybeSingle();
            
            if (checkError && checkError.code !== 'PGRST116') throw checkError;
            
            if (activeMaintenance) {
                throw new Error('This asset already has an active maintenance record. Please complete the current maintenance before creating a new one.');
            }
            
            // Store the original asset status before changing to under_repair
            const originalStatus = asset.data.status;
            
            // Prepare data
            const insertData = {
                ...recordData,
                created_by: Auth.user?.id,
                status: recordData.status || 'pending',
                original_asset_status: originalStatus
            };
            
            const { data, error } = await window.supabase
                .from('maintenance_records')
                .insert(insertData)
                .select()
                .single();
            
            if (error) throw error;
            
            // Automatically change asset status to under_repair
            await Assets.updateStatus(recordData.asset_id, 'under_repair');
            
            // Log audit
            await Audit.logMaintenanceCreated(data, asset.data);
            
            return { success: true, data };
        } catch (error) {
            console.error('Create maintenance record error:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Update maintenance record
     * @param {string} id - Record ID
     * @param {object} updates - Updated fields
     * @returns {Promise<object>} Updated record
     */
    async update(id, updates) {
        try {
            const current = await this.getById(id);
            if (!current.success) throw new Error('Record not found');
            
            const { data, error } = await window.supabase
                .from('maintenance_records')
                .update(updates)
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw error;
            
            // Get asset info for audit
            const asset = await Assets.getById(current.data.asset_id);
            
            // Log audit
            await Audit.logMaintenanceUpdated(id, current.data, data, asset.data);
            
            return { success: true, data };
        } catch (error) {
            console.error('Update maintenance record error:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Complete maintenance record
     * @param {string} id - Record ID
     * @param {object} completionData - Completion details
     * @returns {Promise<object>} Updated record
     */
    async complete(id, { endDate = null, cost = null, notes = '' } = {}) {
        try {
            const current = await this.getById(id);
            if (!current.success) throw new Error('Record not found');
            
            const updateData = {
                status: 'completed',
                end_date: endDate || new Date().toISOString().split('T')[0]
            };
            
            if (cost !== null) updateData.cost = cost;
            if (notes) updateData.notes = notes;
            
            const { data, error } = await window.supabase
                .from('maintenance_records')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw error;
            
            // Check if asset has other active maintenance (excluding current record)
            const { data: otherMaintenance, count } = await window.supabase
                .from('maintenance_records')
                .select('*', { count: 'exact' })
                .eq('asset_id', current.data.asset_id)
                .neq('id', id)
                .in('status', ['pending', 'in_progress']);
            
            console.log('Other active maintenance count:', count);
            console.log('Other active maintenance records:', otherMaintenance);
            
            // If no other active maintenance, restore asset status
            if (count === 0) {
                const originalStatus = data.original_asset_status;
                console.log('Original asset status before maintenance:', originalStatus);
                
                // Determine new status based on original status and current assignment
                let newStatus = 'available';
                
                if (originalStatus === 'assigned') {
                    // Check if asset still has an active assignment
                    const { data: assignment, error: assignmentError } = await window.supabase
                        .from('asset_assignments')
                        .select('id, employee_id')
                        .eq('asset_id', current.data.asset_id)
                        .filter('returned_date', 'is', null)
                        .maybeSingle();
                    
                    console.log('Active assignment:', assignment);
                    
                    if (assignment) {
                        // Asset still assigned - restore to assigned status
                        newStatus = 'assigned';
                    } else {
                        // Assignment was returned during maintenance - set to available
                        newStatus = 'available';
                    }
                } else if (originalStatus === 'available') {
                    // Was available before, return to available
                    newStatus = 'available';
                } else if (originalStatus === 'damaged' || originalStatus === 'lost') {
                    // Damaged or lost assets become available after repair
                    newStatus = 'available';
                } else if (originalStatus === 'decommissioned') {
                    // This shouldn't happen (blocked at creation), but keep decommissioned if it does
                    newStatus = 'decommissioned';
                } else {
                    // Default to available for any other status
                    newStatus = 'available';
                }
                
                console.log('Restoring asset status to:', newStatus);
                await Assets.updateStatus(current.data.asset_id, newStatus);
            } else {
                console.log('Skipping asset status update - other active maintenance exists');
            }
            
            // Get asset info for audit
            const asset = await Assets.getById(current.data.asset_id);
            
            // Log audit
            await Audit.logMaintenanceCompleted(data, asset.data);
            
            return { success: true, data };
        } catch (error) {
            console.error('Complete maintenance error:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Cancel maintenance record
     * @param {string} id - Record ID
     * @param {string} reason - Cancellation reason
     * @returns {Promise<object>} Updated record
     */
    async cancel(id, reason = '') {
        try {
            const current = await this.getById(id);
            if (!current.success) throw new Error('Record not found');
            
            const { data, error } = await window.supabase
                .from('maintenance_records')
                .update({
                    status: 'cancelled',
                    notes: reason ? `Cancelled: ${reason}` : 'Cancelled'
                })
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw error;
            
            // Check if asset has other active maintenance
            const { count } = await window.supabase
                .from('maintenance_records')
                .select('*', { count: 'exact', head: true })
                .eq('asset_id', current.data.asset_id)
                .in('status', ['pending', 'in_progress']);
            
            // If no other active maintenance, set asset to available
            if (count === 0) {
                await Assets.updateStatus(current.data.asset_id, 'available');
            }
            
            return { success: true, data };
        } catch (error) {
            console.error('Cancel maintenance error:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Delete maintenance record
     * @param {string} id - Record ID
     * @returns {Promise<object>} Result
     */
    async delete(id) {
        try {
            const current = await this.getById(id);
            if (!current.success) throw new Error('Record not found');
            
            const { error } = await window.supabase
                .from('maintenance_records')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            
            return { success: true };
        } catch (error) {
            console.error('Delete maintenance record error:', error);
            return { success: false, error: error.message };
        }
    },
    
    // ===========================================
    // STATISTICS
    // ===========================================
    
    /**
     * Get maintenance statistics
     * @returns {Promise<object>} Statistics
     */
    async getStatistics() {
        try {
            const statuses = ['pending', 'in_progress', 'completed', 'cancelled'];
            const counts = {};
            
            for (const status of statuses) {
                const { count } = await window.supabase
                    .from('v_maintenance_active')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', status);
                counts[status] = count || 0;
            }
            
            // Total cost this year
            const startOfYear = new Date();
            startOfYear.setMonth(0, 1);
            startOfYear.setHours(0, 0, 0, 0);
            
            const { data: costData } = await window.supabase
                .from('maintenance_records')
                .select('cost')
                .eq('status', 'completed')
                .gte('end_date', startOfYear.toISOString().split('T')[0]);
            
            const totalCost = costData?.reduce((sum, r) => sum + (r.cost || 0), 0) || 0;
            
            return {
                success: true,
                data: {
                    byStatus: counts,
                    totalActive: counts.pending + counts.in_progress,
                    totalCostThisYear: totalCost
                }
            };
        } catch (error) {
            console.error('Get statistics error:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Get assets with most repairs
     * @param {number} limit - Number of results
     * @returns {Promise<object>} Top assets
     */
    async getAssetsWithMostRepairs(limit = 10) {
        try {
            const { data, error } = await window.supabase
                .from('v_maintenance_active')
                .select('asset_id, serial_number, asset_tag, brand, model, category_name');
            
            if (error) throw error;
            
            // Count repairs per asset
            const counts = {};
            data.forEach(record => {
                const assetId = record.asset_id;
                if (!counts[assetId]) {
                    counts[assetId] = {
                        id: assetId,
                        serialNumber: record.serial_number,
                        assetTag: record.asset_tag,
                        description: `${record.brand || ''} ${record.model || ''}`.trim(),
                        category: record.category_name,
                        count: 0
                    };
                }
                counts[assetId].count++;
            });
            
            // Sort and limit
            const sorted = Object.values(counts)
                .sort((a, b) => b.count - a.count)
                .slice(0, limit);
            
            return { success: true, data: sorted };
        } catch (error) {
            console.error('Get assets with most repairs error:', error);
            return { success: false, error: error.message };
        }
    },
    
    // ===========================================
    // REPORTS
    // ===========================================
    
    /**
     * Get maintenance report data
     * @param {object} options - Report options
     * @returns {Promise<object>} Report data
     */
    async getReport({ startDate = null, endDate = null, status = null } = {}) {
        try {
            let query = window.supabase
                .from('v_maintenance_active')
                .select('*')
                .order('start_date', { ascending: false });
            
            if (startDate) {
                query = query.gte('start_date', startDate);
            }
            
            if (endDate) {
                query = query.lte('start_date', endDate);
            }
            
            if (status) {
                query = query.eq('status', status);
            }
            
            const { data, error } = await query;
            
            if (error) throw error;
            
            return { success: true, data: data || [] };
        } catch (error) {
            console.error('Get maintenance report error:', error);
            return { success: false, error: error.message, data: [] };
        }
    }
};

// Export for use in other modules
window.Maintenance = Maintenance;
