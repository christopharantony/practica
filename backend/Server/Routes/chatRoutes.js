const route = require('express').Router();
const  { checkUser } = require('../Middlewares/AuthMiddleware');
const { chats,getChat,getChatList } = require('../Controllers/chatController')


route.use(checkUser);
route.post('/', chats);
route.get('/:id', getChat);
route.get('/list/:id', getChatList);

module.exports = route;