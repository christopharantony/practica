const route = require('express').Router();
const upload = require('../Utils/cloudinary')
const { CreatePost,GetAll } = require('../Controllers/postController')

route.post('/create',upload.single('image'), CreatePost);
route.get('/all', GetAll);

module.exports =route;