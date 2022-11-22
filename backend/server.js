const express = require("express")
const dotenv = require("dotenv").config()
const {chats} = require("./Data/data")
const connectDB = require("./Config/DB")
const userRoutes = require("./Routes/UserRoutes");
const generateToken = require("./Config/GenerateToken");
const {notFound, errorHandler} = require("./Middleware/errorMiddleware");

const PORT = process.env.PORT || 5050;
// const PORT = 5000;
const app = express()


connectDB();

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Api is running")
})

app.use(notFound)
app.use(errorHandler)
app.use("/api/user",userRoutes)
// app.get("/api/chat", (req, res) => {
//     res.send(chats)
// })
// app.get("/api/chat/:id", (req, res) => {
//     // console.log(req.params.id)
//     const singleChat = chats.find(chat => chat._id === req.params.id);
//     res.send(singleChat)
// })

app.listen(PORT, (res) => {
    console.log(`server started on ${PORT}`,process.env.PORT)
})
