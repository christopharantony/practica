const route = require('express').Router();
const upload = require('../Utils/cloudinary')
const { CreatePost,GetAll } = require('../Controllers/postController')
const { checkUser } = require('../Middlewares/AuthMiddleware');

route.use(checkUser);
route.post('/create',upload.single('image'), CreatePost);
route.get('/all', GetAll);

module.exports =route;