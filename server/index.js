const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const { app, server } = require('./socket/index')

const allowedOrigins = [
    'https://chat-app-sage-tau-14.vercel.app',
    'https://chat-app-praveen-kumars-projects-7825b76b.vercel.app/email',
    'https://chat-app-git-main-praveen-kumars-projects-7825b76b.vercel.app',
    'https://chat-kdtiiaexp-praveen-kumars-projects-7825b76b.vercel.app',
    'http://localhost:3000',
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
