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
    a.on("bot:telegram",(a)=>{
        io.emit("bot:telegram",a)
    })
    a.on("bot:add",(a)=>{
        console.log(a);
    })
});