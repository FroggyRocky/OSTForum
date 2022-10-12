require('dotenv').config();
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const S3Connection = require('aws-sdk/clients/s3');
const bucketParams = { Bucket: process.env.S3_BUCKET_NAME}
const uploadParams = { Bucket: bucketParams.Bucket, Key: '', Body: '' }
const metaParams = { Bucket: bucketParams.Bucket, Key: process.env.S3_SECRET_KEY }



const s3 = new S3Connection({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    endpoint: 'https://s3.timeweb.com',
    s3ForcePathStyle: true,
    region: process.env.S3_REGION,
    apiVersion: 'latest',
    ContentEncoding:'base64',
    ContentType:'image/*'
})


class S3 {
    async uploadImage(req, res) {
        try {
            let file = req.files.file
            uploadParams.Key = file.name
            uploadParams.Body = file.data
            const response = await s3.upload(uploadParams).promise()
            res.status(200).send(response.Location)
        } catch (e) {
            res.sendStatus(500)
        }
    }
}


module.exports = new S3