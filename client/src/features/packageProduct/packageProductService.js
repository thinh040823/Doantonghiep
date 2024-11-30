import axios from "axios";
import {base_url} from '../../utils/base_url'
import {config} from '../../utils/axiosconfig';


const createPackage =async(data)=>{
    const res = await axios.post(`${base_url}package/add-package-product`,data,config)
    return res.data
}

const getAllPackage =async()=>{
    const res = await axios.get(`${base_url}package/all-package`,config)
    return res.data
}

const packageProductService={
    createPackage,getAllPackage
}

export default packageProductService