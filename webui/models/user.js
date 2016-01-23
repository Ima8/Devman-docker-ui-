var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password:   String,
  server:   [{ ip: String,
      port: String ,
      component:[
        {name:String,
          link:String,
          status:String}
        ]}
      ],
});
mongoose.model("Users",userSchema);
