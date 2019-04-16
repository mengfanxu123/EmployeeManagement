const express    = require('express');        
const bodyParser = require('body-parser');
const users = require('./userRouter');
const app = express();
var path = require('path');
// var logger = require('morgan');
const mongoose   = require('mongoose');
const uri = "mongodb+srv://mengfan:xmf123@mydb-6jmwj.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, { useNewUrlParser: true, dbName: 'Bear' });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongodb connected.');
});
// app.use(logger('dev'));
app.use(express.json());

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', users);
app.listen(4000, () => console.log('UserList app listening on port 4000!'));

// app.use(function(err, req, res, next) {
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//     res.status(err.status || 500);
//     res.render('error');
//   });