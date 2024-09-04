import { z } from "zod";


const VProduct = z.object({
    body : z.object({
        title: z.string({
            invalid_type_error:"Product name must be a string"
        }),
        categoryId: z.string({
            invalid_type_error:"Category id must be a string"
        }),
        price: z.number({
            invalid_type_error:"Price must be a number"
        }),
        quantity: z.number({
            invalid_type_error:"Quantity must be a number"
        }),
        description: z.string({
            invalid_type_error:"Description must be a string"
        }),
        image: z.string({
            invalid_type_error:"Product image must be a string"
        })
    })
})

const VUProduct = z.object({
    body: z.object({
        title: z.string({
            invalid_type_error:"Product name must be a string"
        }).optional(),
        categoryId: z.string({
            invalid_type_error:"Category id must be a string"
        }).optional(),
        price: z.number({
            invalid_type_error:"Price must be a number"
        }).optional(),
        quantity: z.number({
            invalid_type_error:"Quantity must be a number"
        }).optional(),
        description: z.string({
            invalid_type_error:"Description must be a string"
        }).optional(),
        image: z.string({
            invalid_type_error:"Product image must be a string"
        }).optional()
    })
})

export const ProductValidation={
    VProduct,
    VUProduct
}