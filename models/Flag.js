const mongoose=require('mongoose')
var SchemaTypes = mongoose.Schema.Types
var Int32 = require('mongoose-int32');

const FlagSchema=mongoose.Schema({
    
   url:String,  
   alpha3:String,
   file_url:String,
   name:String,
   license:String
   

})
module.exports=mongoose.model('flags',FlagSchema,'flags')