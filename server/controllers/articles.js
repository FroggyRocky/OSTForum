const db = require('../dbmodel')
const Sequelize = require('sequelize')

class Articles {
    async getArticles(req, res) {
        try {
            const pageSize = 8;
            const pageNumber = req.query.page ? req.query.page : 1;
            const categoryIds = req.query.categoryIds ? req.query.categoryIds.split(',') : []
            const where = {}
            if(categoryIds.length > 0) {
                where.categoryIds = {
                    [Sequelize.Op.overlap]: categoryIds
                }
            }
            const offset = (pageNumber - 1) * pageSize
            const limit = pageSize;
            const count = await db.Article.count({where: where})
            const articles = await db.Article.findAll({
                attributes: {exclude: ['updatedAt', 'userId', 'text', 'categoryId']},
                order: [['createdAt', 'desc']],
                limit: limit,
                offset: offset,
                where: where
            })
            res.send({articles: articles, total: count}).status(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
async getPopularArticles(req,res) {
    try {
        const articles = await db.Article.findAll({
            attributes: {exclude: ['updatedAt', 'userId', 'text', 'categoryId']},
            order: [['createdAt', 'desc']],
            limit:6
        })
        res.send(articles).status(200)
    } catch(e) {

    }
}
    async getArticle(req, res) {
        try {
            const articleId = req.params.id
            const article = await db.Article.findByPk(articleId, {
                include: [
                    {
                        model: db.Users,
                        attributes: {exclude: ['password']}
                    },
                ]
            })
            res.send(article).status(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }

    async createArticle(req, res) {
        try {
            const accountId = req.accountId
            const data = {
                ...req.body,
                userId: accountId
            }
            const response = await db.Article.create(data)
            res.send(response).status(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }

    async getArticleComments(req, res) {
        try {
            const comments = await db.Comments.findAll({
                where: {
                    articleId: req.params.articleId
                },
                attributes: {exclude: ['updatedAt', 'userId', 'articleId']},
                include: [
                    {
                        model: db.Users.scope('withoutSecretData')
                    }
                ]
            })
            res.send(comments).status(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }

    async deleteComment(req, res) {
        try {
            const commentId = req.params.id
            await db.Comments.destroy({
                where: {
                    id: commentId
                }
            })
            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }

    async createComment(req, res) {
        const commentData = req.body
        commentData.userId = req.accountId
        try {
            await db.Comments.create(commentData)
            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }

    async updateArticle(req, res) {
        try {
            const accountId = req.accountId
            const {articleId, ...updateData} = req.body
            const article = await db.Article.findByPk(articleId, {raw: true})
            if (accountId === article.userId) {
                await db.Article.update(
                    {...updateData},
                    {
                        where: {
                            id: articleId
                        }
                    })
                res.sendStatus(200)
            } else {
                res.sendStatus(403)
            }
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}


module.exports = new Articles()
