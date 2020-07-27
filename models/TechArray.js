const mongoose=require('mongoose')
var SchemaTypes = mongoose.Schema.Types
var Int32 = require('mongoose-int32');

const TechChoosenSchema=mongoose.Schema({
    
  TechInput:Array
   

})
module.exports=mongoose.model('techinput',TechChoosenSchema,'techinput')