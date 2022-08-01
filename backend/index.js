const express = require("express")
const cookieParser = require("cookie-parser")
const morgan = require("morgan");
const cors = require("cors");
const { notfound, errorHandler } = require("./Server/Middlewares/ErrorMiddleware");
const app = express()

require("./Server/Database/Database")()
require("dotenv").config();

const port = process.env.PORT || 5000

app.use(cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
}))

app.use(morgan("tiny"))
app.use(express.json());
app.use(cookieParser())

app.use("/api/admin", require("./Server/Routes/adminRoutes"))
app.use("/api/post", require("./Server/Routes/postRoutes"))
app.use("/api", require("./Server/Routes/userRoutes"))

app.use(notfound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});