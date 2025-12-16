/**
 * Centralized data fetching utility for dashboard and context updates
 * Aggregates multiple API calls to fetch roles, users, permissions, and requests
 */

import { api } from './apiClient.js'

/**
 * Fetch all dashboard data from backend
 * @param {string} token - JWT authentication token
 * @returns {Promise<Object>} Dashboard data object containing users, roles, permissions, etc.
 */
export const fetchDashboardData = async (token) => {
  if (!token) {
    return {
      users: [],
      roles: [],
      permissions: [],
      pendingRequests: [],
      logs: [],
      error: null
    }
  }

  try {
    const [
      usersRes,
      rolesRes,
      permissionsRes,
      pendingRes,
      logsRes
    ] = await Promise.allSettled([
      api.admin.listUsers(token),
      api.roles.listRoles(token),
      fetchPermissions(token),
      api.admin.pendingUsers(token),
      fetchAccessLogs(token)
    ])

    return {
      users: usersRes.status === 'fulfilled' ? usersRes.value.users || [] : [],
      roles: rolesRes.status === 'fulfilled' ? rolesRes.value.roles || [] : [],
      permissions: permissionsRes.status === 'fulfilled' ? permissionsRes.value.permissions || [] : [],
      pendingRequests: pendingRes.status === 'fulfilled' ? pendingRes.value.pending || [] : [],
      logs: logsRes.status === 'fulfilled' ? logsRes.value.logs || [] : [],
      error: null
    }
  } catch (error) {
    console.error('Dashboard data fetch error:', error)
    return {
      users: [],
      roles: [],
      permissions: [],
      pendingRequests: [],
      logs: [],
      error: error.message
    }
  }
}

/**
 * Fetch only users from backend
 * @param {string} token - JWT authentication token
 * @returns {Promise<Array>} Array of user objects
 */
export const fetchUsers = async (token) => {
  if (!token) return []
  try {
    const data = await api.admin.listUsers(token)
    return data.users || []
  } catch (error) {
    console.error('Fetch users error:', error)
    return []
  }
}

/**
 * Fetch only roles from backend
 * @param {string} token - JWT authentication token
 * @returns {Promise<Array>} Array of role objects
 */
export const fetchRoles = async (token) => {
  if (!token) return []
  try {
    const data = await api.roles.listRoles(token)
    return data.roles || []
  } catch (error) {
    console.error('Fetch roles error:', error)
    return []
  }
}

/**
 * Fetch active roles count
 * @param {string} token - JWT authentication token
 * @returns {Promise<number>} Count of active roles
 */
export const fetchActiveRolesCount = async (token) => {
  const roles = await fetchRoles(token)
  return roles.length
}

/**
 * Fetch permissions (mock function - extend as backend endpoint is created)
 * @param {string} token - JWT authentication token
 * @returns {Promise<Object>} Permissions object
 */
export const fetchPermissions = async (token) => {
  // TODO: Create backend endpoint GET /api/permissions
  // For now, return mock data
  return {
    permissions: [
      { id: 'user:create', name: 'Create Users', category: 'User Management' },
      { id: 'user:read', name: 'Read Users', category: 'User Management' },
      { id: 'user:update', name: 'Update Users', category: 'User Management' },
      { id: 'user:delete', name: 'Delete Users', category: 'User Management' },
      { id: 'role:manage', name: 'Manage Roles', category: 'Role Management' },
      { id: 'report:generate', name: 'Generate Reports', category: 'Reports' },
      { id: 'report:view', name: 'View Reports', category: 'Reports' },
      { id: 'access:grant', name: 'Grant Access', category: 'Access Control' },
      { id: 'access:revoke', name: 'Revoke Access', category: 'Access Control' }
    ]
  }
}

/**
 * Fetch pending user requests
 * @param {string} token - JWT authentication token
 * @returns {Promise<Array>} Array of pending request objects
 */
export const fetchPendingRequests = async (token) => {
  if (!token) return []
  try {
    const data = await api.admin.pendingUsers(token)
    return data.pending || []
  } catch (error) {
    console.error('Fetch pending requests error:', error)
    return []
  }
}

/**
 * Fetch access logs (mock function - extend as backend endpoint is created)
 * @param {string} token - JWT authentication token
 * @returns {Promise<Object>} Access logs object
 */
export const fetchAccessLogs = async (token) => {
  // TODO: Create backend endpoint GET /api/logs or /api/access-logs
  // For now, return empty array to be filled by context mock data
  return { logs: [] }
}

/**
 * Update user information on backend
 * @param {string} token - JWT authentication token
 * @param {string} userId - User ID to update
 * @param {Object} updates - Object containing fields to update
 * @returns {Promise<Object>} Updated user object
 */
export const updateUserData = async (token, userId, updates) => {
  try {
    const data = await api.admin.updateUser(token, userId, updates)
    return data
  } catch (error) {
    console.error('Update user error:', error)
    throw error
  }
}

/**
 * Update role information on backend
 * @param {string} token - JWT authentication token
 * @param {string} roleId - Role ID to update
 * @param {Object} updates - Object containing fields to update (description, permissions)
 * @returns {Promise<Object>} Updated role object
 */
export const updateRoleData = async (token, roleId, updates) => {
  try {
    const data = await api.roles.updateRole(token, roleId, updates)
    return data
  } catch (error) {
    console.error('Update role error:', error)
    throw error
  }
}

/**
 * Approve a pending user request
 * @param {string} token - JWT authentication token
 * @param {string} userId - User ID to approve
 * @returns {Promise<Object>} Response from backend
 */
export const approvePendingUser = async (token, userId) => {
  try {
    const data = await api.admin.approveUser(token, userId)
    return data
  } catch (error) {
    console.error('Approve user error:', error)
    throw error
  }
}

/**
 * Reject a pending user request
 * @param {string} token - JWT authentication token
 * @param {string} userId - User ID to reject
 * @returns {Promise<Object>} Response from backend
 */
export const rejectPendingUser = async (token, userId) => {
  try {
    const data = await api.admin.rejectUser(token, userId)
    return data
  } catch (error) {
    console.error('Reject user error:', error)
    throw error
  }
}

/**
 * Batch fetch and refresh dashboard data
 * Useful for refreshing entire dashboard state at once
 * @param {string} token - JWT authentication token
 * @param {Object} callbacks - Object with callback functions for each data type
 * @returns {Promise<void>}
 */
export const refreshDashboardData = async (token, callbacks = {}) => {
  const {
    onUsersUpdate,
    onRolesUpdate,
    onPermissionsUpdate,
    onPendingUpdate,
    onLogsUpdate,
    onError
  } = callbacks

  try {
    const data = await fetchDashboardData(token)

    if (data.error) {
      onError?.(data.error)
      return
    }

    onUsersUpdate?.(data.users)
    onRolesUpdate?.(data.roles)
    onPermissionsUpdate?.(data.permissions)
    onPendingUpdate?.(data.pendingRequests)
    onLogsUpdate?.(data.logs)
  } catch (error) {
    console.error('Refresh dashboard error:', error)
    onError?.(error.message)
  }
}
