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

app.use("/",(req,res,next)=>{
    res.json({})
});

let io = socket.listen(app.listen(app.get('port'),()=>{console.log('run',app.get('port'))}));

io.on("connection",(a)=>{
    console.log(a);
});