const userModel = require('../../models/userModel');
const postModel=require('../../models/userPostModel')
const validator=require('../../util/validator')

const editPost=async function(req,res){
    try{
        const dataToEdit=req.body;
        const postId=req.params.postId
        let userIdFromToken = req.userId
  
        if (!validator.isValidObjectId(postId)) {
            return res.status(400).send({ status: false, message: "Invalid PostId" })
        }
  
        const findPost = await postModel.findOne({_id:postId,isDeleted:false})
  
        if (!findPost) {
            return res.status(404).send({ status: false, message: "post not found" })
        }
  
        if (findPost.userId.toString() != userIdFromToken) {
            return res.status(403).send({ status: false, message: "You Are Not Authorized To edit!!" })
        }

        if (!validator.isValidRequestBody(dataToEdit)) {
            return res.status(400).send({ status: false, message: "please provide valid Details To update" })
        }
        
        if(!validator.validString(dataToEdit.text)){
            return res.status(400).send({ status: false, message: "description is required" })
        }
        if(!validator.validString(dataToEdit.HashTags)){
            return res.status(400).send({ status: false, message: "HashTags is required" })
        }
        if (dataToEdit.HashTags) {
            let tags = dataToEdit.HashTags.split(",").map(x => x.trim())
            dataToEdit['HashTags'] = tags
        }
        if(!validator.validString(dataToEdit.friendTags)){
            return res.status(400).send({ status: false, message: "FriendTags is required" })
        }
        if (dataToEdit.friendTags) {
            let tags = dataToEdit.friendTags.split(",").map(x => x.trim())
            dataToEdit['friendTags'] = tags
        }
        
        const savePostInDb=await postModel.findOneAndUpdate(
            {_id:postId},
            {$set:{text:dataToEdit.text,HashTags:dataToEdit.HashTags,friendTags:dataToEdit.friendTags}},
            {new:true}
        )
        res.status(201).send({ status: true, message: "successfully posted", data: savePostInDb })
    }catch(err){
        return res.status(500).send({ status: false, error: err.message })
    }
}
module.exports=editPost