const affiliates = require('../controllers/affiliates')
const Router = require('express')
const router = new Router()
const authController = require('../controllers/auth')
router.get('/get-affiliates', affiliates.getAffiliates);
router.post('/create-affiliate', authController.authenticateToken, affiliates.createAffiliate);


module.exports = router