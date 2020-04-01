const { Router } = require("express");
const app = Router();

app.use("/",(req,res,next)=>{
    res.json({})
})

module.exports = app;