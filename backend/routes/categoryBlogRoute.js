const express = require('express')
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware')
const { addCategoryBlog, getCategoryBlog, getAllCategoryBlog, updateCategoryBlog,
     deleteCategoryBlog } = require('../controllers/categoryBlogController')

const route = express.Router()

route.post('/add-categoryblog',authMiddleware,isAdmin,addCategoryBlog)
route.get('/get-categoryblog/:_id',getCategoryBlog)
route.get('/get-all-categoryblog',getAllCategoryBlog)
route.put('/update-categoryblog/:_id',authMiddleware,isAdmin,updateCategoryBlog)
route.delete('/delete-categoryblog/:_id',authMiddleware,isAdmin,deleteCategoryBlog)


module.exports = route