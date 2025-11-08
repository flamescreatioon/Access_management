/**
 * User Model
 * Represents a user in the access management system
 */
class User {
  constructor(id, username, email, roles = []) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Check if user has a specific role
   * @param {string} role - Role to check
   * @returns {boolean}
   */
  hasRole(role) {
    return this.roles.includes(role);
  }

  /**
   * Add a role to the user
   * @param {string} role - Role to add
   */
  addRole(role) {
    if (!this.hasRole(role)) {
      this.roles.push(role);
      this.updatedAt = new Date();
    }
  }

  /**
   * Remove a role from the user
   * @param {string} role - Role to remove
   */
  removeRole(role) {
    this.roles = this.roles.filter(r => r !== role);
    this.updatedAt = new Date();
  }

  /**
   * Convert user to JSON object
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      roles: this.roles,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = User;
