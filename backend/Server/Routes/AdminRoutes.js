const adminrouter = require('express').Router();
const { adminLogin } = require('../Controllers/adminController')

adminrouter.post('/login',adminLogin)

module.exports = adminrouter;