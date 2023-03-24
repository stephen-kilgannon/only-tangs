const mongoose = require('mongoose');
var logger = require('morgan');

const connect = () => {
    console.log('URI is: ', process.env.MONGO_URI);
    console.log('URI is: ', process.env.MONGO_URI);
    console.log('URI is: ', process.env.MONGO_URI);
    
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
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