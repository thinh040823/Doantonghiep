const express = require('express')
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware')
const { addSupplier, getSupplier, getAllSupplier, updateSupplier, deleteSupplier } = require('../controllers/supplierController')
const route = express.Router()

route.post('/add-supplier',authMiddleware,isAdmin,addSupplier)
route.get('/get-supplier/:_id',getSupplier)
route.get('/get-all-supplier',getAllSupplier)
route.put('/update-supplier/:_id',authMiddleware,isAdmin,updateSupplier)
route.delete('/delete-supplier/:_id',authMiddleware,isAdmin,deleteSupplier)





module.exports = route