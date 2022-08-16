import { useState, useEffect } from 'react';
import { Box, Avatar, Stack } from '@mui/material'
// import ChatModal from '../../Forms/ChatModal/ChatModal';
import { ChatState } from '../../../Context/ChatProvider';
// import { AnimatePresence } from 'framer-motion';
import ChatLoading from '../Loading/ChatLoading';
import axios from '../../../axiosInstance';
import './ChatBox.css'
import ChatList from '../ChatList/ChatList';

function ChatBox() {
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
    // const [ showChatModal, setShowChatModal ] = useState(false);
    const [ fetchAgain, setFetchAgain ] = useState(false);
    const [ loggedUser, setLoggedUser ] = useState();
    // const chatOpen = () => setShowChatModal(true);
    // const chatClose = () => setShowChatModal(false);
    const [chatList, setChatList] = useState([]);

    const fetchChats = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            const config = {
                headers: {
                    token: localStorage.getItem("token")
                }
            }
            const { data } = await axios.get(`/api/chat/${user?._id}`, config);
            console.log('chatBox line 29',data);
            setChats(data);
            // const response = await axios.get(`/api/chat/list/${user._id}`, config);
            // setChatList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("user")));
        fetchChats();
    }, [fetchAgain]);

    return (
            <Box mt={6} h={12} pr={2} >
                <Box className='chat-box'>
                    <h2 className='chat-header'>Messages</h2>
                    <Box className='chats'>
                        {chats ? (
                            <Stack spacing={1} overflowY="scroll">
                                {chats.map((chatList) => (
                                    <ChatList chat={chatList} currentUser={user} />
                                ))}
                            </Stack>
                        ) : (
                            <ChatLoading />
                        )}
                    </Box>
                </Box>
            </Box>
    )
}

export default ChatBox