import { Types } from "mongoose";

export type TCart = {
    productId: Types.ObjectId;
    quantity: number;
}


export type TCheckoutInfo = {
    name: string;
    email: string;
    address: string;
    phone: string;
    paymentMethod: string;
    cart:[TCart],
    total:number
}