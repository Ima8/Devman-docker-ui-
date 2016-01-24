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

    Servers.findOne({ip:ipaddress}, function(err, data){
        if(err){throw err}
        console.log(data);
        if(!data){
          var server = new Servers({
            username: userName,
            ip: ipaddress,
            port: ports
            });
          server.save(function(err){
                if(err) {
                    console.error('ERROR!');
                }else{
                  res.json({message:'DONE'});
                }
            });

          }else{
            res.json({message:'IP Duplicate'});
          }


    });

  }
});

router.post('/createComponent', function(req, res, next) {
  var ipaddress = req.body.ipaddress;
  var component = "";//["xxx","yyy"]
  var command_c = req.body.command;

  /// Gen Code



  //Add Data to db && get IP
  Servers.findOne({ip:ipaddress}, function(err, data){
      if(err){throw err}

      var ip_c = data.ip;
      var port_c = data.port;

      console.log("ip_c + "+ip_c);
      console.log("port + "+port_c);
      console.log("command +"+command_c);
      for(c in component){
        data.components.push = {name:c,
                                status:"DONE"}
      }
      data.save(function (err) {
          if(err) {
              return res.send("ERROR!");
          }else{

            // remote to client serve
            var ip = new Buffer(ip_c+"").toString('base64');
            var port = new Buffer(port_c+"").toString('base64');
            var command = new Buffer(command_c+"").toString('base64');
            var text = ip+" "+port+" "+command;
            console.log(command);
            //res.send("DONE");
            var args = {
              data: {text},
              headers: { "Content-Type":  "application/x-www-form-urlencoded" }
            };

            //128.199.94.82 port 1337
            console.log("Hey");

            client.post("http://128.199.93.151:7331", args, function (data, response) {
              // parsed response body as js object
              console.log(data);
              return res.send(data);
            });
          }
      });

  });

});

////
router.post('/createLink', function(req, res, next) {
  var ipaddress = req.body.ipaddress;
  var component = "";//["xxx","yyy"]
  var command = "";

  /// Gen Code



  //Add Data to db && get IP
  Servers.findOne({ip:ipaddress}, function(err, data){
      if(err){throw err}

      var ip_c = data.ip;
      var port_c = data.port;

      console.log("ip_c + "+ip_c);
      console.log("port + "+port_c);
      for(c in component){
        data.components.push = {name:c,
                                status:"DONE"}
      }

      // remote to client server
      var ip = new Buffer(ip_c+"").toString('base64');
      var port = new Buffer(port_c+"").toString('base64');
      var command = new Buffer(command+"").toString('base64');
      var text = ip+" "+port+" "+command;
      //res.send("DONE");
      var args = {
        data: {text},
        headers: { "Content-Type":  "application/x-www-form-urlencoded" }
      };

      //128.199.94.82 port 1337
      console.log("Hey");
      client.post("http://128.199.93.151:7331", args, function (data, response) {
        // parsed response body as js object
        console.log(data);
          data.save(function (err) {
            if(err) {
                console.error('ERROR!');
            }else{
              res.send(data);
            }
          });
        });
      return res.send("END");
  });

});


router.post('/delete',function(req,res,next){
  //Delete data from db
  // remote to delete docker
  var ipaddress = req.body.ipaddress;
  var command = "";

  /// Gen Code for delete



  //Add Data to db && get IP
  Servers.findOne({ip:ipaddress}, function(err, data){
      if(err){throw err}

      var ip_c = data.ip;
      var port_c = data.port;

      console.log("ip_c + "+ip_c);
      console.log("port + "+port_c);

      // remote to client server
      var ip = new Buffer(ip_c+"").toString('base64');
      var port = new Buffer(port_c+"").toString('base64');
      var command = new Buffer(command+"").toString('base64');
      var text = ip+" "+port+" "+command;
      //res.send("DONE");
      var args = {
        data: {text},
        headers: { "Content-Type":  "application/x-www-form-urlencoded" }
      };

      //128.199.94.82 port 1337
        console.log("Hey");
        client.post("http://128.199.93.151:7331", args, function (data, response) {
        // parsed response body as js object
        console.log(data);
        data.remove({ip:ipaddress}, function(err, data){
          res.send(data);
        });
      });
      return res.send("END");
  });

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
