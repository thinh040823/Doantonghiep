const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productEntrySchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    packageProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PackageProduct",
        required: true,
    },
}, {
    timestamps: true
});

// Export the model
module.exports = mongoose.model('ProductEntry', productEntrySchema);
