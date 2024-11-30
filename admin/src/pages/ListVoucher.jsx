import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPackage } from '../feature/packageProduct/packageProductSlice';
import { getAllVoucher } from '../feature/voucher/voucherSlice';
import moment from 'moment';

const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'startDay',
  },
  {
    title: 'Ngày kết thúc',
    dataIndex: 'endDay',
  },
  {
    title: 'Số lượng người sử dụng',
    dataIndex: 'view',
  },
  {
    title: 'số lượng',
    dataIndex: 'quantity',
  },
  {
    title: 'Giảm',
    dataIndex: 'percent',
  },
];

const ListVoucher = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVoucher());
  }, [dispatch]);

  const statePackage = useSelector(state => state.voucher.voucher?.newPackageProduct);
  
  const data1 = [];
  for (let i = 0; i < statePackage?.length; i++) {
    data1.push({
      key: i + 1,
      startDay: moment(statePackage[i]?.startDay).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
      endDay: moment(statePackage[i]?.endDay).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
      view: statePackage[i]?.view,
      quantity: statePackage[i]?.quantity,
      percent: statePackage[i]?.percent,
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
            <Link to='/admin/add-voucher' className='text-decoration-none text-white'>
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

export default ListVoucher;
