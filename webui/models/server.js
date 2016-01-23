var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var componentSchema = new Schema({
  name:String,
  status:String
});

var serverSchema = new Schema({
  username: String,
  ip: String,
  port: String,
  components:[componentSchema]
});

mongoose.model("Components",componentSchema);
mongoose.model("Servers",serverSchema);
