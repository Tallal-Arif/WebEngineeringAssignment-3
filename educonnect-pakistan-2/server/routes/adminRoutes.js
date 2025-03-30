import express from 'express';
import {
  getAllVerificationRequests,
  updateVerificationStatus,
  getAdminDashboardReport
} from '../conrollers/adminController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/verifications', protect(['admin']), getAllVerificationRequests);
router.put('/verifications/:id', protect(['admin']), updateVerificationStatus);
router.get('/report', protect(['admin']), getAdminDashboardReport);

export default router;

