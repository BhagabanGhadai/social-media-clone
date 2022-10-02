const userModel = require('../../models/userModel')
const validator = require('../../util/validator')

/****************************************************Follow a User********************************************* */
const followUser = async (req, res) => {
    try {
        let userToFollow = req.params.userId
        let userIdFromToken = req.userId

        if (!validator.isValidObjectId(userToFollow)) {
            return res.status(400).send({ status: false, message: "Invalid UserId" })
        }
    
        const findUser= await userModel.findOne({_id:userToFollow})
    
        if (!findUser) {
            return res.status(404).send({ status: false, message: "User not  found" })
        }

        if (userToFollow === userIdFromToken)
            return res.status(400).send({ msg: "You can't follow/unfollow your own profile." })
        if(!findUser.followers.includes(userIdFromToken)){
            await userModel.findOneAndUpdate(
                { _id: userIdFromToken},
                { $push: { following: userToFollow } })
    
            await userModel.findOneAndUpdate(
                { _id: userToFollow },
                { $push: { followers: userIdFromToken } })
    
           return res.status(200).send({ msg: `you started following ${userToFollow}` })
        }

            return res.status(200).send({ msg: `you already follow ${userToFollow}` })

    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

/****************************************************Unfollow A User********************************************* */
const unfollowUser = async (req, res) => {
    try {
        let userToUnFollow = req.params.userId
        let userIdFromToken = req.userId

        if (!validator.isValidObjectId(userToUnFollow)) {
            return res.status(400).send({ status: false, message: "Invalid UserId" })
        }
    
        const findUser= await userModel.findOne({_id:userToUnFollow})
    
        if (!findUser) {
            return res.status(404).send({ status: false, message: "User not  found" })
        }

        if (userToUnFollow === userIdFromToken)
            return res.status(400).send({ msg: "You can't follow/unfollow your own profile." })

        if(findUser.followers.includes(userIdFromToken)){
            let followingUser = await userModel.findOneAndUpdate(
                { _id: userIdFromToken },
                { $pull: { following: userToUnFollow } },
                { new: true })
    
            let followedUser = await userModel.findOneAndUpdate(
                { _id: userToUnFollow },
                { $pull: { followers: userIdFromToken } },
                { new: true })
    
           return res.status(200).send({ msg: `you unfollowing ${userToUnFollow}` })
        }

            return res.status(200).send({ msg: `you not following ${userToUnFollow}` })

    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

module.exports = { followUser, unfollowUser }