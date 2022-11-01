const db = require('../dbmodel')
const Sequelize = require('sequelize')
class Articles {
    async getArticles(req, res) {
        const articles = await db.Articles.findAll({
            attributes: {exclude: ['updatedAt', 'userId', 'text', 'categoryId']},
            include: [
                {
                    model: db.Comments
                },
                {
                    model: db.Categories,
                }
            ],
            order: [['usersLiked', 'desc']],
        })
        res.send(articles)
    }
    async getArticle(req, res) {
        try {
            const articleHeader = req.header
            const article = await db.Articles.findOne({
                where:{
                  header: {
                      [Sequelize.Op.like]:'%' + articleHeader + '%'
                  }
                },
                include: [
                    {
                        model: db.Comments,
                        attributes: {exclude: ['updatedAt', 'userId', 'articleId']},
                        include: [
                            {
                                model: db.Users
                            }
                        ]
                    },
                    {
                        model: db.Users
                    },
                    {
                        model: db.Categories,
                    }

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
                userId:accountId
            }
            const response = await db.Articles.create(data)
            res.status(200).send(response)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async getArticleComments(req,res) {
        try {
            const comments = await db.Comments.findAll({
                where:{
                    articleId:req.params.articleId
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
    async deleteComment(req,res) {
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
    async createComment(req,res) {
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
    async decodeArticleDestination(req,res,next) {
        try {
            const {header} = req.params
            req.header = decodeURI(header)
            next()
        } catch (e) {
            console.log(e)
            res.send(400)
        }
    }
}


module.exports = new Articles()
