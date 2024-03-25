import express from 'express';
import Meds from '../../db/models/medicineSchema.js';
import { checkToken } from '../../middlewares/checkToken.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const med = await Meds.find();
    return res.status(200).json(med);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const med = await Meds.findById(id);
    return res.status(200).json(med);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/', checkToken(['DOCTOR']), async (req, res) => {
  try {
    const deparment = await Meds.create(req.body);
    res.status(200).json(deparment);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', checkToken(['DOCTOR']), async (req, res) => {
  try {
    const index = await Meds.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.patch('/:id',  checkToken(['DOCTOR']),async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    await Meds.findByIdAndUpdate(id, body);
    res.json({ message: 'Updated' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
