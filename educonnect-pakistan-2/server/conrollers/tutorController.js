import User from '../models/User.js';
import Review from '../models/Review.js';
import Session from '../models/Session.js';

export const updateTutorProfile = async (req, res) => {
  try {
    const tutorId = req.user.id;
    const updates = req.body;

    const tutor = await User.findById(tutorId);
    if (!tutor || tutor.role !== 'tutor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    Object.assign(tutor, updates);
    await tutor.save();

    res.json({ message: 'Profile updated', tutor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

export const getTutorProfile = async (req, res) => {
  try {
    const tutorId = req.user.id;
    const tutor = await User.findById(tutorId);

    if (!tutor || tutor.role !== 'tutor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(tutor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get tutor profile' });
  }
};

export const getFilteredTutors = async (req, res) => {
  try {
    const { subject, location, minRating, minPrice, maxPrice, availability } = req.query;

    let filters = { role: 'tutor' };

    if (subject) filters.subjects = { $in: [subject] };
    if (location) filters['preferences'] = location === 'online' ? { $in: ['online', 'both'] } : { $in: ['in-person', 'both'] };
    if (minPrice || maxPrice) filters.hourlyRate = {
      ...(minPrice && { $gte: parseFloat(minPrice) }),
      ...(maxPrice && { $lte: parseFloat(maxPrice) })
    };
    if (availability) filters['availability.day'] = availability;

    let tutors = await User.find(filters).lean();

    if (minRating) {
      const tutorIds = tutors.map(t => t._id);
      const ratings = await Review.aggregate([
        { $match: { tutor: { $in: tutorIds } } },
        { $group: { _id: '$tutor', avgRating: { $avg: '$rating' } } },
        { $match: { avgRating: { $gte: parseFloat(minRating) } } }
      ]);
      const allowedIds = ratings.map(r => r._id.toString());
      tutors = tutors.filter(t => allowedIds.includes(t._id.toString()));
    }

    res.json(tutors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch tutors' });
  }
};

export const getTutorSessionsAndEarnings = async (req, res) => {
  try {
    const tutorId = req.user.id;

    const sessions = await Session.find({ tutor: tutorId })
      .populate('student', 'name email')
      .sort({ date: 1 });

    const earnings = {
      total: 0,
      completed: 0,
      pending: 0
    };

    sessions.forEach(session => {
      if (session.status === 'completed') {
        earnings.completed += session.price;
        earnings.total += session.price;
      } else if (session.status === 'confirmed') {
        earnings.pending += session.price;
      }
    });

    res.json({ sessions, earnings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch tutor sessions' });
  }
};

export const markSessionCompleted = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    session.status = 'completed';
    await session.save();

    return res.status(200).json({ message: 'Session marked as completed' }); // ✅ This line must exist
  } catch (error) {
    console.error('Complete Error:', error);
    res.status(500).json({ message: 'Failed to mark session as completed' });
  }
};


export const getTutorById = async (req, res) => {
  try {
    const tutor = await User.findById(req.params.id).select('-password');
    if (!tutor || tutor.role !== 'tutor') {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.json(tutor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch tutor profile' });
  }
};