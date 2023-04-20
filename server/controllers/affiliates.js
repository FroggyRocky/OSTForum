const db = require('../dbmodel')
const Sequelize = require('sequelize')

exports.getAffiliates = async (req, res) => {
    try {
        const affiliates = await db.Affiliates.findAll()
        res.status(200).send(affiliates)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}
exports.createAffiliate = async (req, res) => {
    try {
        const data = req.body;
        await db.Affiliates.create(data)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}
exports.deleteAffiliate = async (req, res) => {
    try {
        const {id} = req.body;
        await db.Affiliates.destroy({
            where: {
                id: id
            }
        })
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}
exports.updateAffiliate = async (req, res) => {
    try {
        const {id, data} = req.body;
        const {header,link,score, keyIds, cover, description} = data
        console.log(req.body)
        await db.Affiliates.update(data,
            {where: {id: id}})

        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}