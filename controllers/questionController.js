import Questions from "../models/questionSchema.js";

export const getQuestions=async(req,res)=>{
    try{
        const data=await Questions.find()
    res.status(200).send({
        success:true,
        message:"Questions Fetched successfully",
       data
    })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"Error in fetching questions",
            err
        })
    }
}



export const insertQuestions=async(req,res)=>{
    try{
        const {questionText,options}=req.body
        const data=await new Questions({questionText,options}).save()//same values as in schema

        res.status(201).send({
            success:true,
            message:"Question inserted Successfully",
            data
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:'Error in Inserting Question',
            err
        })
    }
}
