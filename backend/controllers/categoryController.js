const categoryModel = require('../models/categoryModel.js')

const addCategory = async(req,res)=>{
    try {
        const newCategory = await categoryModel.create(req.body)
        newCategory.save()
        res.status(200).send({
            success : true,
            message : "Create brand successfully",
            newCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "create brand false!"
        })
    }
}

const getCategory = async(req,res)=>{
    const {_id}= req.params
    try {
        const getCategory = await categoryModel.findById(_id)
        res.status(200).send({
            success : true,
            message : "get Category successfully",
            getCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get brand false!"
        })
    }
}

const getAllCategory = async(req,res)=>{
    try {
        const getCategory = await categoryModel.find()
        res.json(getCategory)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get all Category false!"
        })
    }
}

const updateCategory = async(req,res)=>{
    const {_id}= req.params
    try {
        const udCategory = await categoryModel.findByIdAndUpdate(_id,req.body,{new :true})
        res.status(200).send({
            success : true,
            message : "update Category successfully",
            udCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "update Category false!"
        })
    }
}


const deleteCategory = async(req,res)=>{
    const {_id}= req.params
    try {
        const delCategory = await categoryModel.findByIdAndDelete(_id)
        res.status(200).send({
            success : true,
            message : "delete Category successfully",
            delCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "delete Category false!"
        })
    }
}

module.exports = {addCategory,getAllCategory,getCategory,updateCategory,deleteCategory}