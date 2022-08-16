const route = require('express').Router();
const  { checkUser } = require('../Middlewares/AuthMiddleware');
const { CreateMessage,GetMessages } = require('../Controllers/messageController')


route.use(checkUser);
route.post('/', CreateMessage);
route.get('/:id', GetMessages);

module.exports = route;