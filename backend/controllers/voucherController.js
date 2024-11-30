const voucherModel = require('../models/voucherModel.js')

const addVoucher = async (req, res) => {
    try {
        const newVoucher = await voucherModel.create(req.body)
        newVoucher.save()
        res.json(newVoucher)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "add voucher false!"
        });
    }
};

const getAllVoucher = async(req,res)=>{
    try {
        const newPackageProduct = await voucherModel.find()
        res.status(200).send({
            success : true,
            message : "get all voucher",
            newPackageProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get all voucher false!"
        })
    }
}

module.exports = {addVoucher,getAllVoucher}