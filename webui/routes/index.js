var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.cookies.username);
  var username = req.cookies.username;
  if(typeof username == "undefined" || username === null || username === "null" || username.length < 1 ){
    console.log("username > '"+username+"'");
    console.log("type ='"+typeof username+"''");
    res.sendfile('src/html/login.html');
  }else{
    res.sendfile('src/html/main.html');
  }
});

module.exports = router;
