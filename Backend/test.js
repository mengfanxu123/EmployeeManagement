// router.post("/addUser", upload.single("avatar"), (req, res) )=> {
//   console.log("ss");
//   console.log(req.file.path);
//   console.log(req.body);
//   const user = new User({
//     name: req.body.name,
//     title: req.body.title,
//     startDate: req.body.startDate,
//     officePhone: req.body.officePhone,
//     cellPhone: req.body.cellPhone,
//     sms: req.body.sms, // TIDO: Use the correct format.
//     email: req.body.email,
//     numberOfDr: 0,
//     manager:
//       req.body.manager === "" || req.body.manager === "undefined"
//         ? ""
//         : req.body.manager,
//     avatar:
//       req.file ? {
//           data: req.file.path,
//           contentType: req.file.mimetype } : null
//   });

//   user.save(function(err) {
//     err ? res.status(500).send(err);
//   });
//   // user.save().then(error => res.status(500).send(error));
//   // console.log(req.body.manager);
//   if (!req.body.manager) {
//     console(eq.body.manager, "test");
//     var query = { _id: req.body.manager };
//     User.findOneAndUpdate(query, { $inc: { numberOfDr: 1 } }, function(
//       err,
//       user
//     ) {
//       if (err) res.send(err);
//       console.log(req.body.manager);
//       res.send(user);
//     });
//   } else {
//     res.send(user);
//   }
// });
// // });
