const express = require('express')
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware')
const { addSlide, getaSlide, getAllSlide, updateSlide, deleteSlide } = require('../controllers/slideController')
const route = express.Router()
route.post('/add-slide',authMiddleware,isAdmin,addSlide)
route.get('/get-slide/:id',getaSlide)
route.get('/get-all-slide',getAllSlide)
route.put('/update-slide/:_id',authMiddleware,isAdmin,updateSlide)
route.delete('/delete-slide/:_id',authMiddleware,isAdmin,deleteSlide)





module.exports = route