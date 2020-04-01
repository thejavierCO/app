const { Router } = require("express");
const app = Router();

app.use("/",(req,res,next)=>{
    res.render("main");
})

module.exports = app;