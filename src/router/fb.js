const { Router } = require("express");
//const { app } = require("../app/config");
const r = Router();

r.use("/",(req,res,next)=>{
    res.render("main");
})

module.exports = r;