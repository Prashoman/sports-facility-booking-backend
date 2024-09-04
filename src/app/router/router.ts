import { Router } from "express";
import { CategoryRoute } from "../modules/category/category.route";
import { ProductRoute } from "../modules/product/product.route";
import { CheckOutRoute } from "../modules/checkout/checkout.route";
import { UserRoute } from "../modules/user/user.route";



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
  }
];

modulerRoute.forEach((root) => {
  router.use(root.path, root.route);
});

export default router;

