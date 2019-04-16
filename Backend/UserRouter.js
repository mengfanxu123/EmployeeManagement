const express = require("express");
const router = express.Router();
const User = require("./models/User");
var bodyParser = require("body-parser");
var multer  = require('multer');
var fs = require('fs');
router.use(bodyParser.json());



var storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        var fileType = '';
        if(file.mimetype === 'image/gif') {
            filetype = 'gif';
          }
          if(file.mimetype === 'image/png') {
            filetype = 'png';
          }
          if(file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
          }
          cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage: storage});



// router.post('/upload',upload.single('file'),function(req, res, next) {
//     console.log(req.file);
//     if(!req.file) {
//       res.send("error")
//     }
//     res.json({ 'message' : req.file.path});

//     User.save();
//   });

  router.get("/all", (req, res) => {
    User.find((err, user) => {
      if (err) res.send(err);
      res.status(200).json(user);
    });
  });

  router.get("/managerLists", (req, res) => {
      User.find({manager : {$ne : "None" }},'id name',function (err, docs) {
        if (err) res.send(err);
        res.status(200).json(docs);
      });
      
  });

  router.post("/addUser",upload.single('file'), (req, res) => {
    console.log(req.body);
    console.log(req.file.path);
    const user = new User({
      name: req.body.name,
      title: req.body.title,
      startDate: req.body.startDate,
      officePhone: req.body.officePhone,
      cellPhone: req.body.cellPhone,
      sms: req.body.sms,
      email: req.body.email,
      manager : req.body.manager,
      numberOfDr : 0,
      avatar : {data : fs.readFileSync(req.file.path), contentType: req.file.mimetype}

    });
    user.save(function(err) {
      if (err) console.log(err);
    });
    var query = {_id : req.body.manager}
    
    User.findOneAndUpdate(query, {$inc :{numberOfDr : 1} }, function (err, user){
        if (err) res.send(err);
        console.log(req.body.manager);
        res.send(user)
    });
    // res.send(req.body);
  });

  router.delete("/", (req, res) => {
    let id = req.query.id;
    User.find({manager : id},function(err, docs) {
        if (err) res.send(err);
        res.status(200).json(docs);
    })
  });

  router.put("/updateUser",upload.single('file'), (req, res) => {
    let id = req.query.id;
    console.log(id, "id");
    User.findOneAndUpdate(
      { _id: id },
      {
        name: req.body.name,
      title: req.body.title,
      startDate: req.body.startDate,
      officePhone: req.body.officePhone,
      cellPhone: req.body.cellPhone,
      sms: req.body.sms,
      email: req.body.email,
      manager : req.body.manager,
      numberOfDr : req.body.numberOfDr,
      avatar : {data : fs.readFileSync(req.file.path), contentType: req.file.mimetype}
      },
      function(err, user) {
        if (err) console.log(err);
        res.send("User successfully updated!");
      }
    );
  });




  module.exports = router;