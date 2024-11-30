import axios from "axios";
import {base_url} from '../../utils/base_url'
import {config} from '../../utils/axiosconfig';

const getPcategoryBlog = async()=>{
    const res = await axios.get(`${base_url}categoryblog/get-all-categoryblog`)
    return res.data
}

const createCategoryBlog =async(category)=>{
    const res = await axios.post(`${base_url}categoryblog/add-categoryblog`,category,config)
    return res.data
}

const getIdCategoryBlog =async(id)=>{
    const res = await axios.get(`${base_url}categoryblog/get-categoryblog/${id}`,config)
    return res.data
}

const updateCategoryBlog =async(category)=>{
    const res = await axios.put(`${base_url}categoryblog/update-categoryblog/${category?._id}`,{title:category?.categoryData?.title},config)
    return res.data
}

const deleteCategoryBlog =async(id)=>{
    const res = await axios.delete(`${base_url}categoryblog/delete-categoryblog/${id}`,config)
    return res.data
}

const pcategoryService={
    getPcategoryBlog,createCategoryBlog,getIdCategoryBlog,updateCategoryBlog,deleteCategoryBlog
}

export default pcategoryService