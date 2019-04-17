const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const userSchema = new Schema({
  name: String,
  title: String,
  sex: String,
  startDate: Number,
  officePhone: String,
  cellPhone: String,
  sms: Number,
  email: String,
  manager: [{ type: Schema.Types.ObjectId, ref: "employeeManager" }],
  numberOfDr: Number,
  avatar: { data: String, contentType: String }
});
userSchema.plugin(mongoosePaginate);
const User = mongoose.model("employeeManager", userSchema);

module.exports = User;
