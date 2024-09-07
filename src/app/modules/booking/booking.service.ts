import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Facility } from "../facility/facility.model";
import timeToConvertHours from "../../../utils/timeToConvertHours";
import { Booking } from "./booking.model";
import { dateFormat, getFormattedTodayDate } from "./booking.constent";

const bookingInsertIntoDb = async (
  payload: Partial<TBooking>,
  userId: string
) => {
  const exitsUser = await User.findById(userId);
  if (!exitsUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const exitsFacility = await Facility.findById(payload.facility);
  if (!exitsFacility) {
    throw new AppError(httpStatus.NOT_FOUND, "Facility not found");
  }

  const exitsDate = await Booking.find({
    date: payload.date,
  }).select("startTime endTime");
  exitsDate.forEach((element) => {
    const exitsEndTime = new Date(`2000-05-07T${element.endTime}:00`);
    const payloadStartTime = new Date(`2000-05-07T${payload.startTime}:00`);
    const payloadEndTime = new Date(`2000-05-07T${payload.endTime}:00`);
    const exitsStartTime = new Date(`2000-05-07T${element.startTime}:00`);
    if (payloadStartTime < exitsEndTime && payloadEndTime > exitsStartTime) {
      throw new AppError(httpStatus.BAD_REQUEST, "This slot is already booked");
    }
  });

  const time = timeToConvertHours(
    payload.startTime as string,
    payload.endTime as string
  );
  const perHourPrice = exitsFacility.pricePerHour;
  const totalPrice = Number(time) * perHourPrice;
  payload.payableAmount = totalPrice;
  payload.user = userId as any;
  const result = await Booking.create(payload);
  return result;
};

const bookingsGetFromDB = async (date: string | undefined) => {
  if (!date) {
    const result = await Booking.find().populate("user").populate("facility");
    return result;
  }

  const DateFormatCheck = dateFormat.test(date);
  if (!DateFormatCheck) {

    const todayDate = getFormattedTodayDate(new Date());
    console.log("Today Date :",todayDate);
    
    const result = await Booking.find({ date: todayDate }).select("startTime endTime");
    return result;
  }
  const result = await Booking.find({ date }).select("startTime endTime");
  return result;
};

const getBookingByAdminFormDB = async (userRole: string) => {
  if (userRole !== "admin") {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }
  const result = await Booking.find().populate("user").populate("facility");
  return result;
}

const getBookingByUserFormDB = async (userId: string) => {
  const exitsUser = await User.findById(userId);
  if (!exitsUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const result = await Booking.find({ user: userId }).populate("facility");
  return result;
}

const deleteBookingFromDB = async (bookingId: string) => {

  const result = await Booking.findByIdAndUpdate(bookingId, { isBooked: "canceled" }, { new: true });
  return result;
}

export const BookingService = {
  bookingInsertIntoDb,
  bookingsGetFromDB,
  getBookingByAdminFormDB,
  getBookingByUserFormDB,
  deleteBookingFromDB
};
