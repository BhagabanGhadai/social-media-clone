const postModel=require('../../models/userPostModel')
const validator=require('../../util/validator')

const commentOnPost=async function(req,res){
try{
    const postId=req.params.postId
    const userIdFromToken = req.userId
    const commentBody=req.body.commentBody


    if (!validator.isValid(commentBody)) {
        return res.status(400).send({ status: false, message: "please comment on the post" })
    }
    if (!validator.isValidObjectId(postId)) {
        return res.status(400).send({ status: false, message: "Invalid PostId" })
    }

    const findPost = await postModel.findOne({_id:postId,isDeleted:false})

    if (!findPost) {
        return res.status(404).send({ status: false, message: "post not found" })
    }
    const commentData={
        userId:userIdFromToken,commentBody:commentBody
    }
  
        await postModel.findOneAndUpdate(
            {_id:postId},
            {$push:{comment:commentData}},
            {new:true}
        )
        return res.status(200).send({ status: true, message: `You comment on ${findPost.userId}'s post` })
    
    
}catch(err){
    return res.status(500).send({ status: false, error: err.message })
}
}
module.exports=commentOnPost