import express from 'express';
import Appointments from '../../db/models/appointmentSchema.js';
import Slot from '../../db/models/slotSchema.js';
import { checkToken } from '../../middlewares/checkToken.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// list appointment by doctor id

router.get('/doctor/:id', async (req, res) => {
  try {
    const id = req.params;
    const appointment = await Appointments.find({ doctor: id });
    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// list appointment by user id

router.get('/user/:id', async (req, res) => {
  try {
    const id = req.params;
    const appointment = await Appointments.findById({ user: id });
    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// create appointment

router.post('/', async (req, res) => {
  try {
    const appointment = await Appointments.create(req.body);
    const slot = await Slot.findByIdAndUpdate(req.body.slot, {
      status: 'BOOKED',
    });

    // maill

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gdask101@gmail.com',
        pass: 'xiqu bhqn hojk ecgq',
      },
    });

    const mailOptions = {
      from: ' gdask101@gmail.com',
      // to: 'gdask77@gmail.com',
      subject: 'confirmation mail',
      text: 'Your booking has been confirmed',
    };

    transporter.sendMail(mailOptions);

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update appointment

router.patch('/update', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const body = { ...req.body };
    await Appointments.findOneAndUpdate(

      { slot: body.slot },
      {
        status: 'CANCELLED',
      }
    );
    const slot = await Slot.findByIdAndUpdate(body.slot, {
      status: 'FREE',
    });
    res.json({ message: 'Updated' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// getmail

router.get('/pdf/:id', async (req, res) => {
  const appointment = await Appointments.findById(req.params.id).populate([
    'slot',
    'user',
    'doctor',
  ]);
  console.log(appointment);
  res.render('pdf.ejs', { appointment: appointment });
});

export default router;
