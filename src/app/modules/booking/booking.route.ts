import express from 'express';	
import auth from '../../middleware/auth';
import { validationMiddleware } from '../../middleware/Validation.Middelware';
import { BookingValidation } from './booking.validation';
import { BookingController } from './booking.controller';


const router = express.Router();


router.post('/bookings', auth('user'), validationMiddleware(BookingValidation.BookingInsertValidation), BookingController.bookingInsert);
router.get("/check-availability", auth('user'), BookingController.bookingGets);

router.get('/bookings', auth('admin'), BookingController.bookingGetsByAdmin);
router.get('/bookings/user', auth('user'), BookingController.bookingGetsByUser);

router.put('/bookings/:id', auth('user'), BookingController.bookingUpdate);

router.delete('/bookings/:id', auth('user'), BookingController.bookingDelete);

router.get('/bookings/:id', auth('user'), BookingController.bookingGetById);








export const bookingRouter = router;