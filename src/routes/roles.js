import express from 'express';
import { listRoles, getRoleById, createRole, updateRole, deleteRole } from '../controllers/roleController.js';
import { authenticate, requirePermission } from '../middleware/auth.js';
import { PERMISSIONS } from '../config/permissions.js';

const router = express.Router();

router.use(authenticate);

router.get('/roles', requirePermission(PERMISSIONS.ROLE_MANAGE), listRoles);
router.post('/roles', requirePermission(PERMISSIONS.ROLE_MANAGE), createRole);
router.get('/roles/:roleId', requirePermission(PERMISSIONS.ROLE_MANAGE), getRoleById);
router.patch('/roles/:roleId', requirePermission(PERMISSIONS.ROLE_MANAGE), updateRole);
router.delete('/roles/:roleId', requirePermission(PERMISSIONS.ROLE_MANAGE), deleteRole);

export default router;
