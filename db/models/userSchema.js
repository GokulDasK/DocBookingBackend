import { Schema, model } from 'mongoose';

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  address: {
    type: String,
  },
});

const User = model('User', userSchema);
export default User;
