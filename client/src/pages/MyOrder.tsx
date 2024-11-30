import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMyorder } from '../features/users/userSlice';
import moment from 'moment';
import { Table } from 'antd';
import Breadcrumd from '../components/Breadcrumd';
import Helmetz from '../components/Helmetz';

export default function MyOrder() {
    const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
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
        title: 'Thời gian giao thành công',
        dataIndex: 'deliveredAt',
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'totalprice',
    },
    {
        title:"Phương thức đặt hàng",
        dataIndex: 'paymentMethod',
    },
    {
        title:"Trạng thái",
        dataIndex: 'status',
    }
    ];
	const dispath = useDispatch()

    useEffect(()=>{
      dispath(getMyorder())
    },[])
    const orderState = useSelector(state=>state?.auth?.myOrder?.orders)
    console.log(orderState)
    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
        data1.push({
            key: i+1,
            products: (
                orderState[i]?.orderItems && orderState[i]?.orderItems?.map((e,index)=>(
                    <div key={index} className='mb-4'>
                        <p>Tên sản phẩm : {e?.productId?.title}</p>
                        <p>Số lượng đặt hàng : {e?.quantity}</p>
                        <p>Giá : {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e?.productId?.priceSale)}                                                                                                                                                        
                        </p>
                    </div>
                    ))
            ),     
            times: moment(orderState[i]?.createdAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
            deliveredAt: moment(orderState[i]?.deliveredAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
            totalprice: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderState[i]?.totalPrice),
            paymentMethod: ( 
                <>
                    <p className='mb-0'>{orderState[i]?.paymentMethod}</p>
                </>
            ),
            status:  (
                <>
                    <p className='mb-0'>{orderState[i]?.status}</p>
                </>
            ),
            });
    }
    const reversedData = [...data1].reverse().map((item, index) => ({
        ...item,
        key: index + 1,  // Cập nhật lại số thứ tự sau khi đảo
    }));
    return (
        <>
            <Breadcrumd title="Đơn hàng của bạn"/>
            <Helmetz title='Đơn đặt hàng của bạn'/>
            <div className='container pb-4 pt-[155px]'>
                <h3 className='mb-4 title'>
                    ĐƠN HÀNG CỦA TÔI
                </h3>
                <div className="">
                    <Table className='d-flex flex-column gap-3' columns={columns} dataSource={reversedData} />
                </div>
            </div>
        </>
    )
}
