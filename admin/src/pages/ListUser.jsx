import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';

import {useDispatch,useSelector} from 'react-redux'
import { deleteUser, getAllUser } from '../feature/auth/authSlice';
import {toast} from 'react-toastify' 
import { Link } from 'react-router-dom';
import { IoEyeSharp } from "react-icons/io5";
import CustomModel from '../components/CustomModel';
const { Search } = Input;

const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter :(a,b)=>a.name.length - b.name.length
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter :(a,b)=>a.email.length - b.email.length
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile'
  },
  {
    title: 'Role',
    dataIndex: 'role',
    sorter :(a,b)=>a.role.length - b.role.length
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
const ListUsers = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllUser())
  },[])
  const stateUsers = useSelector(state=>state?.auth?.getAllUser)
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
  const filteredData = stateUsers?.filter(item =>
    item?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    item?.email?.toLowerCase().includes(searchText.toLowerCase()) ||
    item?.address?.toLowerCase().includes(searchText.toLowerCase())
  );
   const deleteUs = (e) => {
    dispatch(deleteUser(e));
    setOpen(false);
    toast.success("Đã xóa thành công")
    setTimeout(()=>{
        dispatch(getAllUser());
    },100)
  }
  const data1 = [];
  for (let i = 0; i < filteredData?.length; i++) {
    data1.push({
        key: i,
        name: filteredData[i]?.name,
        email: filteredData[i]?.email,
        mobile: filteredData[i]?.mobile,
        role: filteredData[i]?.role,
        action: (
            <div className='d-flex align-items-center'>
              <Link to={`/admin/user/${filteredData[i]?._id}`} className='btn-list text-decoration-none me-3'>
                <span className='btn-edit'>Edit</span>
              </Link>
              <button className='btn-list text-decoration-none me-2'>
                <span className='btn-delete' onClick={
                    ()=>showModal(filteredData[i]._id)}>
                        Delete
                </span>
              </button>
              <Link to={`/admin/check-user/${filteredData[i]?._id}`} className='btn-list text-decoration-none'>
                <IoEyeSharp className='fs-5'/>
              </Link>
            </div>
          )
      });
  }
    return (
        <div>
          <h3 className='mb-4 title'>
              QUẢN LÝ NGƯỜI DÙNG
          </h3>
          <div className="row">
            <div className="col-4">
                <button className='btn btn-primary'>
                    <Link to='/admin/add-user' className='text-decoration-none text-white'>
                    Thêm người dùng
                    </Link>
                </button>
            </div>
            <div className="col-8">
                <Search
                    placeholder="Tìm kiếm người dùng"
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
            title="Bạn có muốn xóa người dùng này không ?" />
      </div>
    );
}

export default ListUsers;
