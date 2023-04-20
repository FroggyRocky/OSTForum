const Router = require('express')
const router = new Router()
const vacanciesController = require('../controllers/vacancies')
const authController = require("../controllers/auth");

router.get('/get-vacancies', vacanciesController.getVacancies);
router.post('/create-vacancy', authController.authenticateToken, vacanciesController.createVacancy)
router.post('/delete-vacancy', authController.authenticateToken, vacanciesController.deleteVacancy)
router.post('/update-vacancy', authController.authenticateToken, vacanciesController.updateVacancy)
module.exports = router