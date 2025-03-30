import Review from '../models/Review.js';
import Session from '../models/Session.js';

export const submitReview = async (req, res) => {
  try {
    const { tutor, rating, reviewText } = req.body;
    const studentId = req.user.id;
    const completedSession = await Session.findOne({
      student: studentId,
      tutor: tutor,
      status: 'completed'
    });
    if (!completedSession) {
      return res.status(400).json({ message: 'You can only review tutors after a completed session.' });
    }

    const existingReview = await Review.findOne({ student: studentId, tutor: tutor });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this tutor.' });
    }

    const review = await Review.create({ student: studentId, tutor: tutor, rating, reviewText });
    res.status(201).json({ message: 'Review submitted', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit review' });
  }
};

export const getTutorReviews = async (req, res) => {
  try {
    const tutor = req.params.tutorId;
    console.log('h')
    console.log('Tutor ID:', tutor);
    const reviews = await Review.find({ tutor: tutor }).populate('student', 'name');
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

