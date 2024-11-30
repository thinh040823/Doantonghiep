import axios from "axios";
import {base_url} from '../../utils/base_url'
import {config} from '../../utils/axiosconfig';

const getSlide = async()=>{
    const res = await axios.get(`${base_url}slide/get-all-slide`)
    return res.data
}
const createSlide =async(slide)=>{
    const res = await axios.post(`${base_url}slide/add-slide`,slide,config)
    return res.data
}

const getIdSlide =async(id)=>{
    const res = await axios.get(`${base_url}slide/get-slide/${id}`,config)
    return res.data
}

const updateSlide =async(slide)=>{
    const res = await axios.put(`${base_url}slide/update-slide/${slide?._id}`,{images:slide?.slideData?.images},config)
    return res.data
}

const deleteSlide =async(id)=>{
    const res = await axios.delete(`${base_url}slide/delete-slide/${id}`,config)
    return res.data
}

const SlideService={
    getSlide,
    createSlide,
    getIdSlide,updateSlide,deleteSlide
}

export default SlideService