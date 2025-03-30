import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  type: String,
  data: mongoose.Schema.Types.Mixed,
  generatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Report', reportSchema);
