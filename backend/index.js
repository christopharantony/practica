const express = require("express")
const cookieParser = require("cookie-parser")
const morgan = require("morgan");
const cors = require("cors");
const app = express()
const { notfound, errorHandler } = require("./Server/Middlewares/ErrorMiddleware");

require("./Server/Database/Database")()
require("dotenv").config();

const port = process.env.PORT || 5000

app.use(cors());

app.use(morgan("tiny"))
app.use(express.json());
app.use(cookieParser())

app.use("/api/admin", require("./Server/Routes/adminRoutes"))
app.use("/api/post", require("./Server/Routes/postRoutes"))
app.use("/api/chat", require("./Server/Routes/chatRoutes"))
app.use("/api/message", require("./Server/Routes/messageRoutes"))
app.use("/api", require("./Server/Routes/userRoutes"))

app.use(notfound)
app.use(errorHandler)

const server = app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});

const io = require("socket.io")(server, {
    pingTimeout:60000,
    cors: {
        origin: 'http://localhost:3000'
    }
})

let userArray = []


const addUser = (user) => {
    !userArray.includes(user._id) && userArray.push(user._id)
} 

const removeUser = (user) => {   
    userArray.filter((data)=>data?._id !== user )    
} 

io.on("connection", (socket) => {
    console.log('Connected to socket.io');

    socket.on("setup", (userData) => {
        socket.join(userData?._id);
        console.log('connected')
        socket.emit("connected");
        addUser(userData);
        io.emit("online users", userArray);
    })

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined room: ",room);
    })

    socket.on("new message", (newMessageRecieved) => {
        console.log("New message is here ", newMessageRecieved);

        var chat = newMessageRecieved.chat;
        console.log("chat", chat);
        if(!chat.users) return console.log("chat.users not defined")

            const x = chat?.users.filter(member => member !== newMessageRecieved._id)
            console.log("x", x);
            if(x == newMessageRecieved.senderId){
                console.log("senderId is same as userId")
                return;
            }else{
                console.log("senderId is different from userId")
                socket.in(x).emit("message recieved", newMessageRecieved)
            }
    })

    socket.on("disconnect", (userData) => {
        console.log("User disconnected ", userData);
        socket.leave(userData?._id);
        removeUser(userData);
        io.emit("online users", userArray);
    })
})