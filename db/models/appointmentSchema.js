import { Schema, model } from 'mongoose';

const appointmentSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  slot: {
    type: Schema.Types.ObjectId,
    ref: 'Slot',
  },
  status: {
    type: String,
    default: 'BOOKED',
    enum: ['BOOKED', 'CANCELLED'],
  },
});

const Appointment = model('Appointment', appointmentSchema);

export default Appointment;
