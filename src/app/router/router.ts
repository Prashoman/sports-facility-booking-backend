import { Router } from "express";
import { CategoryRoute } from "../modules/category/category.route";
import { ProductRoute } from "../modules/product/product.route";
import { CheckOutRoute } from "../modules/checkout/checkout.route";


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
  }
];

modulerRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

