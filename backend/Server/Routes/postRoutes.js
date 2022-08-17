const route = require('express').Router();
const upload = require('../Utils/cloudinary')
const { CreatePost,GetAll,likePost, commentPost } = require('../Controllers/postController')
const { checkUser } = require('../Middlewares/AuthMiddleware');

route.use(checkUser);
route.post('/create',upload.single('image'), CreatePost);
route.get('/all', GetAll);
route.post('/posts/like', likePost)
route.post('/posts/comment', commentPost)

module.exports =route;