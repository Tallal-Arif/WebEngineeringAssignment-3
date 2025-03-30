import express from 'express';
import { submitReview, getTutorReviews } from '../conrollers/reviewController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', protect(['student']), submitReview);
router.get('/:tutorId', getTutorReviews);

export default router;

