import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const categoryCreate_DB = async(payload:TCategory)=>{
    const result = await Category.create(payload);
    return result;
}
const categoryGet_DB = async(categoryId:string | null)=>{
    if(categoryId){
        const result = await Category.findById(categoryId);
        return result;
    }
    const result = await Category.find();
    return result;
}

const categoryUpdate_DB = async(categoryId:string, payload:TCategory)=>{
    const result = await Category.findByIdAndUpdate(categoryId, payload, {new:true});
    return result;
}

const categoryDelete_DB = async(categoryId:string)=>{
    const result = await Category.findByIdAndDelete(categoryId);
    return result;
}


export const CategoryService ={
categoryCreate_DB,
categoryGet_DB,
categoryUpdate_DB,
categoryDelete_DB
}