import express  from "express";
import { validationMiddleware } from "../../middleware/Validation.Middelware";
import { VcategorySchema, VUCategorySchema } from "./category.validation";
import { CategoryController } from "./category.controller";

const route = express.Router();


route.post('/categories', validationMiddleware(VcategorySchema), CategoryController.createCategory );
route.get('/categories/:categoryId?', CategoryController.getCategories);
route.put('/categories/:categoryId', validationMiddleware(VUCategorySchema), CategoryController.updateCategory);

route.delete('/categories/:categoryId', CategoryController.categoryDelete);

export const CategoryRoute = route;