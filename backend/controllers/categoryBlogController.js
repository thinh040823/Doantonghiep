const categoryBlogModel = require('../models/categoryBlogModel.js')

const addCategoryBlog = async(req,res)=>{
    try {
        const newCategoryBlog = await categoryBlogModel.create(req.body)
        newCategoryBlog.save()
        res.status(200).send({
            success : true,
            message : "Create category blog successfully",
            newCategoryBlog
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "create category blog  false!"
        })
    }
}

const getCategoryBlog = async(req,res)=>{
    const {_id}= req.params
    try {
        const getCategory = await categoryBlogModel.findById(_id)
        res.status(200).send({
            success : true,
            message : "get category blog  successfully",
            getCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get category blog  false!"
        })
    }
}

const getAllCategoryBlog = async(req,res)=>{
    try {
        const getCategory = await categoryBlogModel.find()
        res.json(getCategory)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get all category blog  false!"
        })
    }
}

const updateCategoryBlog = async(req,res)=>{
    const {_id}= req.params
    try {
        const udCategory = await categoryBlogModel.findByIdAndUpdate(_id,req.body,{new :true})
        res.status(200).send({
            success : true,
            message : "update category blog  successfully",
            udCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "update category blog  false!"
        })
    }
}


const deleteCategoryBlog = async(req,res)=>{
    const {_id}= req.params
    try {
        const delCategory = await categoryBlogModel.findByIdAndDelete(_id)
        res.status(200).send({
            success : true,
            message : "delete category blog  successfully",
            delCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "delete category blog  false!"
        })
    }
}

module.exports = {addCategoryBlog,getAllCategoryBlog,getCategoryBlog,
    updateCategoryBlog,deleteCategoryBlog}