const mongoose = require('mongoose');
const uri = "mongodb+srv://mengfan:xmf123@mydb-6jmwj.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, { useNewUrlParser: true, dbName: 'Bear' });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('mongodb connected.');
});

