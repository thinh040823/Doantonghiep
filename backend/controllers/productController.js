const ProductModel = require('../models/productModel.js')
const asyncHandle = require('express-async-handler')
const slugify = require('slugify')
const userModel = require('../models/userModel.js')


// create new product
const createProduct = asyncHandle(async(req,res)=>{
    try {
        // 2:32
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await ProductModel.create(req.body)
        res.status(200).send({
            success : true,
            message : "create product success !",
            newProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "create product error !"
        })
    }
})


// update product
const updateProduct = asyncHandle(async (req, res) => {
    const {_id} = req.params;
    console.log(req.body)
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updateProduct = await ProductModel.findOneAndUpdate({ _id }, req.body, {
        new: true,
      })
      res.status(200).send({
        success : true,
        message : "update product success !"
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "update product error !"
        })
    }
  });
  // delete product
const deleteProduct = asyncHandle(async (req, res) => {
    const {_id} = req.params;
    try {
      const deleteProduct = await ProductModel.findOneAndDelete({_id})
      res.status(200).send({
        success : false,
        message : "delete product success !",
        deleteProduct
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "delete product error !"
        })
    }
});

// get a product
const getaProduct = asyncHandle(async(req,res)=>{
    const {id}= req.params
    try {
        const findProduct = await ProductModel.findById(id)
        res.status(200).send({
            success : true,
            message : "get a product error !",
            findProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get a product error !"
        })
    }
})

const getSlugProduct = asyncHandle(async(req,res)=>{
    const {slug}= req.params
    try {
        const findProduct = await ProductModel.findOne({slug})
        res.json(findProduct)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get a product error !"
        })
    }
    // console.log(slug)
})

// get all product
const getAllProduct = asyncHandle(async(req,res)=>{
    try {

        // filtering 
        const queryObj = {...req.query} //truy vấn của yêu cầu (req.query) bằng cách sử dụng toán tử spread (...)
        // Một mảng excludeFields được định nghĩa để loại bỏ các trường cụ thể khỏi các tham số truy vấn (page, sort, limit, fields).
        const excludeFiedls = ['page','sort','limit','fields'] // cho ban đầu 
        excludeFiedls.forEach(el =>delete queryObj[el]) // nếu có cái nào trùng với queryObj thì xóa đi

        let queryStr = JSON.stringify(queryObj)
        // Các tham số truy vấn còn lại được chuyển đổi thành một chuỗi JSON 
        // (queryStr) và sau đó được biến đổi bằng một biểu thức chính quy để thay thế một 
        // số toán tử so sánh cụ thể (gte, gt, lte, lt) bằng các giá trị tương ứng của MongoDB ($gte, $gt, $lte, $lt).
        // replace sử dụng để thay thế một chuỗi con cụ thể bằng một chuỗi mới
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) =>`$${match}`) 
        // Nếu match là "gte", thì chuỗi mới sẽ là "$gte".
        // Nếu match là "gt", thì chuỗi mới sẽ là "$gt".


        let query = ProductModel.find(JSON.parse(queryStr)) // tìm kiếm các từ khóa được trả về


        // sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ")
            query=query.sort(sortBy) // lấy hết những gì query.sort có
        }else{
            query = query.sort("-createdAt")
        }
        // liming the fields
        if(req.query.fields){ // truy vấn tất cả những gì mà người search trên url http://localhost:5000/api/product/getall-product?fields=title,price,category
            const fields = req.query.fields.split(",").join(" ")
            query=query.select(fields) // lấy hết những gì query.sort có
        }else{
            query = query.select("-__v")
        }

        // pagination
        const page = req.query.page
        const limit = req.query.limit
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)
        if(req.query.page){
            const productCount = await ProductModel.countDocuments()
            if(skip>= productCount){
                res.status(500).send({
                    success : false,
                    message : "This page does not exists !"
                })
            }
        }

        console.log(page,limit,skip)


        const findProduct = await query // trả về kết quả
        res.json(findProduct)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get all product error !"
        })
    }
})



// danh gai san pham
const rating = asyncHandle(async (req, res) => {
    // Extract User ID and Rating Data from Request
    const { _id } = req.user; // User ID from logged-in user
    const { star, prodId, comment } = req.body; // Rating data from the request body
    try {
        // Find the product by its ID
        const product = await ProductModel.findById(prodId);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found",
            });
        }
        // Add the new rating to the ratings array
        const newRating = {
            star,
            comment,
            postedby: _id,
        };
        product.ratings.push(newRating);

        // Recalculate the total rating
        const totalStars = product.ratings.reduce((sum, rating) => sum + rating.star, 0);
        const totalRating = (totalStars / product.ratings.length).toFixed(2);

        // Update the total rating field
        product.totalrating = totalRating;

        // Save the updated product
        await product.save();

        res.status(200).send({
            success: true,
            message: "Rating added successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Rating API",
            error,
        });
    }
});


 const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await ProductModel
      .find({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};
  // tạo cloudinaly(utils) và uploadimg(middleware) trước


module.exports = {createProduct ,getaProduct,getAllProduct
  ,updateProduct,deleteProduct,rating,getSlugProduct,searchProductController
  }

