const express = require('express')
const imageSize = require('image-size')
const resize = require('src/resize')
const awsHelper = require('src/aws-helper')
const dbHelper = require('db/db-helper')

const s3Root = process.env.AWS_BUCKET

const server = express()

server.post('/api/upload', (req, res) => {
    const file = req.query.file

    fs.readFile(file, (err, data) => {
        if (err) res.send(400, 'failed to upload')

        awsHelper.uploadBufferToS3({name: file, data: data})

        var size = imageSize(file.name)
        dbHelper.putPhoto({
            link: `${s3Root}/${file.name}`
            , width: size.width
            , height: size.height
            , isOriginal: true})

        res.send(201, req.body)
    })   
})

server.get('/api/resize', (req, res) => {
    const widthString = req.query.width
    const heightString = req.query.height
    const format = req.query.format
    const file = req.query.file

    let width, height
    if (widthString && height) {
        width = parseInt(widthString)
        height = parseInt(heightString)
    }

    res.type(`image/${format || 'png'}`)
    var resized = resize(file, format, width, height)
    resized.pipe(awsHelper.uploadPipeToS3(file.name))

    res.send(200, {
        link: `${s3Root}/${file.name}`
        , width: width
        , height: height 
    })
})

server.get('api/history', (req, res) => {
    var photos = dbHelper.getAllPhotos()
    send(200, photos)
})

server.listen(8000, () => {
    console.log('Server started!')
});