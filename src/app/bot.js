const socket = require("socket.io-client");
const config = require("./config");
const app = config.bot();

const io = socket("http://localhost:8000");

app.on("message",(a,b)=>{
    io.emit("bot:telegram",{chat:a});
})

io.on("connect",_=>{
    console.log("on");
})