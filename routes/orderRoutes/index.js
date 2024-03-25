import express from 'express';
import Orders from '../../db/models/orderSchema.js';
import { checkToken } from '../../middlewares/checkToken.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const order = await Orders.find();
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Orders.findById(id);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/', checkToken(['USER']), async (req, res) => {
  try {
    const order = await Orders.create(req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const index = await Orders.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    await Orders.findByIdAndUpdate(id, body);
    res.json({ message: 'Updated' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
