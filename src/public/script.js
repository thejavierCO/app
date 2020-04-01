let socket = io();
socket.on("connect",()=>{
    console.log("on")
})
socket.on("bot:telegram",(a)=>{
    console.log(a)
})