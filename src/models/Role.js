/**
 * Role Model
 * Represents a role in the access management system
 */
class Role {
  constructor(id, name, permissions = []) {
    this.id = id;
    this.name = name;
    this.permissions = permissions;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Check if role has a specific permission
   * @param {string} permission - Permission to check
   * @returns {boolean}
   */
  hasPermission(permission) {
    return this.permissions.includes(permission);
  }

  /**
   * Add a permission to the role
   * @param {string} permission - Permission to add
   */
  addPermission(permission) {
    if (!this.hasPermission(permission)) {
      this.permissions.push(permission);
      this.updatedAt = new Date();
    }
  }

  /**
   * Remove a permission from the role
   * @param {string} permission - Permission to remove
   */
  removePermission(permission) {
    this.permissions = this.permissions.filter(p => p !== permission);
    this.updatedAt = new Date();
  }

  /**
   * Convert role to JSON object
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      permissions: this.permissions,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = Role;
