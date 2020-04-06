const { Router } = require("express");
const r = Router();

r.use("/",(req,res,next)=>{
    res.render("main");
})

module.exports = r;