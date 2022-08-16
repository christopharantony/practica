const chatDb = require("../Models/chatModel");

module.exports.chatExists = async (senderId, receiverId) => {
    const chat = await chatDb.findOne({
        users: {
            $eq: [senderId, receiverId]
        }
    });
    return chat;
}

module.exports.createChat = async (senderId, receiverId) => {
    const chat = await chatDb.create({
        users: [senderId, receiverId]
    });
    return chat;
}

module.exports.getChat = async (userId) => {
    const chat = await chatDb.find({
        users: {
            $in: [userId]
        }
    });
    return chat;
}