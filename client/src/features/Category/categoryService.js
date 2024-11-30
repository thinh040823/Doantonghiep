import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'
const getAllCategory=async()=>{
    const res = await axios.get(`${base_url}category/get-all-category`)
    if(res.data){
        return res.data
    }
}
const getCategory=async(id)=>{
    const res = await axios.get(`${base_url}category/get-category/${id}`)
    if(res.data){
        return res.data
    }
}

export const categoryService={
    getAllCategory,getCategory
}