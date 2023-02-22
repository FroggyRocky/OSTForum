const Router = require('express')
const router = new Router()
const taplinkController = require('../controllers/taplinks')
const authController = require('../controllers/auth')

router.get('/get-taplinks', taplinkController.getLinks);
router.get('/synchronize-taplinks', authController.authenticateToken, taplinkController.synchronizeLinks)
router.post('/update-taplinks', authController.authenticateToken,taplinkController.updateLinks)
module.exports = router