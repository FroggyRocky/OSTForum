const db = require('../dbmodel')


class User {
    async getAccountData(req, res) {
        try {
            const accountId = req.accountId
            const accountData = await db.Users.findByPk(accountId, {
                attributes: {exclude: ['password']},
                include: [{
                    model: db.Article,
                    include: [
                        {
                            model: db.Comments
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