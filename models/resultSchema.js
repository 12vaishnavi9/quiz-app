import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
    {  
        userID:{
            type:String,
            required:true
        },
        TotalAnswered:{
            type:Number,
            required:true
        },
        AuthoritativeScore:{
            type:Number,
            required:true
        },
        DemocraticScore:{
            type:Number,
            required:true
        },
        FacilitativeScore:{
            type:Number,
            required:true
        },
        SituationalScore:{
            type:Number,
            required:true
        }
    },{timestamps:true}
)

export default mongoose.model('result',resultSchema);
