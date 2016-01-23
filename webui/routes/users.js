var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')
 , models = require('../models/user.js');
var db = mongoose.connect("mongodb://localhost/test")
    ,User = mongoose.model("Users");

var crypto = require('crypto');
var keyHash = require('../config/dev.js').keyHash;

var session = require('express-session');



router.post('/login',function(req,res,next){
  var userName =  req.body.username;
  var password = req.body.password;

  if(userName!=null&&password!=null){
    var hash = crypto.createHmac('sha512', keyHash);
    hash.update(password);
    password = hash.digest('hex');

    User.findOne({'username': userName}, function(err, data){
     if(data.password==password){
      //  sess = req.session;
      //  sess.username=data.username;
      //  sess.cookie.maxAge = 60000;
      var hash = crypto.createHmac('sha512', keyHash);
      hashUser = data.username;
      hash.update(hashUser);
      hashUser = hash.digest('hex');
       res.cookie("username", hashUser, { expires: new Date(Date.now() + 1000 * 60 * 10), httpOnly: true });
      //  sess.save(function(err) {
      //    if(err) throw err;
      //    console.log("username in request >>> "+sess.username);
      //  });
       return res.json({message:'DONE'});
     }else{
       return res.json({message:'Password BAD!'});
     }
    });
  }else{
    return res.json({message:'Username or Password is null!!'});
  }

});

router.post('/logout',function(req,res,next){
  return  req.session=null;

});

router.get('/checkLogin',function(req,res,next){
  console.log(req.cookies.username);
  if(req.cookies.username){
    res.send(req.cookies.username);
  }else{
    return res.send(" Don't have session");
  }
});

/* GET users listing. */
router.get('/list', function(req, res, next) {
  User.find({},function (err, users) {
    if (err) return handleError(err);
      listUser = [];
      users.forEach(function(user) {
            //console.log('%s password is a %s.', user.username,user.password);
            //var temp = {user.usersname,user.password};
            listUser.push(user);
          });
    return  res.json(listUser);
  });

});

router.post('/addNew',function(req,res,next){
  var userName = req.body.userName;
  var password = req.body.password;
  var hash = crypto.createHmac('sha512', keyHash);
  hash.update(password);
  var password = hash.digest('hex');
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
    res.json({message:'Username or Password is null!!'});
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
