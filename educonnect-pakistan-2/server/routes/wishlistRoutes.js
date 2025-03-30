import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../conrollers/wishlistController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', protect(['student']), getWishlist);
router.post('/:tutorId', protect(['student']), addToWishlist);
router.delete('/:tutorId', protect(['student']), removeFromWishlist);

export default router;

