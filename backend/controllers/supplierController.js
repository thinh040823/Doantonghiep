const supplierModel = require('../models/supplier.js')

const addSupplier = async(req,res)=>{
    try {
        const newsupplier = await supplierModel.create(req.body)
        newsupplier.save()
        res.status(200).send({
            success : true,
            message : "Create supplier successfully",
            newsupplier
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "create supplier false!"
        })
    }
}

const getSupplier = async(req,res)=>{
    const {_id}= req.params
    try {
        const getsupplier = await supplierModel.findById(_id)
        res.status(200).send({
            success : true,
            message : "get supplier successfully",
            getsupplier
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get supplier false!"
        })
    }
}

const getAllSupplier = async(req,res)=>{
    try {
        const getsupplier = await supplierModel.find()
        res.json(getsupplier)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get all supplier false!"
        })
    }
}

const updateSupplier = async(req,res)=>{
    const {_id}= req.params
    try {
        const udsupplier = await supplierModel.findByIdAndUpdate(_id,req.body,{new :true})
        res.status(200).send({
            success : true,
            message : "update supplier successfully",
            udsupplier
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "update supplier false!"
        })
    }
}


const deleteSupplier = async(req,res)=>{
    const {_id}= req.params
    try {
        const delsupplier = await supplierModel.findByIdAndDelete(_id)
        res.status(200).send({
            success : true,
            message : "delete supplier successfully",
            delsupplier
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "delete supplier false!"
        })
    }
}

module.exports = {addSupplier,getAllSupplier,getSupplier,updateSupplier,deleteSupplier}