import mongoose from "mongoose";

const issueSchema=new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productModel", 
        required: true
    },
    
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companyModel",
        required: true
    },
    
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel", 
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attachments: [{ 
        type: String
    }],
    status: {
        type: String,
        enum: ["open", "closed"], 
        default: "open" 
    }
}, { timestamps: true });

export default mongoose.model("issueModel", issueSchema, "issuesCollection");