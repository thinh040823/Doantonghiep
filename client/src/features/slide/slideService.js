import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'
const getAllSlide=async()=>{
    const res = await axios.get(`${base_url}slide/get-all-slide`)
    if(res.data){
        return res.data
    }
}

export const SlideService={
    getAllSlide
}