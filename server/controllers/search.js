const db = require('../dbmodel')
const { Op } = require('sequelize');

exports.search = async (req, res) => {
    const query = req.query.q
    const section = req.params.section
    if (section === 'articles') {
        const articles = await db.Article.findAll({
            where:{
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
        })
        res.send({articles, total:articles.length}).status(200)
    } else {
        res.sendStatus(500)
    }
}