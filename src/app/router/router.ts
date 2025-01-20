import { Router } from "express";

import { UserRoute } from "../modules/user/user.route";
import { FacilityRoute } from "../modules/facility/facility.route";
import { bookingRouter } from "../modules/booking/booking.route";
import {  paymentRouter } from "../modules/payment/payment.route";

const router = Router();
const modulerRoute = [
  {
    path:"/auth",
    route: UserRoute
  },
  {
    path:"",
    route:FacilityRoute
  },
  {
    path:"",
    route:bookingRouter
  },
  {
    path:"/payment",
    route:paymentRouter
  }
];

modulerRoute.forEach((root) => {
  router.use(root.path, root.route);
});

export default router;

