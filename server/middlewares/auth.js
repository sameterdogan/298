import jwt from 'jsonwebtoken'
import AdminModel from "../models/admin"
import CustomError from '../util/CustomError'
import { contentToken, headersCheckToken } from '../util/tokenFragmentation'

export const isAdmin = async (req, res, next) => {
    try {
        if (!headersCheckToken(req))
            return next(
                new CustomError(
                    'Buraya girme iznin yok !',
                    401
                )
            )
        console.log("geliypoo")
        const token = contentToken(req)
        console.log(token)
        const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(verifiedToken)
        req.admin = await AdminModel.findById(verifiedToken._id)
        req.admin.password=null
        console.log(req.admin)
        next()
    } catch (err) {
        console.log(err)
        next(new CustomError('Oturmun süresi dolmuş.', 403))
    }
}

