import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import moment from 'moment-timezone';
import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'react-toastify' 
import { Link } from 'react-router-dom';
import CustomModel from '../components/CustomModel';
import { deleteBlog, getBlogs } from '../feature/blog/blogSlice';
import { IoEyeSharp } from "react-icons/io5";

const { Search } = Input;

const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Tên blog',
    dataIndex: 'title',
    sorter :(a,b)=>a.title.length - b.title.length
  },
  {
    title: 'Image',
    dataIndex: 'image',
    render: (text, record) => (
      <div>
        {record?.image?.length > 0 && (
          <img
            key={record?.image[0]?._id}
            src={record?.image[0]?.url}
            alt={record?.title}
            style={{ width: '200px', height: '100px', objectFit: 'cover', marginRight: '5px' }}
          />
        )}
      </div>
    ),
  },
  {
    title: 'Danh mục',
    dataIndex: 'categoryBlog'
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt'
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
const ListBlog = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getBlogs())
  },[])

  const stateBlogs = useSelector(state=>state?.blog?.blogs)
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setUserId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const filteredData = stateBlogs?.filter(item =>
    item?.title?.toLowerCase().includes(searchText.toLowerCase()) ||
    item?.categoryBlog?.toLowerCase().includes(searchText.toLowerCase())
  );
   const deleteUs = (e) => {
    dispatch(deleteBlog(e));
    setOpen(false);
    toast.success("Đã xóa thành công")
    setTimeout(()=>{
        dispatch(getBlogs());
    },100)
  }
  const data1 = [];
  for (let i = 0; i < filteredData?.length; i++) {
    if(filteredData[i]?.role === "admin"){
    }else{
      data1.push({
        key: i+1,
        title: filteredData[i]?.title,
        image: filteredData[i]?.images,
        categoryBlog: filteredData[i]?.categoryBlog,
        createdAt: moment(filteredData[i]?.createdAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
        action: (
            <div className='d-flex align-items-center'>
              <Link to={`/admin/blog/${filteredData[i]?._id}`} className='btn-list text-decoration-none me-3'>
                <span className='btn-edit'>Edit</span>
              </Link>
              <button className='btn-list text-decoration-none me-2'>
                <span className='btn-delete' onClick={
                    ()=>showModal(filteredData[i]._id)}>
                        Delete
                </span>
              </button>
              <Link to={`/admin/check-blog/${filteredData[i]?._id}`} className='btn-list text-decoration-none'>
                <IoEyeSharp className='fs-5'/>
              </Link>
            </div>
          )
      });
    }
  }
    return (
        <div>
          <h3 className='mb-4 title'>
              QUẢN LÝ DANH SÁCH BLOG
          </h3>
          <div className="row">
            <div className="col-4">
                <button className='btn btn-primary'>
                    <Link to='/admin/add-blog' className='text-decoration-none text-white'>
                      Thêm Blog
                    </Link>
                </button>
            </div>
            <div className="col-8">
                <Search
                    placeholder="Tìm kiếm Blog"
                    allowClear
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
        </div>
        <div className="">
            <Table  columns={columns} dataSource={data1} />
        </div>
        <CustomModel
            hideModal={hideModal}
            open={open}
            performAction={() => { deleteUs(userId) }}
            title="Bạn có muốn xóa Blog này không ?" />
      </div>
    );
}

export default ListBlog;
