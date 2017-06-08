var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Task',new Schema({
    title:String,
    done:Boolean,
    date: { type: Date, detault: Date.now }
}));