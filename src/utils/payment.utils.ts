import axios from "axios";
import config from "../app/config";
import dotenv from "dotenv";
import AppError from "../app/error/AppError";

dotenv.config();

export const paymentInitiate = async (payload: any) => {
  try {
    const response = await axios.post(`${config.payment_base_url}`, {
      store_id: process.env.PAYMENT_STORE_ID,
      signature_key: config.payment_signature_key,
      tran_id: payload?.tranId,
      success_url: `https://sports-facility-booking-platform-app.vercel.app/payment-success?transaction_id=${payload?.tranId}`,
      fail_url: "http://www.merchantdomain.com/faile dpage.html",
      cancel_url: "http://localhost:5173",
      amount: payload.payableAmount,
      currency: "BDT",
      desc: "Merchant Registration Payment",
      cus_name: payload?.userInfo?.name,
      cus_email: payload?.userInfo?.email,
      cus_add1: payload?.userInfo?.address,
      cus_add2: "Mohakhali DOHS",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1206",
      cus_country: "Bangladesh",
      cus_phone: payload?.userInfo?.phone,
      type: "json",
    });
    return response.data;
  } catch (error) {
    throw new AppError(400, "Payment failed");
  }
};
