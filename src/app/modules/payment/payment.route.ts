
import express from 'express';
import { PaymentController } from './payment.controller';
const router = express.Router();

router.post('/success', PaymentController.paymentSuccess);
router.post('/fail', PaymentController.paymentFailed);



export const paymentRouter = router;