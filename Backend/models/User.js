const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: Number,
  name: String,
  title: String,
  sex: String,
  startDate: Number,
  officePhone: String,
  cellPhone:String,
  sms: Number,
  email: String,
  manager: String,
  numberOfDr: Number,
  avatar: {data : Buffer, contentType: String}
});

const User = mongoose.model('employee', userSchema);

module.exports = User;