import express from "express"
import {newReport} from "../controllers/report"
import multerImage from "../middlewares/multer";
import joiValidate from "../middlewares/joiValidate";
import {reportSchema} from "../util/validation/reportValidation"

const router =express.Router()

router.post("/new-report",joiValidate(reportSchema),multerImage.array("images",4),newReport)


export default router