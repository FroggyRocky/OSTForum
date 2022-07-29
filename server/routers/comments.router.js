const comments = require('../controllers/comments')
const Router = require('express')
const router = new Router()

router.post('/post-comment', comments.postComment)
