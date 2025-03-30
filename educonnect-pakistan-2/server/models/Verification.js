import mongoose from 'mongoose';

const verificationRequestSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  documents: [String],
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminComment: String
});

export default mongoose.model('VerificationRequest', verificationRequestSchema);