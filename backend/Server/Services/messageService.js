const messageDb = require('../Models/messageModel')

module.exports.CreateMessageService = async (sender, content, chatId) => {
    try {
        const newMessage = await messageDb.create({
            sender,
            content,
            chatId
        });
        return newMessage;
    } catch (error) {
        console.log(error)
    }
}

module.exports.GetMessagesService = async (chatId) => {
    try {
        const messages = await messageDb.find({ chatId });
        return messages;
    } catch (error) {
        console.log(error)
    }
}