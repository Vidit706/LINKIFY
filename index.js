require('dotenv').config()

const express = require('express')
const cors  = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const {Server} = require('socket.io');
const http = require('http')

const userRoutes = require('./routes/users.js')
const postRoutes = require('./routes/posts.js')
const chatRoutes = require('./routes/chats.js')

const app = express()
const PORT = process.env.PORT || 3000;
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

require("./startups/db")();
require("./startups/prod.js")(app);
require("./startups/routes.js")(app);
require("./startups/socket")(io)

mongoose.connect(process.env.DB).then(() => console.log("MongoDB connected successfully!")).catch((err) => 
console.log("mongoDB connection failed!", err))

require('./startups/db.js')()



server.listen(PORT, ()=> console.log(`server is listening on port ${PORT}`))