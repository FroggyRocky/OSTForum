const affiliates = require('../controllers/affiliates')
const Router = require('express')
const router = new Router()
const networkingController = require('../controllers/networking')
const authController = require("../controllers/auth");
const casesController = require("../controllers/cases");

router.get('/get-networks', networkingController.getNetWorking);
router.post('/create-network', authController.authenticateToken, networkingController.createNetwork)


module.exports = router