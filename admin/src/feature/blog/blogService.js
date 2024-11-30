import axios from "axios";
import {base_url} from '../../utils/base_url'
import {config} from '../../utils/axiosconfig';

const getBlogs = async()=>{
    const res = await axios.get(`${base_url}blog/get-all-blog`)
    return res.data
}
const createBlog =async(blog)=>{
    const res = await axios.post(`${base_url}blog/add-blog`,blog,config)
    return res.data
}

const getIdBlog =async(id)=>{
    const res = await axios.get(`${base_url}blog/get-blog/${id}`,config)
    return res.data
}

const updateBlog =async(blog)=>{
    const res = await axios.put(`${base_url}blog/update-blog/${blog?._id}`,{blog:blog?.blogData},config)
    return res.data
}

const deleteBlog =async(id)=>{
    const res = await axios.delete(`${base_url}blog/delete-blog/${id}`,config)
    return res.data
}

const BlogService={
    getBlogs,
    createBlog,
    getIdBlog,updateBlog,deleteBlog
}

export default BlogService