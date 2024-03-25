import { Schema, model } from 'mongoose';

const slotSchema = Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  time: {
    type: String,
  },
  status: {
    type: String,
    default: 'FREE',
    enum: ['BOOKED', 'FREE'],
  },
});

const Slot = model('Slot', slotSchema);

export default Slot;
