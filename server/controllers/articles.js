const db = require('../dbmodel')

class Articles {
    async getArticles(req, res) {
        const articles = await db.Articles.findAll({
            attributes: {exclude: ['updatedAt', 'userId', 'text']},
            include: [
                {
                    model: db.Comments,
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
            const articleId = req.body.id;
            const article = await db.Articles.findByPk(articleId, {
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
}


module.exports = new Articles()
