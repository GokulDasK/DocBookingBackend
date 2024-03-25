import express, { json } from 'express';
import Users from '../../db/models/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkToken } from '../../middlewares/checkToken.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const body = req.body;
    const user = await Users.findOne({ email: body.email });
    if (user) {
      return res
        .status(400)
        .json({ message: 'User with same Email already exists' });
    }
    if (body.password != body.confirmPassword) {
      return res.status(400).json({ message: 'Password doesnot match' });
    }
    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;
    const addUser = await Users.create(req.body);
    res.status(201).json(addUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const body = req.body;
    const user = await Users.findOne({ email: body.email });
    if (!user) {
      return res.status(403) / json({ message: 'Email or Password incorrect' });
    }
    const ismatching = await bcrypt.compare(body.password, user.password);
    if (!ismatching) {
      return res.status(403) / json({ message: 'Email or Password incorrect' });
    }
    const token = jwt.sign(
      { id: user._id, role: 'USER' },
      'asdfghjklmnbvcxzqwertyuiop',
      { expiresIn: '7d' }
    );
    res.status(200).json({ message: 'Logged In', token });
  } catch (error) {
    res.status(500), json(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const user = await Users.find();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const deparment = await Users.create(req.body);
    res.status(200).json(deparment);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const index = await Users.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    await Users.findByIdAndUpdate(id, body);
    res.json({ message: 'Updated' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
