const db = require('../dbmodel')
const Sequelize = require('sequelize')

exports.getServices = async (req,res) => {
    try {
        const affiliates = await db.Services.findAll()
        res.status(200).send(affiliates)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}
exports.createService = async (req,res) => {
    try {
        const data = req.body;
        await db.Services.create(data)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}