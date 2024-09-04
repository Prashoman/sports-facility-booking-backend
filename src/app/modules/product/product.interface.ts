import { Types } from "mongoose";

export type  TProduct = {
    categoryId: Types.ObjectId;
    title: string;
    price: number;
    quantity: number;
    rating: number;
    image: string;
    description: string;
  }
  