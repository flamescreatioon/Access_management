/**
 * User Routes
 * Define HTTP routes for user operations
 */

// This is a placeholder for Express.js routes
// In a real application, this would use Express Router

/**
 * Setup user routes
 * @param {Object} router - Express router instance
 * @param {Object} userController - User controller instance
 */
function setupUserRoutes(router, userController) {
  // GET /users - Get all users
  router.get('/users', (req, res) => userController.getAllUsers(req, res));

  // GET /users/:id - Get user by ID
  router.get('/users/:id', (req, res) => userController.getUserById(req, res));

  // POST /users - Create a new user
  router.post('/users', (req, res) => userController.createUser(req, res));

  // PUT /users/:id - Update user
  router.put('/users/:id', (req, res) => userController.updateUser(req, res));

  // DELETE /users/:id - Delete user
  router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

  return router;
}

module.exports = { setupUserRoutes };
