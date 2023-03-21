const mongoose = require('mongoose');
var logger = require('morgan');

const connect = () => {

    const url = 'mongodb://localhost:27017/ot_database';

    mongoose.connect(url)

    mongoose.connection.once("open", async () => {
        console.log("Connected to database");
    });
      
    mongoose.connection.on("error", (err) => {
        console.log("Error connecting to database  ", err);
    });
}

const disconnect = () => {
    
    if (!mongoose.connection) {
      return;
    }
    
    mongoose.disconnect();

    mongoose.once("close", async () => {
        console.log("Discontented from database");
    });

};

module.exports = {
    connect,
    disconnect
}