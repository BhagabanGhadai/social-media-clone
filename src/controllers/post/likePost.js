const postModel=require('../../models/userPostModel')
const validator=require('../../util/validator')

const likePost=async function(req,res){
try{
    const postId=req.params.postId
    let userIdFromToken = req.userId

    if (!validator.isValidObjectId(postId)) {
        return res.status(400).send({ status: false, message: "Invalid PostId" })
    }
    const findPost = await postModel.findOne({_id:postId,isDeleted:false})

    if (!findPost) {
        return res.status(404).send({ status: false, message: "post not found" })
    }
    if(!findPost.likes.includes(userIdFromToken)){
       await postModel.findOneAndUpdate(
            {_id:postId},
            {$push:{likes:userIdFromToken}},
            {new:true}
        )
        return res.status(200).send({ status: true, message: `You liked the ${findPost.userId}'s post` })
    }
    return res.status(400).send({ status: true, message: `you can like a post once` })
    
}catch(err){
    return res.status(500).send({ status: false, error: err.message })
}
}
module.exports=likePost