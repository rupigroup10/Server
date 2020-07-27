const mongoose=require('mongoose')
var SchemaTypes = mongoose.Schema.Types
var Int32 = require('mongoose-int32');

const TechnologySchema=mongoose.Schema({
    
   id:String,  
   TagName:String,
   

})
module.exports=mongoose.model('technology',TechnologySchema,'technology')