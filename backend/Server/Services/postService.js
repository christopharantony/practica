const postDb = require('../Models/postModel')

module.exports.CreatePostService = async (obj) => {
    try {
        const post = await postDb.create(obj);
        return post;
    } catch (error) {
        console.log(error)
    }
}

module.exports.GetAllPostService = async () => {
    try {
        const posts = await postDb.find();
        const postData = await postDb.populate(posts,{
            path: 'createdBy comments.commentedBy',
            select: [ "name", "pic", "interviewer", "domain", "company", "_id"]
        })
        return postData;
    } catch (error) {
        console.log(error)
    }
}

module.exports.postById = async(id) => {
    try {
        const post = await postDb.findById(id)
        return post;
    } catch (error) {
        console.log(error)
    }
}

module.exports.likeService = async(postId,userId) => {
    try {
        await postDb.updateOne(
            { _id: postId },
            { $push: { likes: userId } }
        )
        return;
    } catch (error) {
        console.log(error)
    }
}

module.exports.unLikeService = async(postId,userId) => {
    try {
        await postDb.updateOne(
            { _id: postId },
            { $pull: { likes: userId} }
        )
        return;
    } catch (error) {
        console.log(error)
    }
}

module.exports.commentService = async(postId,commentObj) => {
    try {
        await postDb.updateOne(
            { _id: postId },
            { $push: { comments: commentObj } }
        )
        return;
    } catch (error) {
        console.log(error)
    }
}

module.exports.personalService = async(userId) => {
    try {
        const posts = await postDb.find({ createdBy: userId });
        if (posts?.length !== 0) {
            const postsCount = posts?.length;
            const postData = await postDb.populate(posts,{
                path: 'createdBy comments.commentedBy',
                select: [ "name", "pic", "interviewer", "domain", "company", "_id"]
            });
            postData.sort((dateA, dateB) => {
                return dateB.createdAt - dateA.createdAt;
            });
            return { postsCount, posts: postData };
        } else {
            return { postsCount: 0, posts: [] };
        }
    } catch (error) {
        console.log(error)
    }
}