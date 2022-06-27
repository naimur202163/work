const asyncHandler = require('../middleware/async-handler');
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk');
const config = require('../config/config');

const s3 = new AWS.S3({
    accessKeyId : config.ACCESSKEY_AWS,
    secretAccessKey : config.SECRETKEY_AWS
})

const BUCKET = config.BUCKET_AWS

const upload = multer({
    storage : multerS3({
        s3 : s3,
        bucket : BUCKET,
        key : function (req,file,cb) {
            cb(null,file.originalname)
        }
    })
}).single('file')

exports.fileuploadingAWS = asyncHandler(async (req,res)=>{
    try{
        
        upload(req,res,function(err){
            console.log(req.file)
            const filename = req.file.location
           
            res.json({
                error : false,
                message : `File uploaded on s3 `,
            })
           
        })
        
    }catch(error){
        console.log(error)
        res.json({
            error : true,
            message: 'Something went wrong'
        })
    }
})

exports.listFiles = asyncHandler(async (req,res)=>{
    try{    
        const list = await s3.listObjectsV2({Bucket : BUCKET}).promise();
        const viewList = list.Contents.map(item => item.Key);
        res.json({
            error : false,
            message : viewList
        })
    }catch(error) { 
        res.json({
            error : true,
            message : 'Something went wrong'
        })
    }
})

exports.downloadFile = asyncHandler(async (req,res)=>{
    try{
        const filename = req.params.filename
        const downloadFile = await s3.getObject({Bucket : BUCKET,Key : filename}).promise()
        res.send(downloadFile.Body)

    }catch(error){
        res.json({
            error : true,
            message : 'Something went wrong '
        })
    }
})

exports.deleteFile = asyncHandler(async (req,res)=>{
    try{
        const file = req.params.filename
        await s3.deleteObject({Bucket : BUCKET,Key : file}).promise();
        res.json({
            error : false,
            message : `File Delete Successfully ${file}`,
        })   
    } catch(error){
        console.log(error)
        res.json({
            error : true,
            message : 'Something went wrong'
        })
    }
})
