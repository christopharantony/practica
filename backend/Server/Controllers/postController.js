const { CreatePostService, GetAllPostService } = require('../Services/postService')

module.exports.CreatePost = async (req, res) => {
    try {
        console.log('req.body', req.body);
        console.log('req.file.path', req.file?.path);

        const { description, createdBy } = req.body;
        const postImage = req.file ? req.file.path : null;
        const createdAt = new Date();

        const postObj = {
            description,
            createdBy,
            postImage,
            createdAt
        }

        const post = await CreatePostService(postObj);
        return res.status(200).json(post);

    } catch (error) {
        console.log(error)
    }
}

module.exports.GetAll = async (req, res) => {
    try {
        const posts = await GetAllPostService();
        if (posts.length === 0) {
            res.send({ message: "No posts found" });
        } else {
            posts.sort((dateA, dateB) => {
                return dateB.createdAt - dateA.createdAt;
            });
            return res.status(200).json(posts);
        }
    } catch (error) {
        console.log(error)
    }
}