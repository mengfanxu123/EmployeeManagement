const express = require("express");
const router = express.Router();
const User = require("./models/User");
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs");
router.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    var fileType = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, "image-" + Date.now() + "." + filetype);
  }
});
var upload = multer({ storage: storage });

// router.get("/all", (req, res) => {
//   User.find((err, user) => {
//     if (err) res.send(err);
//     res.status(200).json(user);
//   });
// });

router.get("/allEmployees", (req, res) => {
  const orderBy = req.query.orderBy || "name";
  const order = req.query.order || "asc";
  const query = {};
  const options = {
    page: req.body.page + 1,
    limit: 10,
    sort: { [orderBy]: order },
    populate: {
      path: "manager",
      select: "name",
      sort: { [orderBy]: order }
    }
  };
  User.paginate(query, options).then(result => {
    res.json(result);
  });
});

router.get("/employeeList", (req, res) => {
  User.find({ name: { $ne: "None" } }, "id name", function(err, docs) {
    if (err) res.send(err);
    res.status(200).json(docs);
  });
});

router.get("/drReports", (req, res) => {
  User.find({ manager: req.body.id }, function(err, docs) {
    if (err) res.status(400).send("drReports err" + err);
    res.status(500).json(docs);
  });
});

router.post("/addUser", upload.single("avatar"), (req, res) => {
  // console.log(req.file.path);

  console.log(req.body);
  const user = new User({
    name: req.body.name,
    title: req.body.title,
    startDate: req.body.startDate,
    officePhone: req.body.officePhone,
    cellPhone: req.body.cellPhone,
    sms: 0, // TIDO: Use the correct format.
    email: req.body.email,
    manager: req.body.manager === "None" ? "" : req.body.manager,
    numberOfDr: 0,
    avatar: {
      data: req.file.path,
      contentType: req.file.mimetype
    }
  });
  user.save(function(err) {
    if (err) res.status(500).send(err);
  });
  if (req.body.manager !== "None") {
    var query = { _id: req.body.manager };
    User.findOneAndUpdate(query, { $inc: { numberOfDr: 1 } }, function(
      err,
      user
    ) {
      if (err) res.send(err);
      console.log(req.body.manager);
      res.send(user);
    });
  } else {
    res.send(user);
  }
});

router.delete("/delete", (req, res) => {
  let employeeId = req.query.id;
  User.findById(employeeId, "manager", function(err, employee) {
    if (err || !employee)
      return res.status(400).send("delete user fail: " + err);
    // Find employee's manager.
    console.log(employee.manager, "test");
    // Find employee's DRs.
    // Set DRs' manager to the employee's manager, if any.
    User.updateMany(
      { manager: employeeId },
      { $set: { manager: employee.manager } },
      function(err, docs) {
        if (err) return res.status(500).send("delete user fail: " + err);

        // If has manager, decrement employee's manager's DR count.
        if (employee.manager) {
          User.findOneAndUpdate(
            { _id: employee.manager },
            { $inc: { numberOfDr: docs.nModified - 1 } },
            function(err, user) {
              if (err) return res.status(500).send("delete user fail: " + err);
            }
          );
        }
        // Finally delete this employee and return.
        User.findByIdAndDelete(employeeId, function(err) {
          if (err) {
            return res.status(500).send("delete user fail: " + err);
          }
          return res.status(200).send("delete user success");
        });
      }
    );
  });
});

router.put("/updateUser", upload.single("file"), (req, res) => {
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
      manager: req.body.manager,
      numberOfDr: req.body.numberOfDr,
      avatar: {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype
      }
    },
    function(err, user) {
      if (err) console.log(err);
      res.send("User successfully updated!");
    }
  );
});

module.exports = router;
