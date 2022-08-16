import { useEffect, useState } from "react";
import { ChatState } from "../../../Context/ChatProvider";
import { motion } from "framer-motion";
import BackdropLanding from "../BackdropLanding/BackdropLanding";
import CloseIcon from "@mui/icons-material/Close";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Avatar, Box, Fab, Grid, Typography } from "@mui/material";
import axios from "../../../axiosInstance";
import io from "socket.io-client"
import "./ChatModal.css";
import Messages from "../../Users/Messages/Messages";

const ENDPOINT = "http://localhost:4000";
var socket, selectedChatCompare;

const dropIn = {
    hidden: {
        y: "0vh",
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 20,
            stiffness: 300,
        },
    },
    exit: {
        y: "0vh",
        opacity: 0,
    },
};

function ChatModal({ handleClose, fetchAgain, setFetchAgain }) {
    const { user, selectedChat, setSelectedChat } = ChatState();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false)

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", selectedChat);
        socket.on('connection', () => setSocketConnected(true) )
    },[])

    useEffect(() => {
        setLoading(true);
        const fetchMessages = async () => {
            try {
                // console.log("selectedChat", selectedChat._id);
                const config = {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                };
                const { data } = await axios.get(
                    `/api/message/${selectedChat._id}`,
                    config
                );
                setMessages(data);
                setLoading(false);
                socket.emit("join chat", selectedChat._id)
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
        selectedChatCompare = selectedChat;
    },[selectedChat])

    useEffect(() => {
        // socket.on("message recieved", (newMessageRecieved) => {
        // console.log("getting message in socket io useEffect line 77",newMessageRecieved)
        // })
        socket.on("message recieved", (newMessageRecieved) => {
            // if ( !selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
            if ( !selectedChatCompare ){
                // Give notification
            } else {
                console.log("new message recieved",newMessageRecieved)
                setMessages([...messages,newMessageRecieved.content])
            }
        })
    })
    

    const handleSubmit = async (e) => {
        const body = {
            content: newMessage,
            chatId: selectedChat._id,
        }
        const config = {
            headers: {
                token: localStorage.getItem("token")
            }
        }
        e.preventDefault();
        const { data } = await axios.post('api/message', body, config);
        console.log("Message Data",data);
        socket.emit('new message',data.newMessage)
        setMessages([...messages, data.newMessage]);
    }
    return (

        <BackdropLanding style={Backdropstyle} onClick={handleClose}>
            <motion.div
                // drag
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="Chat-modal bg-white"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <CloseIcon className="Close-button" onClick={() => {
                    setSelectedChat("")
                    handleClose();
                }} />
                <Grid container >
                    <Box sx={{height:380}} className="chatModalMessages" >
                        {
                            messages && messages.map((data,index) => (
                                <Box key={index}>
                                    <Messages message={data} />
                                </Box>
                            ))
                        }
                        {/* <Box maxWidth='70%' >
                            <Box sx = {{ display: 'flex', mt: 2, width: '100%', ml: 2.7 }} >
                                <Typography>haai</Typography>
                            </Box>
                            <Typography fontSize={10.5} sx={{ ml: 1 }}></Typography>
                        </Box> */}
                    </Box>
                </Grid>
                <Box sx={{ width: '100%', display: 'flex', p: 1.5 }}>
                    <Box sx={{ width: '85%', borderRadius: '10px' }}>
                        <input
                            className="New-Message"
                            placeholder='Write something...'
                            onChange={(e) => setNewMessage(e.target.value)}
                        >
                        </input>
                    </Box>
                    <Box width='10%'>
                        <Fab onClick={handleSubmit} size='medium' sx={{ ml: 2, mb: 0.5 }}><SendRoundedIcon sx={{ fontSize: 28, ml: 0.5 }} /></Fab>
                    </Box>
                </Box>
            </motion.div>
        </BackdropLanding>
    );
}

export default ChatModal;

const Backdropstyle = {
    height: "700px",
};
