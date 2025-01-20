import { Booking } from "../booking/booking.model";
import { User } from "../user/user.model";

const paymentSuccessToDB = async (paymentData: number) => {
  const bookingInfo = await Booking.findOne({ tranId: paymentData });
  if (bookingInfo?.status === false) {
    await Booking.findOneAndUpdate({ tranId: paymentData }, { status: true });
  }

  if(bookingInfo?.status === true){
    return {
      message: "Payment already done",
    };
  }

  const userInfo = await User.findById(bookingInfo?.user);
  return {
    userInfo,
    bookingInfo,
  };
};

export const PaymentService = {
    paymentSuccessToDB,
}