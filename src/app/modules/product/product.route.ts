
import express from 'express';
import { validationMiddleware } from '../../middleware/Validation.Middelware';
import { ProductValidation } from './product.validation';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/products', validationMiddleware(ProductValidation.VProduct),ProductController.createProduct);
router.get('/products/:productId?', ProductController.getProducts);
router.patch('/products/:productId', validationMiddleware(ProductValidation.VUProduct), ProductController.updateProduct);
router.delete('/products/:productId', ProductController.productDelete);
router.get('/products/category/:categoryId', ProductController.getProductByCategory);	




export const ProductRoute = router;