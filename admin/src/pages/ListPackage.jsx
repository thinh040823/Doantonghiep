import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPackage } from '../feature/packageProduct/packageProductSlice';
import moment from 'moment';
const { Search } = Input;

const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Ngày nhập hàng',
    dataIndex: 'createdAt',
  },
  {
    title: 'Tên nhà cung cấp',
    dataIndex: 'ncc',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'mobile',
  },
  {
    title: 'tên nhân viên',
    dataIndex: 'name',
  },
  {
    title: 'Tổng số lượng',
    dataIndex: 'quantity',
  },
  {
    title: 'action',
    dataIndex: 'action',
  }
];

const ListPackage = () => {
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPackage());
  }, [dispatch]);

  const statePackage = useSelector(state => state.package.packages?.newPackageProduct);
  
  const data1 = [];
  for (let i = 0; i < statePackage?.length; i++) {
    data1.push({
      key: i + 1,
      createdAt: moment(statePackage[i]?.createdAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
      ncc: statePackage[i]?.ncc,
      mobile: statePackage[i]?.userId?.mobile,
      name: statePackage[i]?.userId?.name,
      quantity: statePackage[i]?.quantity,
      action: (
      <Link
        to={`/admin/package-history/${statePackage[i]?._id}`}
      >
        Xem chi tiết
      </Link>)
    });
  }

  return (
    <div>
      <h3 className='mb-4 title'>
        QUẢN LÝ NHẬP HÀNG
      </h3>
      <div className="row">
        <div className="col-4">
          <button className='btn btn-primary mt-2 mb-2'>
            <Link to='/admin/package-product' className='text-decoration-none text-white'>
              Nhập hàng
            </Link>
          </button>
        </div>
        <div className="col-8">
          
        </div>
      </div>
      <div className="">
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
}

export default ListPackage;
