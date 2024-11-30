const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var packageProductSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",  
        required: true,
    },
    ncc:{
        type:String,
        required:true,
    },
    productId : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"Product",  
            required: true,
        },
    quantity:{
        type:Number,
        required:true,
    },
    history :[
        {
            date: {
                type: Date,
                default: Date.now
            },
            productName: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            unitPrice: {
                type: Number,
                required: true
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            }
        }
    ]
},{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('PackageProduct', packageProductSchema);