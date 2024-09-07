import { z } from "zod";
import { dateFormat } from "./booking.constent";

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);



const BookingInsertValidation = z.object({
  body: z.object({
    date: z.string().refine((val) => dateFormat.test(val), {
      message: "Invalid date format, expected YYYY-MM-DD. Example:2024-06-15",
    }),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
    facility: z.string().nonempty(),
  }).refine(
    (body)=>{
      const startTime = new Date(`2000-05-07T${body.startTime}:00`);
      const endTime = new Date(`2000-05-07T${body.endTime}:00`);
      return endTime > startTime;
    },{
      message: 'Start time should be before End time !  ',
    }
  )
});

export const BookingValidation = {
    BookingInsertValidation
}
