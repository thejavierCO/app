let socket = io();
socket.on("connect",()=>{
    console.log("on")
    //
})
socket.on("disconnect",()=>{
    console.log("off")
})
socket.on("msg",(a)=>{
    console.log(a)
})
socket.on("warn",(a)=>{
    console.log(a)
})

document.addEventListener("DOMContentLoaded",(a)=>{
    join.addEventListener("change",(a)=>{
        socket.emit("chat:join",{id:join.value});
    })
})