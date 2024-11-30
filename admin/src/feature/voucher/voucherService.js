import axios from "axios";
import {base_url} from '../../utils/base_url'
import {config} from '../../utils/axiosconfig';


const createVoucher =async(data)=>{
    const res = await axios.post(`${base_url}voucher/add-voucher`,data,config)
    return res.data
}

const getAllVoucher =async()=>{
    const res = await axios.get(`${base_url}voucher/all-voucher`,config)
    return res.data
}

const voucherProductService={
    createVoucher,getAllVoucher
}

export default voucherProductService