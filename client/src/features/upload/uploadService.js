import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'

// tham so la img
const uploadImg = async(data)=>{
    const res = await axios.post(`${base_url}upload/upload`,data,config)
    return res.data
}

const deleteImg = async(id)=>{
    const res = await axios.delete(`${base_url}upload/delete-image/${id}`,config)
    return res.data
}
const deleteImgModel = async(data)=>{
    const res = await axios.delete(`${base_url}upload/delete-imagemodel/${data?.id}/${data?.public_id}`,config)
    return res.data
}
const uploadService = {
    uploadImg,
    deleteImg,
    deleteImgModel
}

export default uploadService