import express from 'express';	
import auth from '../../middleware/auth';
import { validationMiddleware } from '../../middleware/Validation.Middelware';
import { BookingValidation } from './booking.validation';
import { BookingController } from './booking.controller';


const router = express.Router();

router.get('/booking', (req, res) => {
    res.send('Booking route');
});

router.post('/booking', auth('user'), validationMiddleware(BookingValidation.BookingInsertValidation), BookingController.bookingInsert);




export const bookingRouter = router;