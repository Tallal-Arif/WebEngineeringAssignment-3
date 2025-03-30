import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: Date,
  time: String,
  type: { type: String, enum: ['online', 'in-person'] },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  price: Number,
});

export default mongoose.model('Session', sessionSchema);

