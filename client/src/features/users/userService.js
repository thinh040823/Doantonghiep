import axios from 'axios'
import { base_url } from '../../utils/base_url'
import {config} from '../../utils/axiosconfig'
const SendEmailOTP=async(email)=>{
    const res = await axios.post(`${base_url}auth/sendemail/${email}`)
    if(res.data){
        return res.data
    }
}

const registerUser=async(userData)=>{
    const res = await axios.post(`${base_url}auth/register`,userData)
    if(res.data){
        return res.data
    }
}

const loginUser=async(userData)=>{
    const res = await axios.post(`${base_url}auth/login`,userData)
    if(res.data){
        return res.data
    }
}
const updateUser = async(dataUser)=>{
    const res = await axios.put(`${base_url}auth/update-user/${dataUser._id}`,dataUser.values,config) 
    return res.data
}
const updatePass = async(dataUser)=>{
    const res = await axios.put(`${base_url}auth/password/${dataUser._id}`,dataUser.values,config) 
    return res.data
}

const getUser=async(id)=>{
    const res = await axios.put(`${base_url}auth/get-user/${id}`)
    if(res.data){
        return res.data
    }
}
const addToCart=async(cartDate)=>{
    const res = await axios.post(`${base_url}auth/cart`,cartDate,config)
    if(res.data){
        return res.data
    }
}
const getCart=async()=>{
    const res = await axios.get(`${base_url}auth/get-cart`,config)
    if(res.data){
        return res.data
    }
}

const removeProductCart=async(cartItemId)=>{
    const res = await axios.delete(`${base_url}auth/delete-cart/${cartItemId}`,config)
    if(res.data){
        return res.data
    }
}

const updateProductCart=async(cartDetail)=>{
    const res = await axios.put(`${base_url}auth/update-cart/${cartDetail?.cartItemId}/${cartDetail?.newQuantity}`,null,config)
    if(res.data){
        return res.data
    }
}


const empty=async()=>{
    const res = await axios.delete(`${base_url}auth/empty-cart`,config)
    return res.data
}

const getOrder=async()=>{
    const res = await axios.get(`${base_url}auth/getmyorders`,config)
    if(res.data){
        return res.data
    }
}
export const authService={
    registerUser,loginUser,addToCart,getCart,removeProductCart,updateProductCart,empty,
    getUser,updateUser,getOrder,updatePass,SendEmailOTP
}