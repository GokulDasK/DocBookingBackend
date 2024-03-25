import express from 'express';
import Departments from '../../db/models/departmentSchema.js';
import { checkToken } from '../../middlewares/checkToken.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const departments = await Departments.find();
    return res.status(200).json(departments);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const departments = await Departments.findById(id);
    return res.status(200).json(departments);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const deparment = await Departments.create(req.body);
    res.status(200).json(deparment);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const index = await Departments.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    await Departments.findByIdAndUpdate(id, body);
    res.json({ message: 'Updated' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
