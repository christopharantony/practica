import { useState, useEffect } from 'react';
import { Box, Avatar, Stack } from '@mui/material'
import ChatModal from '../../Forms/ChatModal/ChatModal';
import { ChatState } from '../../../Context/ChatProvider';
import { AnimatePresence } from 'framer-motion';
import ChatLoading from '../Loading/ChatLoading';
import axios from '../../../axiosInstance';
import './ChatBox.css'

function ChatBox() {
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
    const [ showChatModal, setShowChatModal ] = useState(false);
    const [ fetchAgain, setFetchAgain ] = useState(false);
    const [ loggedUser, setLoggedUser ] = useState();
    const chatOpen = () => setShowChatModal(true);
    const chatClose = () => setShowChatModal(false);

    const fetchChats = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            const config = {
                headers: {
                    token: localStorage.getItem("token")
                }
            }
            const { data } = await axios.get(`/api/chat/${user._id}`, config);
            console.log("chats", data);
            setChats(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("user")));
        fetchChats();
    }, [fetchAgain]);

    return (
        <>
            <Box mt={6} h={12} pr={2} >
                <Box className='chat-box'>
                    <h2 className='chat-header'>Messages</h2>
                    <Box className='chats'>
                        {chats ? (
                            <Stack spacing={1} overflowY="scroll">
                                {chats.map((chat) => (
                                    <Box
                                    onClick={() => {
                                        setSelectedChat(chat);
                                        chatOpen();
                                    }}
                                    display="flex"
                                    cursor="pointer"
                                    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                                    color={selectedChat === chat ? "#FFFFFF" : "#000000"}
                                    borderRadius={4}
                                    px={3}
                                    py={2}
                                    key={chat._id}
                                    >
                                        <Box pl={3}>
                                            <Avatar src={chat.pic} sx={{ position: 'inherit' }} />
                                        </Box>
                                        <Box mt={.5} onClick={() => {
                                            showChatModal ? chatClose() : chatOpen()
                                        }} >
                                            <p className='chatwith-user-name'>{chat.name}</p>
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        ) : (
                            <ChatLoading />
                        )}
                    </Box>
                </Box>
            </Box>
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {showChatModal && <ChatModal handleClose={chatClose} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </AnimatePresence>
        </>
    )
}

export default ChatBox