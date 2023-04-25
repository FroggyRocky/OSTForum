const search = require('../controllers/search')
const Router = require('express')
const router = new Router()

router.get('/search/:section', search.search);


module.exports = router