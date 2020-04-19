const express = require("express");
const morgan = require("morgan");
const socket = require("socket.io");
const engine = require("ejs-mate");

const app = express();

app.engine("ejs",engine);
app.use(morgan("dev"));
app.set('port',process.env.PORT||8000);
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use("/files",express.static(__dirname +"/public"));
app.use("/",require("./router/fb.js"));

let io = socket.listen(app.listen(app.get('port'),()=>{console.log('run',app.get('port'))}));

io.on("connection",(a)=>{
    a.emit("id",a.id);
    a.on("chat:join",(b)=>{
        switch(b.id){
            case "bot":
            a.join("bot",function(){
                a.emit("msg",{"join":"bot"})
            });
            break;
            default:
            a.emit("warn",{result:"not exist"})
        }
    })
    a.on("chat:bot",(b)=>{
        let {id,msg} = b;
        switch(id){
            case "msg":
                const { from , chat , date ,text} = msg;
                let { last_name , first_name , username} = from;
                let { id , title , type } = chat;
                let data = {
                    user:{
                        name:first_name+" "+last_name,
                        nickname:username
                    },
                    chat:{
                        id:id,
                        title:title,
                        type:type
                    },
                    msg:text
                }
                io.to("bot").emit("msg",data);
            break;
            case "echo":
                io.to("bot").emit("msg",msg);
            break;
            default:
            a.emit("warn",{result:"not exist"})
        }
    })
    a.on("chat:msg",(b)=>{
        io.to("bot").emit("msg",b);
    })
});