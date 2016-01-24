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


/* GET home page. */
router.post('/Hey', function(req, res, next) {
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
                    res.json({message:'ERROR'});
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

module.exports = router;
