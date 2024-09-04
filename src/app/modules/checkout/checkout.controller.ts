import { Request, Response } from "express";
import { checkoutService } from "./checkout.service";


const createOrder = async (req: Request, res: Response) => {
    try {
        const order = req.body;
        const result = await checkoutService.createOrderToDB(order);
        return res.status(201).json({
            message: "Order created successfully",
            data: result
        })
    } catch (err: any) {
        return res.status(400).json({
            message: "Order not created",
            data: []
        })
    }
}

export const checkoutController = {
    createOrder
}