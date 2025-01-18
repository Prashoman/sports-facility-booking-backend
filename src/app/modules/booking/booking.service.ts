import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Facility } from "../facility/facility.model";
import timeToConvertHours from "../../../utils/timeToConvertHours";
import { Booking } from "./booking.model";
import { dateFormat, getFormattedTodayDate } from "./booking.constent";
import { getAvailableTimeCalculate } from "../../../utils/getAvailableTime";
import { todayDateAndInputDate } from "../../../utils/todayDateAndInputDate";
import { paymentInitiate } from "../../../utils/payment.utils";


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

  const checkDate = todayDateAndInputDate(payload.date as string);
  if (checkDate.givenDate < checkDate.today) {
    throw new AppError(httpStatus.BAD_REQUEST, "You can't book for past date");
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
  console.log("Time :", time);
  
  const perHourPrice = exitsFacility.pricePerHour;
  const totalPrice = Number(time) * perHourPrice;
  console.log("Per Hour Price :", perHourPrice);
  console.log("Total Price :", totalPrice);
  
  payload.payableAmount = totalPrice;
  payload.user = userId as any;
  payload.tranId = new Date(Date.now());
  await Booking.create(payload);

  
  payload.userInfo = exitsUser;

  // console.log("Payload :", payload);
  
 const paymentResponse= paymentInitiate(payload)
  return paymentResponse;
};

// get available time slot
const bookingsGetFromDB = async (
  date: string | undefined,
  facilityId: string | undefined
) => {
  const initialTime = [
    {
      startTime: "01:00",
      endTime: "24:00",
    },
  ];

  //facilityId error
  if (!facilityId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Facility  NOt Found");
  }
  const exitsFacility = await Facility.findById(facilityId);
  // not exits facility error
  if (!exitsFacility) {
    throw new AppError(httpStatus.NOT_FOUND, "Facility not found");
  }

  if (!date && facilityId) {
    const result = await Booking.find({
      $and: [
        {
          facility: facilityId,
        },
        {
          date: getFormattedTodayDate(new Date()),
        },
      ],
    }).select("startTime endTime");
    const availableSlots = getAvailableTimeCalculate(initialTime, result);
    return availableSlots;
  } else {
    const checkDate = todayDateAndInputDate(date as string);
    if (checkDate.givenDate < checkDate.today) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "You can't check availability for past date"
      );
    }
    const result = await Booking.find({
      $and: [
        {
          facility: facilityId,
        },
        {
          date,
        },
      ],
    }).select("startTime endTime");
    const availableSlots = getAvailableTimeCalculate(initialTime, result);
    return availableSlots;
  }
};

const getBookingByAdminFormDB = async (userRole: string) => {
  if (userRole !== "admin") {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }
  const result = await Booking.find().populate("user").populate("facility");
  return result;
};

const getBookingByUserFormDB = async (userId: string) => {
  const exitsUser = await User.findById(userId);
  if (!exitsUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const result = await Booking.find({ user: userId }).populate("facility");
  return result;
};

const deleteBookingFromDB = async (bookingId: string) => {
  const result = await Booking.findByIdAndUpdate(
    bookingId,
    { isBooked: "canceled" },
    { new: true }
  );
  return result;
};

const userBookingCancelInToDB = async (bookingId: string, userId: string) => {
  const exitsUser = await User.findById(userId);
  if (!exitsUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const result = await Booking.findOneAndUpdate(
    { _id: bookingId, user: userId },
    { isBooked: "canceled" },
    { new: true }
  );
  return result;
};

const getBookingByIdFromDB = async (bookingId: string, id: string) => {
  const exitsUser = await User.findById(id);
  if (!exitsUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const result = await Booking.findOne({ _id: bookingId, user: id }).populate(
    "facility"
  );
  return result;
};

export const BookingService = {
  bookingInsertIntoDb,
  bookingsGetFromDB,
  getBookingByAdminFormDB,
  getBookingByUserFormDB,
  deleteBookingFromDB,
  userBookingCancelInToDB,
  getBookingByIdFromDB,
};
