import { Router } from "express";
import { CategoryRoute } from "../modules/category/category.route";
import { ProductRoute } from "../modules/product/product.route";
import { CheckOutRoute } from "../modules/checkout/checkout.route";
import { UserRoute } from "../modules/user/user.route";
import { FacilityRoute } from "../modules/facility/facility.route";
import { bookingRouter } from "../modules/booking/booking.route";

const router = Router();
const modulerRoute = [
  {
    path: "/category",
    route: CategoryRoute,
  },
  {
    path: "/product",
    route: ProductRoute,
  },
  {
    path:"",
    route:CheckOutRoute
  },
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
  }
];

modulerRoute.forEach((root) => {
  router.use(root.path, root.route);
});

export default router;

