import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>(
  {
    categoryName: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);
export const Category = model<TCategory>('Category', categorySchema);
