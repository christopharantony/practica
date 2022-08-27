const { CreatePostService, GetAllPostService, postById, likeService, unLikeService, commentService, personalService } = require('../Services/postService')

module.exports.CreatePost = async (req, res) => {
    try {
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
        res.json({ created: false, error: error.message })
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

module.exports.likePost = async (req, res) => {
    const { likes, postId } = req.body;
    const userId = req.user._id;
    if (likes) {
        const post = await postById(postId)
        if (post) {
            await likeService(postId, userId)
            return res.status(200).json({ message: "Liked successfully" })
        } else {
            res.status(500).send({ message: "Post not found" })
        }
    } else {
        await unLikeService(postId, userId)
        return res.status(200).json({ message: "Unliked successfully" })
    }
}

module.exports.commentPost = async (req, res) => {
    const { postId, comment } = req.body;
    const userId = req.user._id;
    const createdAt = new Date();
    const commentObj = {
        comment,
        commentedBy: userId,
        createdAt
    }
    try {
        const post = await postById(postId)
        if (post) {
            await commentService(postId, commentObj)
            return res.status(200).json({ message: "Comment added successfully" })
        } else {
            res.status(500).send({ message: "Post not found" })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.personalPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const response = await personalService(userId);
        if (response.postsCount === 0) {
            res.status(404).send({ message: "No posts found" });
        } else {
            return res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).send(error)
    }

}