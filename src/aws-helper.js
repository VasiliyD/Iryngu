const AWS = require('aws-sdk');

const BUCKET_NAME = process.env.AWS_BUCKET;
const IAM_USER_KEY = process.env.AWS_KEY;
const IAM_USER_SECRET = process.env.AWS_SECRET;

var s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
  Bucket: BUCKET_NAME
})

module.exports = function uploadBufferToS3(file) {
  s3bucket.createBucket(function () {
      var params = {
        Bucket: BUCKET_NAME,
        Key: file.name,
        Body: file.data
      }
      s3bucket.upload(params, function (err, data) {
        if (err) throw err
        console.log(data)
      })
  })
}

module.exports = function uploadPipeToS3(filePath) {
  var pass = new stream.PassThrough()
  s3bucket.createBucket(function () {
      var params = {
        Bucket: BUCKET_NAME,
        Key: filePath,
        Body: pass
      }
      s3bucket.upload(params, function (err, data) {
        if (err) throw err
        console.log(data)
      })
  })
  return pass
}