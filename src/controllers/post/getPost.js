const postModel = require('../../models/userPostModel')
const userModel = require('../../models/userModel')
const validator = require('../../util/validator')

const getAllPublicPost = async function (req, res) {
    try {
        let userIdFromToken = req.userId
        let getPost = await postModel.aggregate([
            { $match: { isPublic: true } },
            { $sort: { updatedAt: -1 } },
            { $project: { reply: { $in: [userIdFromToken, '$likes'] } } }
        ])
        return res.status(200).send({ status: true, data: getPost });
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}


const randomPost = async function (req, res) {
    try {
        let randomPost = await postModel.aggregate([{ $match: { isPublic: true } }, { $sample: { size: 10 } }])
        return res.status(200).send({ status: true, data: randomPost });
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}


const unBlockUserPost = async function (req, res) {
    try {
        let userIdFromToken = req.userId
        const user=await userModel.findById(userIdFromToken)
        let posts = await postModel.aggregate([
            { $match: { isPublic: true } },
          {$match:{userId:{$nin:[user.blockuser]}}}  
        ])
        posts = posts.filter(post => post.bl != userIdFromToken)
        return res.status(200).send({ status: true, data: posts});
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}


const limitedPost = async function (req, res) {
    try {
        let Post = await postModel.aggregate([
            { $limit: 10 }
        ]);
        return res.status(200).send({ status: true, data: Post });
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

const likeByMe = async function (req, res) {
    try {
        let userIdFromToken = req.userId
        let posts = await postModel.find({ isPublic:true, isdeleted: false, likes: userIdFromToken})
        posts = posts.filter(post => post.userId != userIdFromToken)
        return res.status(200).send({ status: true, data: posts});
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}
module.exports = { getAllPublicPost, randomPost, unBlockUserPost, limitedPost, likeByMe }