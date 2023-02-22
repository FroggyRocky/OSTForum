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
                order:[['position', 'ASC']],
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
                attributes:['id'],
                limit:8,
                raw:true,
                order: [['createdAt', 'desc']],
            })
            const newTapLinks = articles.map((el, index) => ({articleId:el.id, position:index}))
            await db.TapLinks.bulkCreate(newTapLinks, {
                updateOnDuplicate: true
            })
            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async updateLinks(req,res) {
        try {
            const updatedLinks = req.body
            console.lgo(updatedLinks)
            res.send({updatedLinks:[]})
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

module.exports = new TapLinksController()