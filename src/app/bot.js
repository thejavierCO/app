const socket = require("socket.io-client");
const config = require("./config");
const bot = config.bot();

const io = socket("http://localhost:8000");

io.on("connect",()=>{
    io.on("id",(a)=>{
        id = a;
    })
})

bot.onText(/\/echo (.+)/,(a,b)=>{
    let { text , message_id ,from ,chat } = a;
    bot.sendMessage(chat.id,"init");
})

bot.onText(/\/start/,(a,b)=>{
    let { text , message_id ,from ,chat } = a;
    bot.sendMessage(chat.id,"init");
})