const low = require("lowdb");
const fileasync = require("lowdb/adapters/FileAsync");

let db;
async function connect(){
    const adapter = new fileasync("db.json");
    db = await low(adapter);
    db.defaults({tasks:[]}).write();
}
const getConnect = ()=>db;

module.exports = {
    connect,
    getConnect
};