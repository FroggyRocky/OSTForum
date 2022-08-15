const articles = require('../controllers/articles')
const Router = require('express')
const router = new Router()
const authController = require('../controllers/auth')

router.get('/get-articles', articles.getArticles);
router.post('/get-article', articles.getArticle);
router.post('/create-article', authController.authenticateToken, articles.createArticle);

module.exports = router