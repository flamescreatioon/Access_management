// Central permission catalog and role mapping
// Keep this lightweight; consider moving to DB if dynamic changes needed.

export const PERMISSIONS = {
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  ROLE_MANAGE: 'role:manage',
  PERMISSION_TEMPLATE_MANAGE: 'permission-template:manage',
  ACCESS_RULE_MANAGE: 'access-rule:manage',
  SYSTEM_CONFIG: 'system:config',
  INTEGRATION_MANAGE: 'integration:manage',
  SECURITY_POLICY_MANAGE: 'security-policy:manage',
  REPORT_VIEW: 'report:view',
  REPORT_GENERATE: 'report:generate',
  BACKUP_RUN: 'backup:run',
  BACKUP_RESTORE: 'backup:restore',
  ANNOUNCEMENT_SEND: 'announcement:send',
  ALERT_CONFIGURE: 'alert:configure'
};

// Static role -> permissions mapping
export const ROLE_PERMISSIONS = {
  admin: Object.values(PERMISSIONS),
  staff: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.ACCESS_RULE_MANAGE,
    PERMISSIONS.REPORT_VIEW
  ],
  volunteer: [PERMISSIONS.USER_READ],
  student: [PERMISSIONS.USER_READ],
  member: [PERMISSIONS.USER_READ],
  guest: []
};

export function getPermissionsForRole(role) {
  return ROLE_PERMISSIONS[role] || [];
}

export function roleHasPermission(role, permission) {
  return getPermissionsForRole(role).includes(permission);
}
