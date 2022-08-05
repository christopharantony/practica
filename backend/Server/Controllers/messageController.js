const { CreateMessageService, GetMessagesService } = require('../Services/messageService');

module.exports.CreateMessage = async(req, res) => {
    try {
        const userId = req.user._id;
        const { content, chatId } = req.body;
        const newMessage = await CreateMessageService(userId, content, chatId);
        return res.status(200).json({newMessage,created:true});
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Something went wrong", error})
    }
}

module.exports.GetMessages = async(req, res) => {
    try {
        const { chatId } = req.params;
        const messages = await GetMessagesService(chatId);
        return res.status(200).json({messages,created:true});
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Something went wrong", error})
    }
}