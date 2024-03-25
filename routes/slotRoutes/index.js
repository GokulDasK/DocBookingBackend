import express from 'express';
import Slots from '../../db/models/slotSchema.js';
import { checkToken } from '../../middlewares/checkToken.js';

const router = express.Router();

// get Slots
router.get('/', async (req, res) => {
  try {
    const slot = await Slots.find();
    return res.status(200).json(slot);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// get slot by doctor id

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const slot = await Slots.find({ doctor: id });
    return res.status(200).json(slot);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// add slot

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const deparment = await Slots.create(body);
    res.status(200).json(deparment);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete slot

router.delete('/:id', async (req, res) => {
  try {
    const slot = await Slots.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// edit slot
router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const body = { ...req.body };
    await Slots.findByIdAndUpdate(id, body);
    res.json({ message: 'Updated' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
