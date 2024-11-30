const express = require('express')
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware')
const { addBrand, getBrand, getAllBrand, updateBrand, deleteBrand } = require('../controllers/brandController')
const route = express.Router()
route.post('/add-brand',authMiddleware,isAdmin,addBrand)
route.get('/get-brand/:_id',getBrand)
route.get('/get-all-brand',getAllBrand)
route.put('/update-brand/:_id',authMiddleware,isAdmin,updateBrand)
route.delete('/delete-brand/:_id',authMiddleware,isAdmin,deleteBrand)





module.exports = route