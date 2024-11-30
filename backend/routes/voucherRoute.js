const express = require('express')
const { isAdmin,authMiddleware} = require('../middlewares/authMiddleware')
const { addVoucher, getAllVoucher } = require('../controllers/voucherController')

const route = express.Router()

route.post('/add-voucher',authMiddleware,isAdmin,addVoucher)
route.get('/all-voucher',getAllVoucher)


module.exports = route