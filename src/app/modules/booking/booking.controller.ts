import { Request, Response } from "express";
import catchAsyn from "../../../utils/catchAsyn";
import { BookingService } from "./booking.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";


const bookingInsert = catchAsyn(async (req: Request, res: Response) => {
   const booking = req.body;
   const {id} = req.user;
   const result = await BookingService.bookingInsertIntoDb(booking, id);
   sendResponse(res,{
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: "Booking created successfully",
    });

   
});


export const BookingController = {
   bookingInsert
}