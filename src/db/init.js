const low = require("lowdb"),{v4}=require("uuid"),fileasync=require("lowdb/adapters/FileAsync");

class run{
    constructor(name){
        return ()=>this.init(name);
    }
    init = async (name)=>{
        const adapter = new fileasync("db.json");
        let data = [],db = await low(adapter);
        data[name] = [];
        db.defaults(data[name]).write();
        return db;
    }
}

class db{
    constructor(name){
        let base = new run(name);
        base().then(e=>{
            this.db =()=>e;
        }).catch(e=>console.log(e,21));
    }
    getValues = ()=>{
        if(this.db()!=""){
            const tasks = this.db()
            .get(this.data.name)
            .value();
            return tasks;
        }
    }
    getValue = (id)=>{
        if(!this.db()){            
            const task = this.db()
            .get(this.data.name)
            .find({id:id})
            .value();
            return task;
        }
    };
    setValue = (json)=>{
        if(!this.db()){
            json.id = v4();
            this.db().get(this.data.name)
            .push(json)
            .write()
            return json;
        }else{
            console.log(json)
        }
    }
    updateValue = async (iddb,json)=>{
        if(!this.db()){
            const result = await this.db()
            .get(this.data.name)
            .find({id:iddb})
            .assign(json)
            .write()
            return result
        }
    }
    delValue = async (iddb)=>{
        if(!this.db()){            
            const result = await this.db()
            .get(this.data.name)
            .remove({id:iddb})
            .write()
            return result;
        }
    }
}

module.exports = db;

//------------------------------------------------------------------------------------------------
/*class db{
    db;
    constructor(dbname){
        this.db = ()=>getConnect();
    }
    init = async ()=>{
        this.data[this.data.name] = [];
        const adapter = new fileasync("db.json");
        let db = await low(adapter);
        db.defaults(this.data[this.data.name]).write();
        this.db = ()=>db;
    }

}*/