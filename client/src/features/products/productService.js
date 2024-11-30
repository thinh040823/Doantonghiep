import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'
const getAllProduct=async()=>{
    const res = await axios.get(`${base_url}product/getall-product`)
    if(res.data){
        return res.data
    }
}

const getAProduct=async(id)=>{
    const res = await axios.get(`${base_url}product/get-product/${id}`)
    if(res.data){
        return res.data
    }
}
const getSlugProduct=async(slug)=>{
    const res = await axios.get(`${base_url}product/get-slug-product/${slug}`)
    if(res.data){
        return res.data
    }
}

const ratingProduct=async(data)=>{
    const res = await axios.post(`${base_url}product/rating`,data,config)
    if(res.data){
        return res.data
    }
}

const search = async(keyword)=>{
    const res = await axios.get(`${base_url}product/search/${keyword}`)
    if(res.data){
        return res.data
    }
}

export const productService={
    getAllProduct,getAProduct,getSlugProduct,search,ratingProduct
}