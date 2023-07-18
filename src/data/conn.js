const {MongoClient} = require('mongodb')


const url = 'mongodb://root:example@localhost:27017/';
const client = new MongoClient(url);
const dbName = 'mongokart';

let db;

async function connect() {
    try {        
        if(db) {
            return db
        }

        await client.connect()
        db = client.db(dbName)
        console.log('Connected successfully to server')
        return db
    } catch (error) {
        console.error("Erro ao conectar-se com o banco de dados.", error)
    }
}



module.exports = connect;