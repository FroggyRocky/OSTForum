const Router = require('express')
const router = new Router()
const user = require('../controllers/user')


router.get('/get-account-data', user.getAccountData);


module.exports = router