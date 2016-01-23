var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')
 , models = require('../models/user.js');
var db = mongoose.connect("mongodb://localhost/test")
    ,User = mongoose.model("Users");
/* GET users listing. */
router.get('/users', function(req, res, next) {

  res.send('respond with a resource');

});

router.post('/addNew',function(req,res,next){
  var userName = req.body.userName;
  var password = req.body.password;
  if(userName!=null&&password!=null){
    var user = new User({
      username: userName,
      password: password
      });

    user.save(function (err, model) {
             if (err) throw err;
             console.log("My new User is saved",
               "`save` hook worked as espected since we had no errors here");
               res.send(user)
    });
  }else{
    res.send("Username or Password is null!!")
  }

});
module.exports = router;


// var user = new User({
//   username: "admin",
//   password:   "password",
//   server:   [{ ip: "127.0.0.1",
//       port: "89" ,
//       component:[
//         {name:"php5.1",
//           link:"http://www.google.co.th",
//           stutus:"Fail"},
//        {name:"mysql",
//            link:"http://www.google.co.th",
//            stutus:"OK"}
//         ]}
//       ],
//   });
