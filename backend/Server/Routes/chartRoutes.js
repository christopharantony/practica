const route = require('express').Router();
const { interviewerChart } = require('../Controllers/interviewerChartController');
const { checkUser } = require('../Middlewares/AuthMiddleware')

route.use(checkUser)
route.get('/interviewer',interviewerChart)

module.exports = route;