import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"companyModel",
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:[{
        type:String,
        required:true,
    }],
    supportingDocs:{
        manuals:[{
            type:String
        }],
        externalLinks:[{
            type:String
        }]
    }
},
{timestamps:true});

export default mongoose.model("productModel",productSchema,"productsCollection");