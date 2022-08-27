import { Avatar, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { ChatState } from '../../../Context/ChatProvider';
import axios from '../../../axiosInstance';
import { useNavigate } from 'react-router-dom';

function ChatList( { chat, currentUser } ) {
        const navigate = useNavigate();
        const { selectedChat, setSelectedChat } = ChatState();
        const [ user, setUser ] = useState(null);
        useEffect(() => {
            const friendId = chat.users.filter(user => user !== currentUser?._id)[0];
            const fetchUser = async () => {
                try {
                    const { data } = await axios.get(`/api/user/${friendId}`);
                    setUser(data);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchUser();
        }, [chat, currentUser]);
    return (
        <Box
            onClick={() => {
                setSelectedChat(chat);
                navigate("/message", { state: { chat } });
                // chatOpen();
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
                <Avatar src={user?.pic} sx={{ position: 'inherit' }} />
            </Box>
            <Box mt={.5} onClick={() => {
                // showChatModal ? chatClose() : chatOpen()
            }} >
                <p className='chatwith-user-name'>{user?.name}</p>
            </Box>
        </Box>
    )
}

export default ChatList
