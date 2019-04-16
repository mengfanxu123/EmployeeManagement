const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
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
userSchema.plugin(mongoosePaginate);
const User = mongoose.model('employeeManager', userSchema);

module.exports = User;