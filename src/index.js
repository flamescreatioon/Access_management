const config = require('./config/config');
const AccessManagementSystem = require('./services/AccessManagementSystem');

/**
 * Main entry point for the Access Management System
 */
async function main() {
  try {
    console.warn('Starting Access Management System...');

    // Initialize the system
    const system = new AccessManagementSystem(config);
    await system.initialize();

    console.warn('Access Management System initialized successfully');
    console.warn(`Environment: ${config.environment}`);
    console.warn(`Version: ${config.version}`);

    // Start the system
    await system.start();
  } catch (error) {
    console.error('Failed to start Access Management System:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.warn('SIGTERM signal received: closing application gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.warn('SIGINT signal received: closing application gracefully');
  process.exit(0);
});

// Run the application
if (require.main === module) {
  main();
}

module.exports = main;
