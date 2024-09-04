import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { sanitizeFilter } from "mongoose";
import { Product } from "./product.model";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const productTitle = await Product.findOne({ title: product.title });
    if (productTitle) {
      return res.status(400).json({
        status:false,
        message: "Product all ready exist",
        data: [],
      });
    }

    const productInfo = await ProductService.productCreateDB(product);
    res.status(201).json({
      message: "Product created successfully",
      data: productInfo,
    });
  } catch (err: any) {
    return res.status(400).json({
      status:false,
      message: " Product all ready exist",
      data: [],
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const productQuery = req.query;
    // console.log(req.query);
    
        
    const product = await ProductService.productGetDB(productId,productQuery);
    res.status(200).json({
      message: "Product fetched successfully",
      data: product,
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        const productId = req.params.productId;
        const productInfo = await ProductService.productUpdateDB(productId, product);
        res.status(200).json({
            message: "Product updated successfully",
            data: productInfo
        })
    } catch (err:any) {
        throw new Error(err);
        
    }
}

const productDelete = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const product = await ProductService.productDeleteDB(productId);
        res.status(200).json({
            message: "Product deleted successfully",
            data: []
        })
    } catch (err:any) {
        throw new Error(err);
    }
}

const getProductByCategory = async (req: Request, res: Response) => {
  try{
    const categoryId = req.params.categoryId;
    const product = await ProductService.productGetByCategoryFromDB(categoryId);
    res.status(200).json({
      message: "Product fetched successfully",
      data: product,
    });
  }catch(err:any){
    throw new Error(err);
  }
}

export const ProductController = {
  createProduct,
  getProducts,
  updateProduct,
  productDelete,
  getProductByCategory
};
