const low = require("lowdb");
const fileasync = require("lowdb/adapters/FileAsync");
const { v4 } = require("uuid");

class db{
    db;
    constructor(dbname){
        this.data = {name:dbname};
        this.init();
    }
    init = async ()=>{
        this.data[this.data.name] = [];
        const adapter = new fileasync("db.json");
        let db = await low(adapter);
        db.defaults(this.data[this.data.name]).write();
        this.db = db;
        return db;
    }
    getValues = ()=>{
        if(this.db!=""){
            const tasks = this.db
            .get(this.data.name)
            .value();
            return tasks;
        }
    }
    getValue = (id)=>{
        if(!this.db){            
            const task = this.db
            .get(this.data.name)
            .find({id:id})
            .value();
            return task;
        }
    };
    setValue = (json)=>{
        if(!this.db){
            json.id = v4();
            this.db.get(this.data.name)
            .push(json)
            .write()
            return json;
        }
    }
    updateValue = async (iddb,json)=>{
        if(!this.db){
            const result = await this.db
            .get(this.data.name)
            .find({id:iddb})
            .assign(json)
            .write()
            return result
        }
    }
    delValue = async (iddb)=>{
        if(!this.db){            
            const result = await this.db
            .get(this.data.name)
            .remove({id:iddb})
            .write()
            return result;
        }
    }
}

module.exports = db;