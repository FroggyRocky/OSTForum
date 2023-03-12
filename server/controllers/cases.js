const db = require('../dbmodel')
const Sequelize = require('sequelize')

exports.getCases = async (req,res) => {
    try {
        const cases = await db.Cases.findAll()
        res.status(200).send(cases)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}
exports.createCase = async (req,res) => {
    try {
        const data = req.body;
        await db.Cases.create(data)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}