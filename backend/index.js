const express = require("express")
const cookieParser = require("cookie-parser")
const morgan = require("morgan");
const cors = require("cors")
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

app.use("/admin", require("./Server/Routes/AdminRoutes"))
app.use("/", require("./Server/Routes/UserRoutes"))

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});