import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'
const createContact=async(data)=>{
    const res = await axios.post(`${base_url}contact/add-contact`,data,config)
    if(res.data){
        return res.data
    }
}
const getAllContact=async()=>{
    const res = await axios.get(`${base_url}contact/get-all-contact`)
    if(res.data){
        return res.data
    }
}
const getContact=async(id)=>{
    const res = await axios.get(`${base_url}contact/get-contact/${id}`)
    if(res.data){
        return res.data
    }
}

export const contactService={
    getAllContact,getContact,createContact
}