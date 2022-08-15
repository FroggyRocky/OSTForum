const Router = require('express')
const router = new Router()
const s3Controller = require('../controllers/s3')

router.post('/s3-upload', s3Controller.uploadImage)


module.exports = router