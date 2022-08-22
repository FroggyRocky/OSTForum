require('dotenv').config()
const db = require('../dbmodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class Auth {
    // async register(req, res) {
    //     try {
    //         const {login, password} = req.body
    //         bcrypt.genSalt(10, (err, salt) => {
    //             bcrypt.hash(password, salt, (err, hash) => {
    //                 if (err) {
    //                     console.log(err);
    //                     res.sendStatus(500)
    //                 } else {
    //                     db.Users.update({
    //                         password: hash
    //                     }, {
    //                         where: {
    //                             id: 1
    //                         }
    //                     })
    //                     res.sendStatus(200)
    //                 }
    //             })
    //         });
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    async login(req, res) {
        try {
            const loginData = req.body
            const userData = await db.Users.findOne({
                raw: true,
                where: {
                    name: loginData.login
                }
            })
            const matchRes = await bcrypt.compare(loginData.password, userData.password)
            if (matchRes === true) {
                const token = await jwt.sign({id: userData.id}, process.env.SECRET_JWT_KEY)
                res.status(200).send({token: token})
            } else {
                res.sendStatus(401)
            }
        } catch (e) {
            console.log(e)
            res.status(403).send(new Error('You\'ve provided wrong password or login'))
        }
    }
    async authenticateToken(req, res, next) {
        try {
            const authHeader = req.headers['xxx-auth-token']
            const token = authHeader && authHeader.split(' ')[1]
            req.accountId = await jwt.verify(token, process.env.SECRET_JWT_KEY).id
            next()
        } catch (e) {
            console.log(e)
            res.sendStatus(401)
        }
    }
    async compileConfigs(req, res) {
        try {
            const categories = await db.Categories.findAll()
            const keys = await db.Keys.findAll()
            res.status(200).send({categories:categories, keys:keys})
        } catch (e) {
            res.sendStatus(500)
            console.log(e)
        }
    }
}


module.exports = new Auth();

