const db = require('../dbmodel')
const Sequelize = require('sequelize')

class Articles {
    async getArticles(req, res) {
        let articles;
        if(req.query.limit) {
            articles = await db.Article.findAll({
                attributes: {exclude: ['updatedAt', 'userId', 'text', 'categoryId']},
                include: [
                    {
                        model: db.Comments
                    },
                ],
                order: [['createdAt', 'desc']],
                limit:req.query.limit
            })
        } else {
            articles = await db.Article.findAll({
                attributes: {exclude: ['updatedAt', 'userId', 'text', 'categoryId']},
                include: [
                    {
                        model: db.Comments
                    },
                ],
                order: [['createdAt', 'desc']],
            })
        }
        res.send(articles)
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
            res.send(article)
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
            res.status(200).send(response)
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
            res.status(200).send(comments)
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
