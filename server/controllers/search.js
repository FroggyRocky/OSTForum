const db = require('../dbmodel')
const {Op} = require('sequelize');

exports.search = async (req, res) => {
    const query = req.query.q
    const section = req.params.section
    const page = +req.query.page || 1
    const limit = 8
    const offset = (page - 1) * limit
    if (section === 'articles') {
        const total = await db.Article.count({
            where: {
                [Op.or]: [
                    {
                        header: {
                            [Op.iLike]: `%${query}%`
                        }
                    },
                    {
                        description: {
                            [Op.iLike]: `%${query}%`
                        }
                    }
                ]
            }
        })
        const articles = await db.Article.findAll({
            where: {
                [Op.or]: [
                    {
                        header: {
                            [Op.iLike]: `%${query}%`
                        }
                    },
                    {
                        description: {
                            [Op.iLike]: `%${query}%`
                        }
                    }
                ]
            },
            limit,
            offset
        })
        res.send({articles, total}).status(200)
    } else {
        res.sendStatus(500)
    }
}