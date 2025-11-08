/**
 * User Controller
 * Handles user-related HTTP requests
 */

const User = require('../models/User');
const { isValidEmail, isValidUsername } = require('../utils/validator');

class UserController {
  constructor() {
    this.users = new Map();
  }

  /**
   * Get all users
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  getAllUsers(req, res) {
    const users = Array.from(this.users.values()).map(user => user.toJSON());
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  }

  /**
   * Get user by ID
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  getUserById(req, res) {
    const { id } = req.params;
    const user = this.users.get(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user.toJSON(),
    });
  }

  /**
   * Create a new user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  createUser(req, res) {
    const { username, email, roles } = req.body;

    // Validate input
    if (!isValidUsername(username)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid username format',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }

    // Create user
    const id = Date.now().toString();
    const user = new User(id, username, email, roles || []);
    this.users.set(id, user);

    res.status(201).json({
      success: true,
      data: user.toJSON(),
    });
  }

  /**
   * Update user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  updateUser(req, res) {
    const { id } = req.params;
    const user = this.users.get(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    const { username, email, roles } = req.body;

    if (username) user.username = username;
    if (email) user.email = email;
    if (roles) user.roles = roles;
    user.updatedAt = new Date();

    res.status(200).json({
      success: true,
      data: user.toJSON(),
    });
  }

  /**
   * Delete user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  deleteUser(req, res) {
    const { id } = req.params;

    if (!this.users.has(id)) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    this.users.delete(id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  }
}

module.exports = UserController;
