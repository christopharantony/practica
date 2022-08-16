const { chatExists, createChat, getChat } = require('../Services/chatServices')
const { userByIdService } = require('../Services/userServices')

module.exports.chats = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const isChatExists = await chatExists(senderId, receiverId);
        if (isChatExists) {
            return res.status(200).json({ message: "Chat already exists", chat: isChatExists, created: false });
        } else {
            const newChat = await createChat(senderId, receiverId);
            return res.status(200).json({ message: "Chat created", chat: newChat, created: true });
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Something went wrong", error })
    }
}

module.exports.getChat = async (req, res) => {
    try {
        function checkUser(userId) {
            return userId !== id;
        }
        // let friendId = null;
        // const friendsData = [];
        const { id } = req.params;
        const chats = await getChat(id);

        // for ( let i = 0; i < chats.length; i++ ) {
        //     friendId = chats[i].users.filter(checkUser)
        //     const data = await userByIdService(friendId[0]);
        //     friendsData.push(data);
        // }
        // return res.status(200).json({ chats, friendsData, created: true });
        // return res.status(200).json( friendsData );
        return res.status(200).json(chats);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Something went wrong", error })
    }
}

module.exports.getChatList = async (req, res) => {
    function checkUser(userId) {
        return userId !== id;
    }
    const { id } = req.params;
    const chats = await getChat(id);
    let friendId = null;
    const friendsData = [];
    for (let i = 0; i < chats.length; i++) {
        friendId = chats[i].users.filter(checkUser)
        const data = await userByIdService(friendId[0]);
        friendsData.push(data);
    }
    return res.status(200).json(friendsData);
}