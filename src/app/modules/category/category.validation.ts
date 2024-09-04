import { optional, z } from "zod";


export const VcategorySchema = z.object({
    body: z.object({
        categoryName: z.string({
            invalid_type_error: "Category name must be a string",
        }).nonempty()
    })
     
})
export const VUCategorySchema = z.object({
    body: z.object({
        categoryName: z.string({
            invalid_type_error: "Category name must be a string",          
        }).optional()
    })
     
})