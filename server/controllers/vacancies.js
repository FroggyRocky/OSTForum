const db = require('../dbmodel')
const Sequelize = require('sequelize')

exports.getVacancies = async (req,res) => {
    try {
        const vacancies = await db.Vacancies.findAll()
        res.status(200).send(vacancies)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}
exports.createVacancy = async (req,res) => {
    try {
        const data = req.body;
        await db.Vacancies.create(data)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}
exports.deleteVacancy = async (req,res) => {
    try {
        const {id} = req.body;
        await db.Vacancies.destroy({where:{id:id}})
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}
exports.updateVacancy = async (req,res) => {
    try {
        const {id, data} = req.body
        await db.Vacancies.update(data, {where:{id:id}})
        res.sendStatus(200)
    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
}
