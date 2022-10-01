const postModel=require('../../models/userPostModel')
const validator=require('../../util/validator')

const createPost=async function(req,res){
const dataToPost=req.body
if (!validator.isValidRequestBody(dataToPost)) {
    return res.status(400).send({ status: false, message: "please provide valid Details" })
}

if (!validator.isValid(dataToPost.HashTags)) {
    return res.status(400).send({ status: false, message: "HashTag is required" })
}
if (dataToPost.HashTags) {
    let tags = dataToPost.HashTags.split(",").map(x => x.trim())
       dataToPost['HashTags'] = tags
}
if (!validator.isValid(dataToPost.friendTags)) {
    return res.status(400).send({ status: false, message: "HashTag is required" })
}
if (dataToPost.friendTags) {
    let tags = dataToPost.friendTags.split(",").map(x => x.trim())
       dataToPost['friendTags'] = tags
}
}
module.exports=createPost