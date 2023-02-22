const Router = require('express')
const router = new Router()
const user = require('../controllers/user')
const authController = require('../controllers/auth')

router.get('/get-account-data', authController.authenticateToken, user.getAccountData);

module.exports = router