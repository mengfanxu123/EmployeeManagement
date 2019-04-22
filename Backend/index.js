const express = require("express");
const bodyParser = require("body-parser");
const users = require("./userRouter");
const app = express();
var path = require("path");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://mengfan:xmf123@mydb-6jmwj.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, { useNewUrlParser: true, dbName: "Bear" });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("mongodb connected.");
});
app.use(bodyParser.json());
app.use("/users", users);
app.use("/public", express.static("public"));
app.listen(4000, () => console.log("UserList app listening on port 4000!"));
