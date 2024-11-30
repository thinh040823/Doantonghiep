const SlideModel = require('../models/slideModel')
const slugify = require('slugify')


// add new product
const addSlide = async(req,res)=>{
    try {
        
        const newSlide = await SlideModel.create(req.body)
        res.status(200).send({
            success : true,
            message : "create product success !",
            newSlide
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "create product error !"
        })
    }
}
/////////////////////////////////////////////

// get a product
const getaSlide = async(req,res)=>{
    const {id}= req.params
    try {
        const findProduct = await SlideModel.findById(id)
        res.json(findProduct)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get a product error !"
        })
    }
    // console.log(id)
}
/////////////////////////////////////////////////


// get all product
const getAllSlide = async(req,res)=>{ // áync bất đồng bộ 
    try {

        const findProduct = await SlideModel.find() // trả về kết quả list danh sach, .find la ham lấy tát cả ra
        res.json(findProduct) // res la day len réponse cho m`1ình thấy
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get all product error !"
        })
    }
}



// update product
const updateSlide = async (req, res) => {
    const {_id} = req.params;
    try {
      
      const updateProduct = await SlideModel.findOneAndUpdate({ _id},{images:req.body?.images}, {
        new: true,
      })
      res.status(200).send({
        success : true,
        message : "update product success !",
        updateProduct
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "update product error !"
        })
    }
}
  // delete product
const deleteSlide = async (req, res) => {
    const {_id} = req.params;
    try {
      const deleteSlide = await SlideModel.findOneAndDelete({_id})
      res.status(200).send({
        success : true,
        message : "delete product success !",
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "delete product error !"
        })
    }
}

///////////////////////////////////////////////





module.exports = {addSlide,getaSlide,getAllSlide,updateSlide,deleteSlide}

