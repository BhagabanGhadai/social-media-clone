const express=require('express')
const router=express.Router()

const auth=require('../middleware/auth')

const createUser=require('../controllers/user/createUser')
const userLogin=require('../controllers/user/userlogin')
const editUser=require('../controllers/user/editUser')
const followUser=require('../controllers/user/follow_unfollow')
const blockUser=require('../controllers/user/block_unblockUser')
const getProfile=require('../controllers/user/getProfileDetails')

router.post('/signup',createUser)
router.post('/login',userLogin)
router.put('/user/:userId',auth.userAuthentication,editUser)
router.post('/user/:userId/follow',auth.userAuthentication,followUser.followUser)
router.post('/user/:userId/unfollow',auth.userAuthentication,followUser.unfollowUser)
router.post('/user/:userId',auth.userAuthentication,blockUser)//first click block,second click unblock
router.get('/user',auth.userAuthentication,getProfile.profileDetails)
router.get('/user/followers',auth.userAuthentication,getProfile.followersCount)
router.get('/user/following',auth.userAuthentication,getProfile.followingCount)
router.get('/user/post/likes',auth.userAuthentication,getProfile.getLikedUserDetails)
router.get('/user/post',auth.userAuthentication,getProfile.postCount)

const createPost=require('../controllers/post/createPost')
const editPost = require('../controllers/post/editPost')
const deletePost=require('../controllers/post/deletePost')
const likePost=require('../controllers/post/likePost')
const commentPost=require('../controllers/post/commentPost')
const getPost=require('../controllers/post/getPost')

router.post('/post',auth.userAuthentication,createPost)
router.put('/post/:postId',auth.userAuthentication,editPost)
router.delete('/post/:postId',auth.userAuthentication,deletePost)
router.post('/post/:postId/like',auth.userAuthentication,likePost)
router.post('/post/:postId/comment',auth.userAuthentication,commentPost)
router.get('/post',auth.userAuthentication,getPost.getAllPublicPost)
router.get('/post/random',getPost.randomPost)
router.get('/post/unblockuser',auth.userAuthentication,getPost.unBlockUserPost)
router.get('/post/limit',getPost.limitedPost)
router.get('/post/like',auth.userAuthentication,getPost.likeByMe)


module.exports=router