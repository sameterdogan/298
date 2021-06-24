import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ReportSchema = new Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category",
        },
        subCategory:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubCategory",
        },
        title:{
            type:String
        },
         description:{
            type:String
         },
        status: {
            type: 'Number',
            enum: [0, 1,],
            default: 0
            //0=açık
            //1=kapatıldı
        },
        location: {
            district:{type:String},
            neighborhood:{type:String},
            Street:{type:String}
        },
        notes:[],
        images:[/*{
            image:{type:String},
            thumbnail:{type:String}
        }*/],

    },
    {
        timestamps: true,
    })

export default mongoose.model("Report", ReportSchema)