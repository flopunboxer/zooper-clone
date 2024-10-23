import mongoose from 'mongoose';

// Check if the model is already defined to prevent overwriting
const ChildSchema = new mongoose.Schema({
  name: String,
  gender: String,
  birth_day: String,
  birth_month: String,
  birth_year: String
});

// Check if the model already exists before creating a new one
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    // unique: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  children: [ChildSchema],
  signature: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Check if the model exists before creating it
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;