import { Box, Avatar } from '@mui/material'
import './ChatBox.css'

function ChatBox() {
    return (
        <Box mt={6} h={12} pr={2} >
            <Box className='chat-box'>
                <h2 className='chat-header'>Messages</h2>
                <Box className='chats'>
                    <Box pl={3}>
                        <Avatar sx={{position:'inherit'}} />
                    </Box>
                    <Box mt={.5} >
                        <p className='chatwith-user-name'>Adnan</p>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ChatBox