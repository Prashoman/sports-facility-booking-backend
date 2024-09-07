import { Request, Response } from "express";
import catchAsyn from "../../../utils/catchAsyn";
import { BookingService } from "./booking.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const bookingInsert = catchAsyn(async (req: Request, res: Response) => {
  const booking = req.body;
  const { id } = req.user;
  const result = await BookingService.bookingInsertIntoDb(booking, id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Booking created successfully",
  });
});

const bookingGets = catchAsyn(async (req: Request, res: Response) => {
  const date = req.query.date as string | undefined;
  const result = await BookingService.bookingsGetFromDB(date);
  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      data: result,
      message: "No booking found",
    });

    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Availability checked successfully",
  });
});

const bookingGetsByAdmin = catchAsyn(async (req: Request, res: Response) => {
  const userRole = req.user.userRole;
  const result = await BookingService.getBookingByAdminFormDB(userRole);
  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      data: result,
      message: "No booking found",
    });
    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Bookings retrieved successfully",
  });
});

const bookingGetsByUser = catchAsyn(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await BookingService.getBookingByUserFormDB(userId);

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      data: result,
      message: "No booking found",
    });
    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Bookings retrieved successfully",
  });
});
const bookingDelete = catchAsyn(async (req: Request, res: Response) => {
  const bookingId = req.params.id;
  const result = await BookingService.deleteBookingFromDB(bookingId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Booking cancelled successfully",
  });
});

export const BookingController = {
  bookingInsert,
  bookingGets,
  bookingGetsByAdmin,
  bookingGetsByUser,
  bookingDelete,
};
