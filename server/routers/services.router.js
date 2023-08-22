const affiliates = require('../controllers/affiliates')
const Router = require('express')
const router = new Router()
const servicesController = require('../controllers/services')
const authController = require("../controllers/auth");
const networkingController = require("../controllers/networking");

router.get('/get-services', servicesController.getServices);
router.post('/create-service', authController.authenticateToken, servicesController.createService)
router.post('/delete-service', authController.authenticateToken, servicesController.deleteService)
router.post('/update-service', authController.authenticateToken, servicesController.updateService)
module.exports = router