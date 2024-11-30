import axios from 'axios'
import {base_url} from '../../utils/base_url'
const getTokenFromLocalStorage = sessionStorage.getItem('user') 
    ? JSON.parse(sessionStorage.getItem('user')) 
    : null

const config = {
    headers: {
        Authorization : `Bearer ${getTokenFromLocalStorage?.token}`,
        Accept : "application/json",
    }
}
// Định nghĩa hàm login trong authService:
const login = async(userData)=>{
    // nhan url ben backend
    const res = await axios.post(`${base_url}auth/admin-login`,userData) // nhận được value từ user data
    const data = res.data
    // login thành công sẽ làm gì ?
    if(data){
        sessionStorage.setItem('user',JSON.stringify(data))
    }
    return data
}
const register = async(data)=>{
    const res = await axios.post(`${base_url}auth/register`,data)
    return res.data
}
const getOrders = async()=>{
    const res = await axios.get(`${base_url}auth/getmyorders`,config)
    return res.data
}

const getOrderById = async(id)=>{
    const res = await axios.post(`${base_url}auth/get-orders-id/${id}`,"",config)
    return res.data
}

const getAllOrder = async()=>{
    const res = await axios.get(`${base_url}auth/get-all-orders`,config)
    return res.data
}

//PUT
// login admin backend
const updateUser = async(dataUser)=>{
    const res = await axios.put(`${base_url}auth/update-user/${dataUser._id}`,dataUser.values,config) 
    return res.data
}


// GET
// get all user backend
const getAllUser = async()=>{
    const res = await axios.get(`${base_url}auth/all-user`)
    return res.data
}

const getUser = async(id)=>{
    const res = await axios.get(`${base_url}auth/get-user/${id}`,config)
    return res.data
}
const deleteUser = async(id)=>{
    const res = await axios.delete(`${base_url}auth/delete-user/${id}`,config)
    return res.data
}
const updateStatusOrder = async(data)=>{
    const status = encodeURIComponent(data?.status); // Mã hóa giá trị status
    const res = await axios.put(`${base_url}auth/order/update-order/${data?._id}/${status}`,"", config);
    return res.data;
    // const updateStatusOrder = async (data) => {
}

// Xuất hàm login và tạo đối tượng authService:


const authService ={
    login,getAllUser,getUser,deleteUser,register,
    getOrders,getOrderById,getAllOrder,updateUser,
    updateStatusOrder
}

export default authService