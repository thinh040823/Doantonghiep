const express = require('express')

const { isAdmin,authMiddleware} = require('../middlewares/authMiddleware')
const { addPackageProduct, getAllPackage, getPackage } = require('../controllers/packageProduct')
const route = express.Router()



route.post('/add-package-product',authMiddleware,isAdmin,addPackageProduct)
route.get('/all-package',getAllPackage)
route.get('/get-package/:_id',authMiddleware,isAdmin,getPackage)


module.exports = route