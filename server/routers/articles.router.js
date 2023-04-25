const articles = require('../controllers/articles')
const Router = require('express')
const router = new Router()
const authController = require('../controllers/auth')

router.get('/get-articles', articles.getArticles);
router.get('/get-popular-articles', articles.getPopularArticles);
router.get('/get-article/:id', articles.getArticle);
router.post('/create-article', authController.authenticateToken, articles.createArticle);
router.put('/update-article', authController.authenticateToken, articles.updateArticle)

///Comments///
router.get('/get-article-comments/:articleId', articles.getArticleComments)
router.post('/create-comment', authController.authenticateToken, articles.createComment)
router.delete('/delete-comment/:id', authController.authenticateToken, articles.deleteComment)


module.exports = router