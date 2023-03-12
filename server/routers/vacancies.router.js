const Router = require('express')
const router = new Router()
const vacanciesController = require('../controllers/vacancies')
const authController = require("../controllers/auth");

router.get('/get-vacancies', vacanciesController.getVacancies);
router.post('/create-vacancy', authController.authenticateToken, vacanciesController.createVacancy)


module.exports = router