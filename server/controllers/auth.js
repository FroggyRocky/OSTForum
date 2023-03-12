require('dotenv').config()
const db = require('../dbmodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const TOKEN_EXPIRATION_SECONDS = '10m'


async function refreshToken(req,res) {
    try {
        const accessTokenDataId = await jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_JWT_KEY, {ignoreExpiration:true}).id
        const refreshtoken = req.cookies.refreshtoken
        if(!refreshtoken) return;
        const dbRefreshToken = await db.RefreshTokens.findOne({raw:true,where:{token:refreshtoken}})
        if(!dbRefreshToken) return;
        const userId = await jwt.verify(refreshtoken, process.env.SECRET_REFRESH_JWT_KEY).id
        if(userId !== accessTokenDataId) return;
        const newToken = await jwt.sign({id: userId}, process.env.SECRET_JWT_KEY, {expiresIn:TOKEN_EXPIRATION_SECONDS})
        return newToken
    } catch (e) {
        console.log(e)
    }
}

class Auth {
    async register(req, res) {
        try {
            const {login, password} = req.body
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500)
                    } else {
                        db.Users.update({
                            password: hash
                        }, {
                            where: {
                                id: 1
                            }
                        })
                        res.sendStatus(200)
                    }
                })
            });
        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res) {
        try {
            const {login, password} = req.body
            const userData = await db.Users.findOne({
                raw: true,
                where: {
                    name: login
                }
            })
            const matchRes = await bcrypt.compare(password, userData.password)
            if (matchRes === true) {
                const cookieOptions = {
                    httpOnly: true,
                    sameSite: 'Lax',
                    secure:true,
                    maxAge: 2147483647,
                    expires:2147483647

                }
                const token = await jwt.sign({id: userData.id}, process.env.SECRET_JWT_KEY, {expiresIn:TOKEN_EXPIRATION_SECONDS})
                const refreshToken = await jwt.sign({id:userData.id}, process.env.SECRET_REFRESH_JWT_KEY)
                await db.RefreshTokens.create({token:refreshToken})
                res.cookie('refreshtoken', refreshToken, cookieOptions)
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
            const token = req.headers.authorization.split(' ')[1]
            req.accountId = await jwt.verify(token, process.env.SECRET_JWT_KEY).id
            next()
        } catch (e) {
            console.log(e)
            if(e.message === 'jwt expired') {
                const newToken = await refreshToken(req,res).catch(e => res.sendStatus(403))
                if(!newToken) return res.sendStatus(403)
                req.accountId = await jwt.verify(newToken, process.env.SECRET_JWT_KEY).id
                next()
            } else {
                console.log(e)
                res.sendStatus(500)
            }
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



