const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const { app, server } = require('./socket/index')

const allowedOrigins = [
    'http://localhost:3000',
    'https://chat-app-dun-gamma.vercel.app/',
    'https://chat-app-praveen-kumars-projects-7825b76b.vercel.app/',
    'https://chat-app-git-main-praveen-kumars-projects-7825b76b.vercel.app/',
    'https://chat-qqdwi6hk8-praveen-kumars-projects-7825b76b.vercel.app/',
];


app.use(cors({
    origin : allowedOrigins,
    credentials : true
}))

app.use(express.json())
app.use(cookiesParser())

const PORT = process.env.PORT || 8080

app.get('/',(req,res)=>{
    res.json({
        message : "Server running at " + PORT
    })
})

app.use('/api',router)

connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log("server running at " + PORT)
    })
})
