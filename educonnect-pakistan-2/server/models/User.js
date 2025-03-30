import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'tutor', 'admin'], default: 'student' },
  qualifications: String,
  bio: String,
  subjects: [String],
  hourlyRate: Number,
  availability: [{ day: String, timeSlots: [String] }],
  preferences: { type: String, enum: ['online', 'in-person', 'both'], default: 'online' },
  profilePicture: String,
  isVerified: { type: Boolean, default: false },
  earnings: {
    total: { type: Number, default: 0 },
    pending: { type: Number, default: 0 }
  }
});

export default mongoose.model('User', userSchema);