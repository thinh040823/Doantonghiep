const packageProductModel = require('../models/packageProduct.js')
const mongoose = require('mongoose');
const addPackageProduct = async (req, res) => {
    const {id} = req.user
     try {
        console.log('Request Body:', req.body); // Log the request body

        const { userId, ncc, productId, quantity } = req.body;
        if (!productId) {
            return res.status(400).send({
                success: false,
                message: 'productId is required',
            });
        }
        // Fetch product details from Product model
        const product = await mongoose.model('Product').findById(productId);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found',
            });
        }

        const productName = product.title; // Assuming the product schema has a 'name' field
        const unitPrice = product.price; // Assuming the product schema has a 'price' field

        let existingPackageProduct = await packageProductModel.findOne({ ncc, productId });

        const historyEntry = {
            date: new Date(),
            productName,
            quantity,
            unitPrice,
            userId:id
        };

        if (existingPackageProduct) {
            existingPackageProduct.quantity += quantity;
            existingPackageProduct.history.push(historyEntry);
            await existingPackageProduct.save();
            res.status(200).send({
                success: true,
                message: "Updated PackageProduct successfully",
                packageProduct: existingPackageProduct
            });
        } else {
            const newPackageProduct = new packageProductModel({
                userId:id,
                ncc,
                productId,
                quantity,
                history: [historyEntry]
            });
            await newPackageProduct.save();
            res.status(200).send({
                success: true,
                message: "Created PackageProduct successfully",
                packageProduct: newPackageProduct
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Failed to create or update PackageProduct!"
        });
    }
};

const getAllPackage = async(req,res)=>{
    try {
        const newPackageProduct = await packageProductModel.find().populate("productId").populate("userId")
        res.status(200).send({
            success : true,
            message : "get all successfully",
            newPackageProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get all PackageProduct false!"
        })
    }
}

const getPackage = async (req, res) => {
    const { _id } = req.params;
    try {
        const packageProduct = await packageProductModel.findById(_id)
            .populate("productId")
            .populate("userId");

        if (!packageProduct) {
            return res.status(404).send({
                success: false,
                message: "PackageProduct not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Get package product successfully",
            packageProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Get package product failed!"
        });
    }
};

module.exports = {addPackageProduct,getAllPackage,getPackage}