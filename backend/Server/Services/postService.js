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
            path: 'createdBy',
            select: [ "name", "pic", "interviewer", "domain", "company" ]
        })
        return postData;
    } catch (error) {
        console.log(error)
    }
}