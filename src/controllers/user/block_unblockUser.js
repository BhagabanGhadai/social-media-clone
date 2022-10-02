const userModel=require('../../models/userModel')
const validator=require('../../util/validator')

const blockuser=async function(req,res){
    const userToBlock=req.params.userId
    let userIdFromToken = req.userId

    if (!validator.isValidObjectId(userToBlock)) {
        return res.status(400).send({ status: false, message: "Invalid UserId" })
    }

    const findUser= await userModel.findOne({_id:userToBlock})

    if (!findUser) {
        return res.status(404).send({ status: false, message: "User not  found" })
    }

    if (findUser._id.toString() == userIdFromToken) {
        return res.status(403).send({ status: false, message: "You can't block your self" })
    }
    const data=await userModel.findById(userIdFromToken)
    if(!data.blockuser.includes(userToBlock)){
        await userModel.findOneAndUpdate({ _id: userIdFromToken }, { $push: { blockuser: userToBlock} })
        return res.status(200).send({ status: true, message:`${userIdFromToken} block ${userToBlock}` })
    }else{
        await userModel.findOneAndUpdate({ _id: userIdFromToken }, { $pull: { blockuser: userToBlock} })
        return res.status(200).send({ status: true, message:`${userIdFromToken} unblock ${userToBlock}` })
    }

}
module.exports=blockuser