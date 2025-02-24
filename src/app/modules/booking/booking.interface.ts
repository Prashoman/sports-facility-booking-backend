import { Types } from "mongoose";

// 2024-06-15
// 10:00
// confirmed, unconfirmed, or canceled
export type TIsBooked = "confirmed" | "unconfirmed" | "canceled";


export type TBooking = {
    date: string;
    startTime: string;
    endTime: string;
    user: Types.ObjectId;
    facility: Types.ObjectId;
    tranId: string;
    status:boolean;
    payableAmount: number;
    isBooked:TIsBooked;
    userInfo?: any;
}