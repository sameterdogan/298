import express from "express"
import categoryRouter from "./category"
import userRouter from "./user"
import reportRouter from "./report"


const router =express.Router()

router.use("/users",userRouter)

router.use("/reports",reportRouter)

router.use("/categories",categoryRouter)




export default router