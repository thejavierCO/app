const socket = require("socket.io-client");
const config = require("./config");
const bot = config.bot();

let list = [370878312,273361298];
const io = socket("http://localhost:8000");
let status = false;
io.on("connect",()=>{io.on("id",(a)=>{id = a;status = !status;});io.emit("chat:join",{id:"bot"});})
io.on("disconnect",()=>{status = !status;});

io.on("msg",function(a){
    let {user,chat,msg,join} = a;
    if(!join){
        console.log(a);
        //bot.sendMessage(chat.id,msg);
    }
});

bot.on("message",function(a){
    io.emit("chat:bot",{id:"msg",msg:a})
})

bot.onText(/\/echo (.+)/,(a,b)=>{
    let { text , message_id ,from ,chat } = a;
    bot.sendMessage(chat.id,b[1]);
    io.emit("chat:bot",{id:"echo",msg:{chat:a,text:b[1]}});
})

bot.onText(/\/start/,(a,b)=>{
    let { text , message_id ,from ,chat } = a;
    bot.sendMessage(chat.id,
        '<b>'+id+'</b>\n'+
        'chat_id:'+chat.id+'\n'+
        'status:'+status+'\n'
        ,{parse_mode:"HTML"});
})