import express from 'express';
import { getPendingUsers, approveUser, rejectUser } from '../controllers/adminController';
import { authenticate, requireRole } from '../middleware/auth';

const router = express.Router();

router.use(authenticate, requireRole('admin'));

router.get('/pending-users', getPendingUsers);
router.patch('/approve-user/:userId', approveUser);
router.delete('/reject-user/:userId', rejectUser);

export default router;