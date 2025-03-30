import express from 'express';
import {
  updateTutorProfile,
  getTutorProfile,
  getFilteredTutors,
  getTutorSessionsAndEarnings,
  markSessionCompleted,
  getTutorById
} from '../conrollers/tutorController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id', protect(['student']), getTutorById);
router.get('/', protect(['student']), getFilteredTutors);
router.get('/me', protect(['tutor']), getTutorProfile);
router.put('/me', protect(['tutor']), updateTutorProfile);
router.get('/dashboard', protect(['tutor']), getTutorSessionsAndEarnings);
router.put('/session/:id/complete', protect(['tutor']), markSessionCompleted);

export default router;
