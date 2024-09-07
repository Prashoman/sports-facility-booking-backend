import { model, Schema } from "mongoose";

import bcrypt from 'bcrypt';
import config from "../../config";
import { TBooking } from "./booking.interface";




const bookingSchema = new Schema<TBooking>(
  {
    
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    facility: { type: Schema.Types.ObjectId, ref: 'Facility', required: true },
    payableAmount: { type: Number, required: true },
    isBooked: {
      type: String,
      required: true,
      enum: ["confirmed", "unconfirmed", "canceled"],
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = model<TBooking>("Booking", bookingSchema);



