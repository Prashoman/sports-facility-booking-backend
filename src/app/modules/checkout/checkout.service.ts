import { Product } from "../product/product.model";
import { TCheckoutInfo } from "./checkout.interface";
import { checkOut } from "./checkout.model";

const createOrderToDB = async (payload: TCheckoutInfo)=>{
    const product = payload.cart;
    product.forEach(async (item)=>{
         await Product.findByIdAndUpdate(item.productId,{$inc:{quantity:-item.quantity}});
    })
    const result = await checkOut.create(payload);
    return result;
}

export const checkoutService = {
    createOrderToDB
}