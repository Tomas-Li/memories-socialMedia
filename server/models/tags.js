import mongoose from 'mongoose';

const tagSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true
  }
});

export default mongoose.model('Tags', tagSchema);