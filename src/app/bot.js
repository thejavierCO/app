const socket = require("socket.io-client");
const config = require("./config");
const db = require("../db/init.js");
const app = config.bot();

const io = socket("http://localhost:8000");
let id
let chats = new db;

io.on("connect",()=>{
    io.on("id",(a)=>{
        id = a;
    })
})

app.onText(/\/echo (.+)/,(a,b)=>{
    let { text , message_id ,from ,chat } = a;
    app.sendMessage(chat.id,"init");
})

app.onText(/\/start/,(a,b)=>{
    let { text , message_id ,from ,chat } = a;
    app.sendMessage(chat.id,"init");
})