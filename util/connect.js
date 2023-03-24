const mongoose = require('mongoose');
var logger = require('morgan');

const connect = () => {



    const url = 'mongodb://localhost:27017/ot_database';

    mongoose.connect(url, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
  
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