import express from "express"
import {editSubCategory, newSubCategory,deleteSubCategory} from "../controllers/category";
import {isAdmin} from "../middlewares/auth";


const router =express.Router({
    mergeParams: true // önceki routurden paramsların gelemesini sağlıyor
})
router.use(isAdmin)
router.post("/new-sub-category",newSubCategory)
router.put("/edit-sub-category/:subCategoryId",editSubCategory)
router.delete("/delete-sub-category/:subCategoryId",deleteSubCategory)






export default router