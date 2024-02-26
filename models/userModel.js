import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        user_id:{
            type:String,
            unique:true
        },
        email:{
            type:String,
        },
        password:{
            type:String
        }
    },{timestamps:true}
)

export default mongoose.model('users',userSchema);
