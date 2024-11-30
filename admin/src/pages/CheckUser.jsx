import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getUser } from '../feature/auth/authSlice'
import { IoMdArrowBack } from "react-icons/io";
export default function CheckUser() {
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(()=>{
        dispatch(getUser(id))
    },[id])
    const useState = useSelector(state=>state.auth?.getUser?.getUser)
    return (
    <div>
        <div className="">
            <h2>THÔNG TIN NGƯỜI DÙNG</h2>
        </div>
        <div className="py-4 fs-6">
            <div className="d-flex">
                <strong className='d-block me-3'>Tên: </strong>
                <p>{useState?.name}</p>
            </div>
            <div className="d-flex">
                <strong className='d-block me-3'>Email: </strong>
                <p>{useState?.email}</p>
            </div>
            <div className="d-flex">
                <strong className='d-block me-3'>Số điện thoại: </strong>
                <p>{useState?.mobile}</p>
            </div>
            <div className="d-flex">
                <strong className='d-block me-3'>Địa chỉ: </strong>
                <p>{useState?.address}</p>
            </div>
        </div>
        <div className="gap-10 btn btn-primary" style={{width:"100px"}}>
            <Link to='/admin/list-users' className='fs-6 text-decoration-none text-white d-flex align-items-center'>
                <IoMdArrowBack className='me-2'/>
                <span>Trở lại</span>
            </Link>
        </div>
    </div>
  )
}
