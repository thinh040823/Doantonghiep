import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'
const getAllCategoryBlog=async()=>{
    const res = await axios.get(`${base_url}categoryblog/get-all-categoryblog`)
    if(res.data){
        return res.data
    }
}
const getCategoryBlog=async(id)=>{
    const res = await axios.get(`${base_url}categoryblog/get-categoryblog/${id}`)
    if(res.data){
        return res.data
    }
}

export const categoryBlogService={
    getAllCategoryBlog,getCategoryBlog
}