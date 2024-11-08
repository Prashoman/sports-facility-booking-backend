import { z } from "zod";

const FacilityCreateValidation = z.object({
    body:z.object({
        name:z.string().nonempty(),
        image:z.string().nonempty(),
        description:z.string().nonempty(),
        pricePerHour:z.number().nonnegative(),
        location:z.string().nonempty(),
        isDeleted:z.boolean().optional()
    })
})

const FacilityUpdateValidation = z.object({
    body:z.object({
        name:z.string().nonempty().optional(),
        description:z.string().nonempty().optional(),
        pricePerHour:z.number().nonnegative().optional(),
        location:z.string().nonempty().optional(),
        image:z.string().nonempty().optional(),
        isDeleted:z.boolean().optional()
    })
})

export const FacilityValidation = {
    FacilityCreateValidation,
    FacilityUpdateValidation
}