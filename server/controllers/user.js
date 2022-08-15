const db = require('../dbmodel')


class User {
    async getAccountData(req, res) {
        try {
            const accountId = req.accountId
            console.log(accountId)
            const accountData = await db.Users.findByPk(accountId, {
                attributes: {exclude: ['password']},
                include: [{
                    model: db.Articles,
                    include: [
                        {
                            model: db.Comments
                        },
                        {
                            model: db.Categories
                        }
                    ]
                }]

            })
            res.send(accountData)
        } catch (e) {
            console.log(e)
            res.send(500)
        }
    }
}


module.exports = new User()