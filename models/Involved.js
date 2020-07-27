const mongoose=require('mongoose')
var SchemaTypes = mongoose.Schema.Types
var Int32 = require('mongoose-int32');

const InvolvedSchema=mongoose.Schema({
    
   uniq_name:String,
   UsageYear:Int32,
   Technology:String,
   Counter:Int32,
   TotalUsers:Int32,
   CountAnswer:Int32,
   CountQuestion:Int32
   

})
//const User = mongoose.model("Invloved", UserSchema, "Invloved");
module.exports=mongoose.model('involved',InvolvedSchema,'involved')