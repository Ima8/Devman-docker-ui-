var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/devman');
/* GET users listing. */
router.get('/create', function(req, res, next) {

  //Add data to db
  // remote to client server

  res.send('respond with a /create');
});

router.get('/delete',function(req,res,next){
  //Delete data from db
  // remote to delete docker
  res.send('respond with a /create');
});

router.get('/get/logs',function(req,res,next){
  // remote to request log from client server
  //return log data
  // can choose what log you what
  res.send('respond with a /get/logs');
});

router.get('/get/info',function(req,res,next){
  res.send('respond with a /get/info');
});

module.exports = router;
