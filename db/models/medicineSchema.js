import { Schema, model } from 'mongoose';

const medSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },
  expdate: {
    type: Date,
    required: true,
  },
});

const Med = model('Med', medSchema);

export default Med;
