import express from 'express'
import { authenticate } from '../middleware/auth.js'
import {
  generateQR,
  generateTextCode,
  checkIn
} from '../controllers/accessController.js'

const router = express.Router()

/* router.use(authenticate) */

// User requests codes
router.post('/generate/text', generateTextCode)
router.post('/generate/qr', generateQR)

// Check-in route (QR scanner / code input)
router.post('/checkin', checkIn)

export default router
