import express  from "express";
import { CheckOutFromValidation } from "./checkout.validation";
import { validationMiddleware } from "../../middleware/Validation.Middelware";
import { checkoutController } from "./checkout.controller";

const route = express.Router();


route.post('/checkouts', validationMiddleware(CheckOutFromValidation.checkoutValidation),checkoutController.createOrder);

export const CheckOutRoute = route;