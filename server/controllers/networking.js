const db = require('../dbmodel')
const Sequelize = require('sequelize')

exports.getNetWorking = async (req,res) => {
    try {
        const networks = await db.Networks.findAll()
        res.status(200).send(networks)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}
exports.createNetwork = async (req,res) => {
    try {
        const data = req.body;
        await db.Networks.create(data)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}