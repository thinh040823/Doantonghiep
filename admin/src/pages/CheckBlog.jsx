import React, { useEffect } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getIdBlog } from '../feature/blog/blogSlice';
import ProductDescription from '../components/ProductDescription';
import { getUser } from '../feature/auth/authSlice';
import moment from 'moment-timezone';

export default function CheckBlog() {
    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getIdBlog(id))
    },[id])
    const blogState = useSelector(state=>state.blog?.blogId?.findBlog)
   
    return (
    <div>
        <div className="">
            <h2>THÔNG TIN BLOG</h2>
        </div>
        <div className="py-4 fs-6">
            <div className="d-flex py-2">
                <strong className='d-block me-3'>Tên Blog: </strong>
                <p>{blogState?.title}</p>
            </div>
            <div className="d-flex py-2">
                <strong className='d-block me-3'>Images: </strong>
                <img src={blogState?.images[0]?.url} width="500px" height="auto" alt="" />
            </div>
            <div className="d-flex py-2">
                <strong className='d-block me-3'>Thời gian: </strong>
                {moment(blogState?.createdAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss")}
            </div>
            <div className="d-flex py-2">
                <strong className='d-block me-3'>Danh mục: </strong>
                <p>{blogState?.categoryBlog}</p>
            </div>
            <div className="d-flex py-2">
                <strong className='d-block me-3'>Miêu tả: </strong>
                <p><ProductDescription description={blogState?.description}/></p>
            </div>
            <div className="d-flex py-2">
                <strong className='d-block me-3'>Cập nhật bởi: </strong>
                <p>{blogState?.orderBy?.name}</p>
            </div>
        </div>
        <div className="gap-10 btn btn-primary" style={{width:"100px"}}>
            <Link to='/admin/list-blogs' className='fs-6 text-decoration-none text-white d-flex align-items-center'>
                <IoMdArrowBack className='me-2'/>
                <span>Trở lại</span>
            </Link>
        </div>
    </div>
  )
}
