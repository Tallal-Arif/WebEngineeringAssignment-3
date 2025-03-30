import Session from '../models/Session.js';
import Review from '../models/Review.js';
import User from '../models/User.js';

export const createSession = async (req, res) => {
    try {
      const { tutorId, date, time, type } = req.body;
      const studentId = req.user.id;
  
      const sessionDate = new Date(date);
      if (isNaN(sessionDate)) {
        return res.status(400).json({ message: 'Invalid date format' });
      }
  
      const tutor = await User.findById(tutorId);
      if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
  
      const existing = await Session.findOne({
        tutor: tutorId,
        date: sessionDate,
        time,
        status: { $ne: 'cancelled' }
      });
  
      if (existing) {
        return res.status(400).json({ message: 'This time slot is already booked.' });
      }
  
      const session = await Session.create({
        student: studentId,
        tutor: tutorId,
        date: sessionDate,
        time,
        type,
        price: tutor.hourlyRate,
        status: 'confirmed'
      });
  
      res.status(201).json({ message: 'Session booked successfully', session });
    } catch (error) {
      console.error('Booking Error:', error);
      res.status(500).json({ message: 'Failed to book session' });
    }
  };

export const getStudentSessions = async (req, res) => {
  try {
    const studentId = req.user.id;
    const sessions = await Session.find({ student: studentId })
      .populate('tutor', 'name subjects hourlyRate')
      .sort({ date: 1 });

    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch sessions' });
  }
};

export const updateSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const { date, time } = req.body;
    const updatedDate = new Date(date);

    if (isNaN(updatedDate)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    if (session.status === 'completed') {
      return res.status(400).json({ message: 'Cannot update a completed session' });
    }

    session.date = updatedDate;
    session.time = time;
    session.status = 'confirmed';
    await session.save();

    res.json({ message: 'Session updated', session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update session' });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    if (session.status === 'completed') {
      return res.status(400).json({ message: 'Cannot delete a completed session' });
    }

    session.status = 'cancelled';
    await session.save();
    res.json({ message: 'Session cancelled' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to cancel session' });
  }
};

export const getTutorSessions = async (req, res) => {
    try {
      const tutorId = req.user.id;
      const sessions = await Session.find({ tutor: tutorId })
        .populate('student', 'name email')
        .sort({ date: 1 });
  
      res.json(sessions);
    } catch (error) {
      console.error('Tutor session error:', error);
      res.status(500).json({ message: 'Failed to fetch tutor sessions' });
    }
  };