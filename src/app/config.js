const tbot = require("node-telegram-bot-api");
let token = "924748204:AAEQcsj1GVdgxRPGCo0yIYDmh-QdbZGay6g";

class Config{
    data = {}; 
    constructor(base){
        this.data = base;
    }
    app = _=>this.data!={}?(require("firebase")).initializeApp(this.data):{};
    bot = _=>new tbot(token,{polling:true});
}

let app = new Config({
    apiKey: "AIzaSyA0gt_hoKU8QRPsES1Ncvpaj0BIE88dwdk",
    authDomain: "amtaskschool.firebaseapp.com",
    databaseURL: "https://amtaskschool.firebaseio.com",
    projectId: "amtaskschool",
    storageBucket: "amtaskschool.appspot.com",
    messagingSenderId: "1029134028498",
    appId: "1:1029134028498:web:1180d2697f7c22f850e70b",
    measurementId: "G-WKFQQPK32W"
});

module.exports = app;