const Router = require('express')
const router = new Router()
const auth = require('../controllers/auth')


// router.post('/register', auth.register);
router.post('/login', auth.login)
router.get('/configs', auth.compileConfigs)

module.exports = router;