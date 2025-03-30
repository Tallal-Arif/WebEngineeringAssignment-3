import express from 'express';
import {
  createSession,
  getStudentSessions,
  updateSession,
  deleteSession,
  getTutorSessions
} from '../conrollers/sessionController.js'
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/tutor', protect(['tutor']), getTutorSessions);
router.post('/', protect(['student']), createSession);
router.get('/student', protect(['student']), getStudentSessions);
router.put('/:id', protect(['student']), updateSession);
router.delete('/:id', protect(['student']), deleteSession);

export default router;