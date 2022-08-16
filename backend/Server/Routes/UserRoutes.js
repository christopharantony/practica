const router = require('express').Router();
const { checkUser } = require('../Middlewares/AuthMiddleware');
const upload = require('../Utils/cloudinary');

const { Signup, Login, UpdateProfileImage, UpdateUserProfile, UpdatePassword, UserConnect, UserDetails } = require('../Controllers/userController')
router.get('/user/:id', UserDetails);
router.post('/signup', Signup);
router.post('/login', Login)
router.use(checkUser);
router.put('/updateImage',upload.single('image'), UpdateProfileImage);
router.put('/profileEdit', UpdateUserProfile);
router.put('/updatePassword', UpdatePassword);
router.post('/connect', UserConnect)
module.exports = router;