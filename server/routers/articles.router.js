const articles = require('../controllers/articles')
const Router = require('express')
const router = new Router()



router.get('/get-articles', articles.getArticles);
router.get('/get-article', articles.getArticle)

module.exports = router