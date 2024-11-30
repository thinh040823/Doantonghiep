const express = require('express')
const route = express.Router()

const {authMiddleware,isAdmin} = require('../middlewares/authMiddleware.js')
const { addUser, loginUser, loginAdmin, createOrder, userCart, updateProductQuantityCart, updateUser, updatePassword, getUserCart, getAllUsers, getsignUser, handleRefreshToken, getMyOrder, getAllOrder, logout, deletesignUser, emptyCart, removeProductCart, updateStatusOrder, sendEmail, getAllNoti, markAllAsRead } = require('../controllers/userController.js')

route.post('/sendemail/:email',sendEmail)
route.post('/register',addUser)
route.post('/login',loginUser)
route.post('/admin-login',loginAdmin)
route.post('/cart/create-order',authMiddleware,createOrder)
route.post('/cart',authMiddleware,userCart)
// route.post('/forgot-password-token',forgotPasswordToken)
// create cart


route.put('/update-cart/:cartItemId/:newQuantity',authMiddleware,updateProductQuantityCart)
route.put('/update-user/:_id',authMiddleware ,updateUser)
route.put('/password',authMiddleware,updatePassword)

route.get('/getallnoti',getAllNoti)
route.post('/markAllAsRead', markAllAsRead);

route.get('/get-cart',authMiddleware,getUserCart)
route.get('/all-user',getAllUsers)
route.get('/get-user/:_id',authMiddleware,isAdmin, getsignUser)
route.get("/refresh", handleRefreshToken);
route.get('/getmyorders',authMiddleware,getMyOrder)
route.get('/get-all-orders',authMiddleware,isAdmin,getAllOrder)
route.get("/logout", logout);

route.put('/order/update-order/:_id/:status',authMiddleware,isAdmin,updateStatusOrder)

route.delete('/delete-user/:_id',deletesignUser)
route.delete('/empty-cart',authMiddleware,emptyCart)
route.delete('/delete-cart/:cartItemId',authMiddleware,removeProductCart)


module.exports = route
