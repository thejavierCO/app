const socket = require("socket.io-client");
const config = require("./config");
const app = config.bot();

const io = socket("http://localhost:8000");

io.on("connect",()=>{
    io.on("id",(a)=>{
        console.log(a)
    })
})

app.onText(/\/echo (.+)/,(a,b)=>{
    let { text , message_id ,from ,chat } = a;
    app.sendMessage(chat.id,"init");
    console.log(b);
})

app.onText(/\/start/,(a,b)=>{
    let { text , message_id ,from ,chat } = a;
    app.sendMessage(chat.id,"init");
    io.emit("bot:add",chat.id);
})