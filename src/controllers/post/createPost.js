const postModel=require('../../models/userPostModel')
const userModel=require('../../models/userModel')
const validator=require('../../util/validator')
const aws= require("aws-sdk")

aws.config.update({
    accessKeyId: "AKIAY3L35MCRVFM24Q7U",
    secretAccessKeyId: "qGG1HE0qRixcW1T1Wg1bv+08tQrIkFVyDFqSft4J",
    region: "ap-south-1"
})

let uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
    let s3= new aws.S3({apiVersion: '2006-03-01'});

    var uploadParams= {
        ACL: "public-read",
        Bucket: "classroom-training-bucket",  
        Key: "abc/" + file.originalname,  
        Body: file.buffer
    }


    s3.upload( uploadParams, function (err, data ){
        if(err) {
            console.log(err)
            return reject({"error": err})
        }
        console.log(data)
        console.log("file uploaded succesfully")
        return resolve(data.Location)
    })

   })
}

const createPost=async function(req,res){
    try{
        const dataToPost=JSON.parse(JSON.stringify(req.body));
        let userIdFromToken = req.userId
        // let file = req.files;
        // let video = req.files;
        dataToPost.userId=userIdFromToken
        
        if(!validator.isValid(dataToPost.text)){
            return res.status(400).send({ status: false, message: "description of the post is required" })
        }
        if (dataToPost.HashTags) {
            let tags = dataToPost.HashTags.split(" ").map(x => x.trim())
            dataToPost['HashTags'] = tags
        }
        if (dataToPost.friendTags) {
            let tags = dataToPost.friendTags.split(",").map(x => x.trim())
            dataToPost['friendTags'] = tags
        }
        
        // let images = await uploadFile( file[0] )
        // console.log(images)
        // dataToPost.image = images;
        // let videos = await aws_s3.uploadFile(video[0])
        // dataToPost.video = videos
        const savePostInDb=await postModel.create(dataToPost)
        await userModel.findOneAndUpdate({_id:userIdFromToken},{$push:{posts:savePostInDb}})

        res.status(201).send({ status: true, message: "successfully posted", data: savePostInDb })
    }catch(err){
        return res.status(500).send({ status: false, error: err.message })
    }
}
module.exports=createPost