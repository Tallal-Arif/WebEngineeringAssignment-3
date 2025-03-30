import Wishlist from '../models/Wishlist.js';
import User from '../models/User.js';

export const getWishlist = async (req, res) => {
    try {
      const wishlist = await Wishlist.findOne({ student: req.user.id }).populate('tutors', 'name subjects qualifications');
  
      if (!wishlist) return res.json([]);
      const result = wishlist.tutors.map(t => ({ tutor: t }));
      res.json(result);
    } catch (err) {
      console.error('Wishlist Fetch Error:', err);
      res.status(500).json({ message: 'Failed to fetch wishlist' });
    }
  };
  

export const addToWishlist = async (req, res) => {
    try {
      const { tutorId } = req.params;
      const studentId = req.user.id;
  
      const tutor = await User.findById(tutorId);
      if (!tutor || tutor.role !== 'tutor') {
        return res.status(404).json({ message: 'Invalid tutor ID' });
      }
  
      let wishlist = await Wishlist.findOne({ student: studentId });
  
      if (!wishlist) {
        wishlist = new Wishlist({ student: studentId, tutors: [tutorId] });
      } else if (!wishlist.tutors.includes(tutorId)) {
        wishlist.tutors.push(tutorId);
      }
  
      await wishlist.save();
      res.status(200).json({ message: 'Tutor added to wishlist' });
    } catch (err) {
      console.error('Wishlist Add Error:', err);
      res.status(500).json({ message: 'Failed to update wishlist' });
    }
  };
  

  export const removeFromWishlist = async (req, res) => {
    try {
      const { tutorId } = req.params;
      const studentId = req.user.id;
  
      const wishlist = await Wishlist.findOne({ student: studentId });
      if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
  
      wishlist.tutors = wishlist.tutors.filter(id => id.toString() !== tutorId);
      await wishlist.save();
  
      res.status(200).json({ message: 'Tutor removed from wishlist' });
    } catch (err) {
      console.error('Wishlist Remove Error:', err);
      res.status(500).json({ message: 'Failed to remove tutor from wishlist' });
    }
  };
  
  

