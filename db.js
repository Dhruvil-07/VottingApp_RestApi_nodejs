const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on('connected',()=>console.log('Database connected'));

db.on('disconnected',()=>console.log('database disconnected'));

db.on('error',(error)=>console.log(error));

module.exports = db;