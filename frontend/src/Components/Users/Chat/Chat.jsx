import { useEffect, useRef, useState } from "react";
import { ChatState } from "../../../Context/ChatProvider";
import CloseIcon from "@mui/icons-material/Close";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Box, Fab, Grid } from "@mui/material";
import axios from "../../../axiosInstance";
import io from "socket.io-client"
import Messages from "../../Users/Messages/Messages";
import { useLocation, useNavigate } from "react-router-dom";
import "./Chat.css";

const ENDPOINT = "http://localhost:4000";
var socket, selectedChatCompare;

function Chat() {
    const navigate = useNavigate();
    const location = useLocation();
    const scroll = useRef();
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const {selectedChat, setSelectedChat } = ChatState();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", currentUser);
        socket.on('connection', () => setSocketConnected(true))
    }, [])

    useEffect(() => {
        const data = location.state?.chat;
        setSelectedChat(data);
        const friendId = data?.users.filter(member => member !== currentUser._id)
        const getUser = () => {
            axios.get(`api/user/${friendId}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
                .then(res => {
                    setUser(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        getUser();
    }, [location.state.chat, currentUser?._id])

    useEffect(() => {
        setLoading(true);
        const fetchMessages = async () => {
            try {
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
                socket.emit("join chat", selectedChat?._id)
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat])

    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === "") {
            return;
        }
        const body = {
            content: newMessage.trim(),
            chatId: selectedChat._id,
        }
        const config = {
            headers: {
                token: localStorage.getItem("token")
            }
        }
        
        socket.emit('new message', {
            senderId: currentUser._id,
            chat: selectedChat,
            content: newMessage
        })

        const { data } = await axios.post('api/message', body, config);
        // console.log("Message Data", data);
        setMessages([...messages, data.newMessage]);
        setNewMessage("");
    }
    
    useEffect(() => {
        console.log("getting message in socket io useEffect line 105")
        socket.on("message recieved", (newMessageRecieved) => {
            if ( !selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
            // if (!selectedChatCompare) {
                // Give notification
            } else {
                setMessages([...messages, newMessageRecieved])
            }
        })
    })

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    },[messages])
    return (

            <div className="Chat-modal bg-white">
                <CloseIcon className="Close-button" onClick={() => {
                    navigate('/home')
                    setSelectedChat("")
                }} />
                    <Box sx={{ height: 380 }} className="chatModalMessages" >
                        {
                            messages && messages.map((data, index) => (
                                <Box ref={scroll} key={index}>
                                    <Messages message={data} own={data.sender === currentUser._id} />
                                </Box>
                            ))
                        }
                    </Box>
                <Box sx={{ width: '100%', display: 'flex', p: 1.5 }}>
                    <Box sx={{ width: '85%', borderRadius: '10px' }}>
                        <input
                            className="New-Message"
                            placeholder='Write something...'
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        >
                        </input>
                    </Box>
                    <Box width='10%'>
                        <Fab onClick={handleSubmit} size='medium' sx={{ ml: 2, mb: 0.5 }}><SendRoundedIcon sx={{ fontSize: 28, ml: 0.5 }} /></Fab>
                    </Box>
                </Box>
            </div>
    );
}

export default Chat;

