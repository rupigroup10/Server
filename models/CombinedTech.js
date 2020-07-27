const mongoose = require('mongoose')
var SchemaTypes = mongoose.Schema.Types
var Int32 = require('mongoose-int32');

const TechCombinedSchema = mongoose.Schema({

    Combination:Array,
    counter: Int32,


})
module.exports = mongoose.model('techcombination', TechCombinedSchema, 'techcombination')