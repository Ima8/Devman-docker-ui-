var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var componentSchema = new Schema({
  name:String,
  status:String
});
mongoose.model("Components",componentSchema);
