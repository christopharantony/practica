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