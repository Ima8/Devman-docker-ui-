var mongoose = require('mongoose')
 , models = require('./models/user.js');

var db = mongoose.connect("mongodb://localhost/test")
   ,User = mongoose.model("Users");

var user = new User({
  username: "admin",
  pasword:   "password",
  server:   [{ ip: "127.0.0.1",
      port: "89" ,
      component:[
        {name:"php5.1",
          link:"http://www.google.co.th",
          stutus:"Fail"},
       {name:"mysql",
           link:"http://www.google.co.th",
           stutus:"OK"}
        ]}
      ],
  });

user.save(function (err, model) {
         if (err) throw err;
         console.log("My new User is saved",
           "`save` hook worked as espected since we had no errors here");
});
//
// var Cat = mongoose.model('Cat', { name: String });
//
// var kitty = new Cat({ name: 'Zildjian' });
// kitty.save(function (err) {
//   if (err) // ...
//     console.log('meow');
//   console.log("Hello");
// });
