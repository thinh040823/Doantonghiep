import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPackage } from '../feature/packageProduct/packageProductSlice';
import { Table } from 'antd';

export default function CheckPack() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPackage(id));
  }, [dispatch, id]);

  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      sorter: (a, b) => a.productName?.length - b.productName?.length,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
    },
    {
      title: 'Thời gian',
      dataIndex: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
  ];

  const statePackage = useSelector((state) => state.package.APackage?.packageProduct?.history);

  const data1 = statePackage?.map((item, index) => ({
    key: index + 1,
    productName: item.productName,
    quantity: item.quantity,
    unitPrice: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unitPrice),
    date: moment(item.date).format('YYYY-MM-DD HH:mm:ss'),
  })) || [];

  return (
    <div>
      <div className="">
        <h5>LỊCH SỬ</h5>
      </div>
      <div className="">
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
}
