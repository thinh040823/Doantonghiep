import axios from "axios";
import {base_url} from '../../utils/base_url'
import {config} from '../../utils/axiosconfig';

const getSupplier = async()=>{
    const res = await axios.get(`${base_url}supplier/get-all-supplier`)
    return res.data
}
const createSupplier =async(brand)=>{
    const res = await axios.post(`${base_url}supplier/add-supplier`,brand,config)
    return res.data
}

const getIdSupplier =async(id)=>{
    const res = await axios.get(`${base_url}supplier/get-supplier/${id}`,config)
    return res.data
}

const updateSupplier =async(supplier)=>{
    const res = await axios.put(`${base_url}supplier/update-supplier/${supplier?._id}`,{title:supplier?.supplierData?.title},config)
    return res.data
}

const deleteSupplier =async(id)=>{
    const res = await axios.delete(`${base_url}supplier/delete-supplier/${id}`,config)
    return res.data
}

const supplierService={
    getSupplier,
    createSupplier,
    getIdSupplier,updateSupplier,deleteSupplier
}

export default supplierService