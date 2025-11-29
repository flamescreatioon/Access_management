import express from 'express'
import {
	getPendingUsers,
	approveUser,
	rejectUser,
	createUser,
	listUsers,
	updateUser,
	deleteUser,
	updateUserRole,
	deactivateUser,
	getSystemConfig,
	updateSystemConfig,
	generateAccessReport,
	runBackup,
	restoreBackup,
	sendAnnouncement,
	configureAlerts
} from '../controllers/adminController.js'
import { authenticate, requireRole, requirePermission } from '../middleware/auth.js'
import { PERMISSIONS } from '../config/permissions.js'

const router = express.Router()

router.use(authenticate, requireRole('admin'))

// User approval workflow
router.get('/pending-users', requirePermission(PERMISSIONS.USER_READ), getPendingUsers)
router.patch('/approve-user/:userId', requirePermission(PERMISSIONS.USER_UPDATE), approveUser)
router.delete('/reject-user/:userId', requirePermission(PERMISSIONS.USER_UPDATE), rejectUser)

// User management
router.post('/users', requirePermission(PERMISSIONS.USER_CREATE), createUser)
router.get('/users', requirePermission(PERMISSIONS.USER_READ), listUsers)
router.patch('/users/:userId', requirePermission(PERMISSIONS.USER_UPDATE), updateUser)
router.patch('/users/:userId/role', requirePermission(PERMISSIONS.ROLE_MANAGE), updateUserRole)
router.patch('/users/:userId/deactivate', requirePermission(PERMISSIONS.USER_UPDATE), deactivateUser)
router.delete('/users/:userId', requirePermission(PERMISSIONS.USER_DELETE), async (req, res, next) => next(), deleteUser)

// System configuration
router.get('/system/config', requirePermission(PERMISSIONS.SYSTEM_CONFIG), getSystemConfig)
router.put('/system/config', requirePermission(PERMISSIONS.SYSTEM_CONFIG), updateSystemConfig)

// Reports
router.get('/reports/access', requirePermission(PERMISSIONS.REPORT_GENERATE), generateAccessReport)

// Backups
router.post('/backups/run', requirePermission(PERMISSIONS.BACKUP_RUN), runBackup)
router.post('/backups/restore', requirePermission(PERMISSIONS.BACKUP_RESTORE), restoreBackup)

// Announcements & alerts
router.post('/announcements', requirePermission(PERMISSIONS.ANNOUNCEMENT_SEND), sendAnnouncement)
router.post('/alerts/config', requirePermission(PERMISSIONS.ALERT_CONFIGURE), configureAlerts)

export default router