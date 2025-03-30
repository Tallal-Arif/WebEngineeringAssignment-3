import Verification from '../models/Verification.js';
import Session from '../models/Session.js';
import User from '../models/User.js';

export const getAllVerificationRequests = async (req, res) => {
  try {
    const requests = await Verification.find()
      .populate('tutor', 'name email qualifications isVerified');
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch verification requests' });
  }
};

export const updateVerificationStatus = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { status, comment } = req.body;

    const request = await Verification.findByIdAndUpdate(
      requestId,
      { status, adminComment: comment },
      { new: true }
    );

    if (!request) return res.status(404).json({ message: 'Request not found' });

    if (status === 'approved') {
      await User.findByIdAndUpdate(request.tutor, { isVerified: true });
    }

    res.json({ message: 'Verification status updated', request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update verification status' });
  }
};

export const getAdminDashboardReport = async (req, res) => {
  try {
    const totalTutors = await User.countDocuments({ role: 'tutor' });
    const verifiedTutors = await User.countDocuments({ role: 'tutor', isVerified: true });
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalSessions = await Session.countDocuments();
    const completedSessions = await Session.countDocuments({ status: 'completed' });
    const totalEarnings = await Session.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);

    res.json({
      totalTutors,
      verifiedTutors,
      totalStudents,
      totalSessions,
      completedSessions,
      totalEarnings: totalEarnings[0]?.total || 0
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch admin report' });
  }
};
