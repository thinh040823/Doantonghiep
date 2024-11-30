const mongoose = require('mongoose'); // Erase if already required
// Declare the Schema of the Mongo model
var voucherSchema = new mongoose.Schema({
    startDay:{
        type:Date,
        required:true,
    },
    endDay:{
        type:Date,
        required:true,
    },
    percent:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    view:{
        type:Number,
        default: 0
    },
    title:{
        type:String,
        required:true,
    },
},{
    timestamps:true // time create
});
module.exports = mongoose.model('Voucher', voucherSchema);