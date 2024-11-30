import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getaProduct } from '../feature/product/productSlice'
import { IoMdArrowBack } from "react-icons/io";
import ProductDescription from '../components/ProductDescription';

export default function CheckProduct() {
    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getaProduct(id))
    },[id])
    const aProduct = useSelector(state=>state?.product?.aPr?.findProduct)

    return (
    <div>
      <div className="">
            <h2>THÔNG TIN SẢN PHẨM</h2>
        </div>
        <div className="py-4 fs-6">
            <div className="d-flex py-2">
                <strong className='d-block me-3'>Tên Blog: </strong>
                <p>{aProduct?.title}</p>
            </div>
            <div className="d-flex py-2">
                <strong className='d-block me-3'>Giá tiền: </strong>
                <p>{aProduct?.price}</p>
            </div>
            <div className="d-flex py-2">
                <strong className='d-block me-3'>Images: </strong>
                <img src={aProduct?.images[0]?.url} width="500px" height="auto" alt="" />
            </div>
            <div className="d-flex py-2">
                <strong className='d-block me-3'>Danh mục: </strong>
                <p>{aProduct?.category}</p>
            </div>
            <div className="d-flex py-2">
                <strong className='d-block me-3'>Thương hiệu: </strong>
                <p>{aProduct?.brand}</p>
            </div>
            <div className="d-flex py-2">
                <strong className='d-block me-3'>Miêu tả ngắn: </strong>
                <p><ProductDescription description={aProduct?.descriptionShort}/></p>
            </div>
            <div className="d-flex py-2">
                <strong className='d-block me-3'>Miêu tả dài: </strong>
                <p><ProductDescription description={aProduct?.description}/></p>
            </div>
            <div className="d-flex py-2">
                <strong className='d-block me-3'>Tổng đánh giá: </strong>
                <p><ProductDescription description={aProduct?.totalrating}/></p>
            </div>
        </div>
        <div className="gap-10 btn btn-primary" style={{width:"100px"}}>
            <Link to='/admin/list-product' className='fs-6 text-decoration-none text-white d-flex align-items-center'>
                <IoMdArrowBack className='me-2'/>
                <span>Trở lại</span>
            </Link>
        </div>
    </div>
  )
}
