var express = require('express');
var router = express.Router();


var mongoose = require('mongoose')
var models = require('../models/user.js');
require('../models/server.js');
var db = mongoose.createConnection("mongodb://localhost/test");
var User = mongoose.model("Users");
var Servers = mongoose.model("Servers");

var Client = require('node-rest-client').Client;
var client = new Client();

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/devman');
/* GET users listing. */
router.post('/createServer', function(req, res, next) {
  var userName =  req.body.userName;
  var ipaddress = req.body.ipaddress;
  var ports = req.body.ports;

    //Add data to db
  if(userName!=null&&ipaddress!=null&&ports!=null){
    var server = new Servers({
      username: userName,
      ip: ipaddress,
      port: ports
      });
    server.save(function(err){
          if(err) {
              console.error('ERROR!');
          }else{
            /// after create server maybe you want to check or something

            // remote to client server
            // var args = {
            // 	data: { userName: username, password: password ,command:command },
            // 	headers: { "Content-Type":  "application/x-www-form-urlencoded" }
            // };
            // client.post("http://13.67.52.91:9999", args, function (data, response) {
            // 	// parsed response body as js object
            // 	console.log(data);
            //   res.send(data);
            // });
            res.json({message:'DONE'});
          }
      });

    }else{
      res.json({message:'WTF ip or port'});
    }

});

router.post('/createComponent', function(req, res, next) {
  var ipaddress = req.body.ipaddress;
  var component = "";//["xxx","yyy"]
  var command = "";

  /// Gen Code



  //Add Data to db && get IP
  Servers.findOne({ip:ipaddress}, function(err, data){
      if(err){throw err}

      for(c in component){
        data.components.push = {name:c,
                                status:"DONE"}
      }
      data.save(function (err) {
          if(err) {
              console.error('ERROR!');
          }else{

            // remote to client server
            
            res.send("DONE");
            // var args = {
            //   data: { account: account, command:command },
            //   headers: { "Content-Type":  "application/x-www-form-urlencoded" }
            // };
            // client.post("http://13.67.52.91:9999", args, function (data, response) {
            //   // parsed response body as js object
            //   console.log(data);
            //   res.send(data);
            // });

          }
      });

  });

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
