import express from 'express';
import Prescriptions from '../../db/models/prescriptionSchema.js';
import { checkToken } from '../../middlewares/checkToken.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const prescription = await Prescriptions.find();
    return res.status(200).json(prescription);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// get prescription by appointment

router.get(
  '/appointment/:id',
  checkToken(['DOCTOR', 'USER']),
  async (req, res) => {
    try {
      const id = req.params.id;
      const prescription = await Prescriptions.findById({ appointment: id });
      return res.status(200).json(prescription);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

router.post('/', checkToken(['DOCTOR']), async (req, res) => {
  try {
    const deparment = await Prescriptions.create(req.body);
    res.status(200).json(deparment);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const index = await Prescriptions.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    await Prescriptions.findByIdAndUpdate(id, body);
    res.json({ message: 'Updated' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
