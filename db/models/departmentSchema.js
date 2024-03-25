import { Schema, model } from 'mongoose';

const departmentSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Department = model('Department', departmentSchema);
export default Department;
