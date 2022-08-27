const route = require('express').Router();
const { checkUser } = require('../Middlewares/AuthMiddleware');
const { createInterview, getupcomingInterviews, getupcomingData, getRequest, interviewShedule, cancelInterview, setInterviewStatus, uploadFeedback, getNotification, userCancellation, userConfirmation, userCompletedInterviews } = require('../Controllers/interviewController')
const upload = require('../Utils/cloudinary')

route.use(checkUser);
route.post('/request', createInterview);
route.get('/requests', getRequest);
route.put('/schedule', interviewShedule);
route.put('/cancel', cancelInterview);
route.get('/user/notifications', getNotification)
route.get('/user/upcoming', getupcomingInterviews);
route.put('/user/cancel', userCancellation)
route.put('/user/confirm', userConfirmation)
route.get('/user/myinterviews', userCompletedInterviews)
route.get('/interviewer/upcoming', getupcomingData )
route.put('/interviewer/status/:id', setInterviewStatus)
route.put('/interviewer/feedback/:id', upload.single('feedback'), uploadFeedback)


module.exports = route;