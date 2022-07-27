const db = require('../dbmodel')

class Articles {
async getArticles(req,res) {
    const articles = await db.Articles.findAll({})
    console.log(articles)
    res.send(articles)
}
async getArticle(req,res) {
    const articleId = req.body.id;
    console.log(articleId)
    const article = await db.Articles.findByPk(articleId)
    res.send(article)
}
}


module.exports = new Articles()
