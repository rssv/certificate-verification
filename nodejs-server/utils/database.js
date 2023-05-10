const { MongoClient } = require('mongodb');
const { Sequelize} = require('sequelize');

let _db;

const mongoConnect = (callback) => {
    MongoClient
        .connect("mongodb+srv://ssrv23:mbYkX1pOOX7NaAFV@cluster0.naf2bjw.mongodb.net/?retryWrites=true&w=majority")
        
        .then(client => {
            console.log('connected to database');
            _db = client;
            callback();
        })
        .catch(err => {
            console.log(err);
        });
}

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found';
}

const sequelize = new Sequelize('university', 'ssrv231', 'Naru12#$', {
    host: 'localhost',
    dialect: 'mysql'
});

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
exports.sequelize = sequelize;