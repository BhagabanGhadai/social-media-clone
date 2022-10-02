const postModel=require('../../models/userPostModel')
const validator=require('../../util/validator')


const deletePost=async function(req,res){
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

      if (findPost.userId.toString() != userIdFromToken) {
          return res.status(403).send({ status: false, message: "You Are Not Authorized To Delete!!" })
      }
      await postModel.findOneAndUpdate({ _id: postId }, { $set: { isDeleted: true} })

      return res.status(200).send({ status: true, message: `You delete the post!!` })
    }catch(err){
        return res.status(500).send({ status: false, error: err.message })
    }
}
module.exports=deletePost