const router = require('express').Router();

const { Signup, Login } = require('../Controllers/userController')

router.post('/signup', Signup);
router.post('/login', Login)

module.exports = router;