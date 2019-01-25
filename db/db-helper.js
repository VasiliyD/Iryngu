const mongoose = require('mongoose')
const Photo = require('db/photo-schema')

const mongoDB = process.env.MONGO_DB_URL

mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
var db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = function putPhoto(photo) {
    var photoRecord = Photo({
        link: photo.link,
        width: photo.width,
        height: photo.height,
        isOriginal: photo.isOriginal
    })
    photoRecord.save(function (err) {
        if (err) return handleError(err);
        console.log(`Item saved to db (id: ${photoRecord._id})`)
    })
}

module.exports = function getAllPhotos() {
    var photos = []
    Photo.find().all(function(photo) {
        photos.push(photo);
    });
    return photos
}