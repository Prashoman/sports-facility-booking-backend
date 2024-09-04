import { z } from "zod";




const checkoutValidation = z.object({
    body: z.object({
        name:z.string(),
        email:z.string(),
        address:z.string(),
        phone:z.string(),
        paymentMethod:z.string(),
        cart:z.array(z.object({
            productId:z.string(),
            quantity:z.number()
        })),
        total:z.number() 
    })
})


export const CheckOutFromValidation={
    checkoutValidation
}