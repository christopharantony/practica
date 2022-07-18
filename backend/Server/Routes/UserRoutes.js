const router = require('express').Router();

const { Signup, Login } = require('../Controllers/userController')
const { checkUser } = require('../Middlewares/AuthMiddleware');

router.post('/signup', Signup);
router.post('/login', Login)
router.post('/', checkUser)

module.exports = router;