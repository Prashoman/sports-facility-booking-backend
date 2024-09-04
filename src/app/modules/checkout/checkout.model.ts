import { model, Schema } from "mongoose";
import { TCheckoutInfo } from "./checkout.interface";


const checkoutSchema = new Schema<TCheckoutInfo>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    cart: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
export const checkOut = model<TCheckoutInfo>("checkOut", checkoutSchema);
