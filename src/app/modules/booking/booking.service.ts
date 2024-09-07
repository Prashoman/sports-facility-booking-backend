import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Facility } from "../facility/facility.model";
import timeToConvertHours from "../../../utils/timeToConvertHours";
import { Booking } from "./booking.model";

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

export const BookingService = {
  bookingInsertIntoDb,
};
