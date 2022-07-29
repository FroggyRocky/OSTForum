const db = require('../dbmodel')
class Comments {
    async postComment(req,res) {
        try {
            const data = {
                text:req.body.text,
                likes:0,
                dislikes:0,
                articleId:req.body.articleId,
                userId:req.body.userId
            }
            const result = await db.Comments.create(data)
            res.status(200).send(result)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async likeComment(req,res) {
        try {

        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}


module.exports = new Comments()