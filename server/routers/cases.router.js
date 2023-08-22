const affiliates = require('../controllers/affiliates')
const Router = require('express')
const router = new Router()
const casesController = require('../controllers/cases')
const authController = require("../controllers/auth");

router.get('/get-cases', casesController.getCases);
router.post('/create-case', authController.authenticateToken, casesController.createCase);


module.exports = router