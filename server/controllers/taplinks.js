const db = require('../dbmodel')
const dbModel = require("../dbmodel");

class TapLinksController {
    async getLinks(req, res) {
        try {
            const taplinks = await db.TapLinks.findAll({
                include: [{
                    model: db.Article,
                    attributes: ['header']
                }],
                order: [['position', 'ASC']],
            })
            res.status(200).send(taplinks)
        } catch (e) {
            res.sendStatus(500)
            console.log(e)
        }
    }

    async synchronizeLinks(req, res) {
        try {
            const articles = await dbModel.Article.findAll({
                attributes: ['id'],
                limit: 8,
                raw: true,
                order: [['createdAt', 'desc']],
            })
            const newTapLinks = articles.map((el, index) => ({id: index + 1, articleId: el.id, position: index}))
            await db.TapLinks.bulkCreate(newTapLinks, {
                updateOnDuplicate: ['id','articleId', 'position']
            })
            const synchronizedTapLinks = await db.TapLinks.findAll({
                include: [{
                    model: db.Article,
                    attributes: ['header']
                }],
                order: [['position', 'ASC']],
            })
            res.status(200).send(synchronizedTapLinks)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }

    async updateLinks(req, res) {
        try {
            const updatedLinks = req.body
            await db.TapLinks.bulkCreate(updatedLinks, {
                updateOnDuplicate: ['position']
            })
            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }

    async updateTapLinkArticle(req, res) {
        try {
            const {articleId, id} = req.body
            await db.TapLinks.update({articleId: articleId}, {where: {id: id}})
            const updatedTapLinks = await db.TapLinks.findAll({
                include: [{
                    model: db.Article,
                    attributes: ['header']
                }],
                order: [['position', 'ASC']],
            })
            res.status(200).send(updatedTapLinks)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

module.exports = new TapLinksController()