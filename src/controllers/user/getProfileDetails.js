const postModel=require('../../models/userPostModel')
const userModel=require('../../models/userModel')

const profileDetails = async function(req,res) {
  try{
    let userIdFromToken = req.userId
      let getProfile = await userModel.findOne({_id: userIdFromToken},{_id:0, createdAt:0, updatedAt:0, __v:0})
      if(!getProfile)return res.status(404).send({msg: "User not found."}) 
      return res.status(200).send({ status: true, message: "Profile Details fetch successfully!!", data:getProfile });
  }
  catch(err){
    return res.status(500).send({ status: false, error: err.message })
  }
}

const followingCount = async function(req,res) {
  try{
    let userIdFromToken = req.userId
      let getProfile = await userModel.findOne({_id: userIdFromToken},{_id:0, createdAt:0, updatedAt:0, __v:0})
      if(!getProfile)return res.status(404).send({msg: "User not found."}) 
      return res.status(200).send({ status: true, message:`${userIdFromToken} following ${getProfile.following.length} People`});
  }
  catch(err){
    return res.status(500).send({ status: false, error: err.message })
  }
}
const followersCount = async function(req,res) {
  try{
    let userIdFromToken = req.userId
      let getProfile = await userModel.findOne({_id: userIdFromToken},{_id:0, createdAt:0, updatedAt:0, __v:0})
      if(!getProfile)return res.status(404).send({msg: "User not found."}) 
      return res.status(200).send({ status: true, message:`${userIdFromToken} have ${getProfile.followers.length} Followers`});
  }
  catch(err){
    return res.status(500).send({ status: false, error: err.message })
  }
}

const getLikedUserDetails=async function(req,res){
    try{
      let userIdFromToken = req.userId
      const userData=await postModel.aggregate([
        // {$match:{userId:userIdFromToken,isPublic:true}},
        {$unwind:'$likes'},
        {$project:{likes:1}}
      ])
      return res.status(200).send({ status: true, data: userData })
    }catch(err){
        return res.status(500).send({ status: false, error: err.message })
    }
}
const postCount = async function(req,res) {
  try{
    let userIdFromToken = req.userId
      let getProfile = await userModel.findOne({_id: userIdFromToken},{_id:0, createdAt:0, updatedAt:0, __v:0})
      if(!getProfile)return res.status(404).send({msg: "User not found."}) 
      return res.status(200).send({ status: true, message: `you have ${getProfile.posts.length} posts` });
  }
  catch(err){
    return res.status(500).send({ status: false, error: err.message })
  }
}
module.exports={profileDetails,followersCount,followingCount,getLikedUserDetails,postCount}