const db = require('../dbmodel')
const Sequlize = require('sequelize')

exports.getAffiliates = async (req, res) => {
    try {
        const limit = 6
        const offset = (+req.query.page - 1) * limit
        const keyId = req.query.key
        let where = {}
        if(keyId) {
            where.keyIds = {
                [Sequlize.Op.overlap]: [keyId]
            }
        }
        const total = await db.Affiliates.count({where:where})
        const affiliates = await db.Affiliates.findAll({
            where:where,
            offset,
            limit
        })
        res.status(200).send({affiliates, total})
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
        await db.Affiliates.update(data,
            {where: {id: id}})

        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}