const adminrouter = require('express').Router();
const { adminLogin,allUsers, allInterviewers, blockUser, adminRegister, adminLogout } = require('../Controllers/adminController')
const { checkAdmin } = require('../Middlewares/AuthMiddleware');

adminrouter.post('/login',adminLogin)
// adminrouter.use(checkAdmin)
adminrouter.get('/allUsers',allUsers)
adminrouter.get('/allInterviewers',allInterviewers)
adminrouter.post('/blockUser',blockUser)
adminrouter.post('/logout',adminLogout)
module.exports = adminrouter;
// adminrouter.post('/register',adminRegister)