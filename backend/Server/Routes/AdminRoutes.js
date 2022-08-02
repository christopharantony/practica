const adminrouter = require('express').Router();
const { adminLogin,allUsers, allInterviewers, blockUser, adminRegister, adminLogout } = require('../Controllers/adminController')
const { checkAdmin } = require('../Middlewares/AuthMiddleware');

adminrouter.post('/login',adminLogin)
adminrouter.use(checkAdmin)
adminrouter.get('/allUsers',allUsers)
adminrouter.get('/allInterviewers',allInterviewers)
adminrouter.post('/blockUser',blockUser)
module.exports = adminrouter;
// adminrouter.post('/logout',adminLogout)
// adminrouter.post('/register',adminRegister)