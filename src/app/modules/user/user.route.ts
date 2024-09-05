import  express  from "express";
import { UserController } from "./user.controller";
import { validationMiddleware } from "../../middleware/Validation.Middelware";
import { UserValidation } from "./user.validation";

const route = express.Router();

route.get('/users', UserController.getAllUsers);

route.post('/signup', validationMiddleware(UserValidation.UserCreateValidation), UserController.userSignUp);

route.post('/login', validationMiddleware(UserValidation.UserLoginValidation), UserController.userLogin);
export const UserRoute = route;