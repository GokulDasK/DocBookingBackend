import express from 'express';
import departmentRoutes from './departmentRoutes/index.js';
import doctorRoutes from './docterRoutes/index.js';
import orderRoutes from './orderRoutes/index.js';
import imgRoutes from './imageRoutes/index.js';
import appointmentRoutes from './appointmentRpoute/index.js';
import medicineRoutes from './medicineRoutes/index.js';
import prescriptionRoutes from './prescriptionRoutes/index.js';
import slotRoutes from './slotRoutes/index.js';
import userRoutes from './userRoutes/index.js';

const router = express.Router();

router.use('/appointment', appointmentRoutes);
router.use('/department', departmentRoutes);
router.use('/user', userRoutes);
router.use('/doctor', doctorRoutes);
router.use('/image', imgRoutes);
router.use('/medicine', medicineRoutes);
router.use('/order', orderRoutes);
router.use('/prescription', prescriptionRoutes);
router.use('/slot', slotRoutes);

export default router;
