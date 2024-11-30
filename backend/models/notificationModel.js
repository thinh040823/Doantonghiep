const mongoose = require('mongoose'); // Erase if already required

var notificationSchema = new mongoose.Schema({
    read:{
        type:Boolean,
        default:false
    },
    message:{
        type:String
    },
    count:{
        type:Number
    }
},{
    timestamps:true
});

module.exports = mongoose.model('notification', notificationSchema);