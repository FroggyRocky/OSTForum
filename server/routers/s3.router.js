const Router = require('express')
const router = new Router()
const s3Controller = require('../controllers/s3')
const authController = require("../controllers/auth");

router.post('/s3-upload', authController.authenticateToken, s3Controller.uploadImage)


module.exports = router