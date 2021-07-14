import CategoryModel from "../models/category"
import SubCategoryModel from "../models/subCategory"
import CustomError from "../util/CustomError";
//category
export const getAllCategories=async (req,res,next)=>{
    try{
        const allCategories=await CategoryModel.find().populate("subCategories").lean()
        res.status(200).json({
            success:true,
            message:"Tüm kategoriler listelendi.",
            allCategories
        })
    }catch (err){
        next(err)
    }
}
export const newCategory=async (req,res,next)=>{
    try{
        const newCategory=await CategoryModel.create({category:req.body.category})
        res.status(201).json({
            success:true,
            message:"Yeni kategori başarıyla eklendi",
            newCategory
        })
    }catch (err){
        next(err)
    }

}
export const deleteCategory=async (req,res,next)=>{
    try{
        const deleteCategory=await CategoryModel.findByIdAndDelete(req.params.categoryId)
        console.log(deleteCategory)
        if(!deleteCategory) return next(new CustomError("Kategori bilgisi bulunamadı",404))
        const deleteSubCategories=await SubCategoryModel.deleteMany({category:req.params.categoryId})

        res.status(200).json({
            success:true,
            message:"kategori başarıyla silindi"
        })
    }catch (err){
         next(err)
    }

}
export const editCategory=async (req,res,next)=>{
    try{
        const editCategory=await CategoryModel.findById(req.params.categoryId)
        editCategory.category=req.body.category
        await editCategory.save()
        res.status(201).json({
            success:true,
            message:"Kategori başarıyla güncellendi.",
            editCategory
        })
    }catch (err){
        next(err)
    }
}

//sub category
export const getAllSubCategories=async (req,res,next)=>{
    try{
        const allSubCategories=await SubCategoryModel.find().lean()
        res.status(200).json({
            success:true,
            message:"Tüm alt kategoriler listelendi.",
            allSubCategories
        })
    }catch (err){
        next(err)
    }
}
export const getSubCategoriesByCategoryId=async (req,res,next)=>{
    const subCategories=await SubCategoryModel.find({category:req.params.categoryId})
    res.status(200).json({
        success:true,
        message:"Alt kategoriler başarıyla listelendi.",
        subCategories
    })
}
export const newSubCategory=async (req,res,next)=>{

    try{
        const newSubCategory=await SubCategoryModel.create({category:req.params.categoryId,subCategory:req.body.subCategory})
        res.status(201).json({
            success:true,
            message:"Alt kategori başarıyla eklendi",
            newSubCategory
        })
    }catch (err){
        next(err)
    }

}
export const deleteSubCategory=async (req,res,next)=>{
    try{
        const deleteCategory=await SubCategoryModel.deleteOne({_id:req.params.subCategoryId})

        res.status(200).json({
            success:true,
            message:"Alt kategori başarıyla silindi"
        })
    }catch (err){
        next(err)
    }

}
export const editSubCategory=async (req,res,next)=>{
    try{
        const editSubCategory=await SubCategoryModel.findById(req.params.subCategoryId)
        editSubCategory.subCategory=req.body.subCategory
        await editSubCategory.save()
        console.log(editSubCategory)
        res.status(200).json({
            success:true,
            message:"Alt kategori başarıyla güncellendi",
            editSubCategory
        })
    }catch (err){
        next(err)
    }

}