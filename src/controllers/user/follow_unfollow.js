const userModel = require('../../models/userModel')
const validator = require('../../util/validator')

/****************************************************Follow a User********************************************* */
const followUser = async (req, res) => {
    try {
        let userToFollow = req.params.id
        let myUserId = req.headers['user-details']

        if (userToFollow === myUserId)
            return res.status(400).send({ msg: "You can't follow/unfollow your own profile." })

        if (!validator.isValidObjectId(userToFollow)) {
            return res.status(400).send({ status: false, message: "Invalid userId" })
        }

        const findUserDetails = await userModel.findById(userToFollow)

        if (!findUserDetails) {
            return res.status(404).send({ status: false, message: "User Not Exits" })
        }

        let checkIfFollowedAlready = await userModel.findOne({ _id: myUserId, followings: userToFollow })

        if (checkIfFollowedAlready)
            return res.status(200).send({ msg: `you already follow ${findUserDetails.name}` })

        let followingUser = await userModel.findOneAndUpdate(
            { _id: myUserId },
            { $push: { followings: userToFollow } },
            { new: true })

        let followedUser = await userModel.findOneAndUpdate(
            { _id: userToFollow },
            { $push: { followers: myUserId } },
            { new: true })

        res.status(200).send({ msg: `you started following ${followedUser.name}` })
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

/****************************************************Unfollow A User********************************************* */
const unfollowUser = async (req, res) => {
    try {
        let userToFollow = req.params.id
        let myUserId = req.headers['user-details']

        if (userToFollow === myUserId)
            return res.status(400).send({ msg: "You can't follow/unfollow your own profile." })

        if (!validator.isValidObjectId(userToFollow)) {
            return res.status(400).send({ status: false, message: "Invalid userId" })
        }

        const findUserDetails = await userModel.findById(userToFollow)

        if (!findUserDetails) {
            return res.status(404).send({ status: false, message: "User Not Exits" })
        }

        let checkIfFollowedAlready = await userModel.findOne({ _id: myUserId, followings: userToFollow })

        if (!checkIfFollowedAlready)
            return res.status(200).send({ msg: `you already not following ${findUserDetails.name}` })

        let unfollowingUser = await userModel.findOneAndUpdate(
            { _id: myUserId },
            { $pull: { followings: userToFollow } },
            { new: true })

        let unfollowedUser = await userModel.findOneAndUpdate(
            { _id: userToFollow },
            { $pull: { followers: myUserId } },
            { new: true })

        res.status(200).send({ msg: `you started following ${unfollowedUser.name}` })
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}
// /****************************************************Get User************************************************ */
// const getUser = async (req, res) => {
//     try {
//         let userId = req.headers['user-details']
//         let getUserData = await userModel.findOne({ _id: userId }, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
//         if (!getUserData)
//             return res.status(404).send({ msg: "User not found." })
//         res.status(200).send({ data: getUserData })
//     }
//     catch (err) {
//         res.status(500).send({ msg: err.message })
//     }
// }

module.exports = { followUser, unfollowUser }