import express from 'express';
import Doctors from '../../db/models/doctorSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkToken } from '../../middlewares/checkToken.js';

const router = express.Router();

// doctor sigh up

router.post('/signup', async (req, res) => {
  try {
    const body = req.body;
    const doctor = await Doctors.findOne({ email: body.email });
    if (doctor) {
      return res
        .status(400)
        .json({ message: 'Doctor with same Email already exists' });
    }
    if (body.password != body.confirmPassword) {
      return res.status(400).json({ message: 'Password doesnot match' });
    }
    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;
    const addDoc = await Doctors.create(body);
    res.status(201).json(addDoc);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// doctor login

router.post('/login', async (req, res) => {
  try {
    const body = req.body;
    const doctor = await Doctors.findOne({ email: body.email });
    if (!doctor) {
      return res.status(403).json({ message: 'Email or Password incorrect' });
    }

    const ismatching = await bcrypt.compare(body.password, doctor.password);
    if (!ismatching) {
      return res.status(403).json({ message: 'Email or Password incorrect' });
    }
    const token = jwt.sign(
      { id: doctor._id, role: 'DOCTOR' },
      'asdfghjklmnbvcxzqwertyuiop',
      { expiresIn: '7d' }
    );
    res.status(200).json({ message: 'logged In', token });
  } catch (error) {
    res.status(500).json(error);
  }
});

// get doctor by department Id

router.get('/department/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const doctors = await Doctors.find({ department: id });
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get doctors
router.get('/', async (req, res) => {
  try {
    const doctor = await Doctors.find();
    return res.status(200).json(doctor);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// get doctor by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctors.findById(id);
    return res.status(200).json(doctor);
  } catch (error) {
    return res.status(500).json(error);
  }
});
// add doctor
router.post('/', async (req, res) => {
  try {
    const doctor = await Doctors.create(req.body);
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete doctor
router.delete('/:id', async (req, res) => {
  try {
    const index = await Doctors.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// edit doctor
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    await Doctors.findByIdAndUpdate(id, body);
    res.json({ message: 'Updated' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
