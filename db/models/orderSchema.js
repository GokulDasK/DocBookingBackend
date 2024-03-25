import { Schema, model } from 'mongoose';

const orderSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  details: {
    type: Schema.Types.ObjectId,
    ref: 'Prescription',
  },
  totalprice: {
    type: Number,
    required: true,
  },
});

const Order = model('Order', orderSchema);

export default Order;
