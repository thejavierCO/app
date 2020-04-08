class tags{
    tag;
    constructor(id){
        try{
            if(typeof id == "string"){
                if(document.getElementById(id)){
                    this.tag = document.getElementById(id);
                    this.tag["on"] = (a,f)=>this.event(document.getElementById(id),a,f);
                    this.tag["view"] = (b)=>this.view(document.getElementById(id),b);
                }else{
                    throw "not exist tag name "+id;
                }
            }
            if(typeof id == "object"){
                let result = [];
                if(id.length){
                    id.map(e=>{
                        if(document.getElementById(e)){                          
                            result[e] = document.getElementById(e);
                            result[e]["on"] = (a,f)=>this.event(document.getElementById(e),a,f);
                            result[e]["view"] = (b)=>this.view(document.getElementById(e),b);
                            return document.getElementById(e);
                        }else{
                            throw "not exist tag name "+e;
                        }
                    })
                    return result;
                }else{
                    throw result;
                }
            }
        }catch(e){
            console.warn(e);
        }
    }
    get = ()=>this.tag
    event = (a,e,f)=>{
        a.addEventListener(e,(b)=>{
            if(f){
                f(b,tags);
            }else{
                res(b,tags);
            }
        });
        return a;
    }
    view = (a,e)=>{
        try{
            a.style.display = e;
            return true
        }catch(e){
            return e
        }
    }
}

class create{
    constructor(type ,clss ,id){
        let result = this.set(type,clss,id,false);
        this.tg = result;
    }
    set(type,clss,id,add=false,writeO,writeI){
        let result = document.createElement(type);
        if(clss){
            result.setAttribute("class",clss);
        }
        if(id){
            result.setAttribute("id",id);
        }
        if(writeO||writeI){
            if(typeof writeO === "object"){
                result.appendChild(write);
            }
            if(typeof writeI === "string"){    
                result.innerHTML = write;
            }
        }
        if(add){
            this.tg.appendChild(result);   
        }
        return result;
    }
    link(url,add=false){
        let result = this.set("a",false,false,false);
        result.setAttribute("href",url);
        if(add){
            this.tg.appendChild(result);
        }
        return result;
    }
    add(tg){
        if(typeof tg == "object"){
            this.tg.appendChild(tg);
        }
        return true
    }
    get = ()=>this.tg
}

let socket = io(),id;
socket.on("connect",()=>{
    console.log("on")
})
socket.on("disconnect",()=>{
    console.log("off")
})
socket.on("id",(a)=>{
    id = a;
})
socket.on("msg",(a)=>{
    let { user , chat , msg , join, id} = a;
    if(user){
        let { name , nickname } = user;
        let { id , type } = chat;
        switch(type){
            case "private":
                let { chat } = new tags(["chat"]);
                let tag = new create("div","box","u");
                let link = tag.link("t.me/"+nickname);
                link.innerHTML = name;
                let n = tag.set("div","box","u-name");
                n.appendChild(link);
                let m = tag.set("div","box","u-msg");
                m.innerHTML = msg;
                tag.add(n);
                tag.add(m);
                chat.appendChild(tag.get());
            break;
        }
        console.log(user,chat,msg)
    }else if(join){
        console.log(join);
    }else if(id){
        console.log(id,msg);
    }else{
        console.warn(e);
    }
})
socket.on("warn",(a)=>{
    console.log(a)
})

document.addEventListener("DOMContentLoaded",(a)=>{
    const { join , msg } = new tags(["join","msg"]);  
    join.addEventListener("change",(a)=>{
        socket.emit("chat:join",{id:join.value});
    })
    msg.addEventListener("change",(a)=>{
        socket.emit("chat:msg",{id:id,msg:msg.value});
    })
})