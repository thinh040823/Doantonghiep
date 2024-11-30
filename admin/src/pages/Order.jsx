import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder, updateOrder } from '../feature/auth/authSlice';
import { Table } from 'antd';
import { toast } from 'react-toastify';
import moment from 'moment';

const columns = (handleOnchangeOrder) => [
  {
    title: 'STT',
    dataIndex: 'key',
  },
  {
    title: 'Thông tin người mua',
    dataIndex: 'user',
  },
  {
    title: 'Sản phẩm',
    dataIndex: 'products',
  },
  {
    title: 'Thời gian',
    dataIndex: 'times',
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'totalprice',
  },
  {
    title: 'Phương thức thanh toán',
    dataIndex: 'statusPayment',
  },
  {
    title: 'Trạng thái đơn hàng',
    dataIndex: 'status',
    filters: [
      { text: 'Đang xác nhận', value: 'Đang xác nhận' },
      { text: 'Đang duyệt đơn', value: 'Đang duyệt đơn' },
      { text: 'Đơn đang được giao', value: 'Đơn đang được giao' },
      { text: 'Giao hàng thành công', value: 'Giao hàng thành công' },
    ],
    onFilter: (value, record) => record.status.includes(value),
  },
  {
    title: "Action",
    dataIndex: 'action',
  }
];

export default function Order() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  const orderState = useSelector(state => state?.auth?.orders);
  const handleOnchangeOrder = (id, e) => {
    const data = { _id: id, status: e.target.value };
    dispatch(updateOrder(data));
    setTimeout(()=>{
      toast.success("Cập nhật đơn hàng thành công");
      dispatch(getAllOrder());
    },300)
  };

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      user: (
        <div>
          <p>Tên : {orderState[i]?.shippingInfo?.name}</p>
          <p>Email : {orderState[i]?.shippingInfo?.email}</p>
          <p>Số điện thoại : {orderState[i]?.user?.mobile}</p>
          <p>Địa chỉ : {orderState[i]?.shippingInfo?.address}</p>
        </div>
      ),
      products: (
        orderState[i]?.orderItems && orderState[i]?.orderItems.map((e, index) => (
          <div key={index} className='mb-4'>
            <p>Tên sản phẩm : {e?.productId?.title}</p>
            <p>Số lượng đặt hàng : {e?.quantity}</p>
            <p>Giá : {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e?.productId?.priceSale || e?.productId?.price)}
            </p>
          </div>
        ))
      ),
      times: moment(orderState[i]?.createdAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
      statusPayment: (
        <>
          <p className='mb-0'>{orderState[i]?.paymentMethod}</p>
        </>
      ),
      status: orderState[i]?.status,
      totalprice: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderState[i]?.totalPrice),
      action: (
        <>
          <select
            name=""
            defaultValue={orderState[i]?.status}
            className='form-control form-select'
            onChange={(e) => handleOnchangeOrder(orderState[i]?._id, e)}
          >
            <option value="Đang xác nhận">Đang xác nhận</option>
            <option value="Đang duyệt đơn">Đang duyệt đơn</option>
            <option value="Đơn đang được giao">Đơn đang được giao</option>
            <option value="Giao hàng thành công">Giao hàng thành công</option>
          </select>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className='mb-4 title'>
        DANH SÁCH ĐƠN ĐẶT HÀNG
      </h3>
      <div className="">
        <Table columns={columns(handleOnchangeOrder)} dataSource={data1} />
      </div>
    </div>
  );
}
