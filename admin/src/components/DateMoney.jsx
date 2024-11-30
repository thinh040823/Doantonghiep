import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder } from '../feature/auth/authSlice';

export default function DateMoney() {
    const dispatch = useDispatch();

    // Get current month in YYYY-MM format
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const defaultMonth = `${currentYear}-${currentMonth}`;

    const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);

    useEffect(() => {
        dispatch(getAllOrder());
    }, [dispatch]);

    const orderState = useSelector(state => state?.auth?.orders);

    useEffect(() => {
        if (orderState && selectedMonth) {
            calculateRevenue(selectedMonth);
        }
    }, [orderState, selectedMonth]);

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setSelectedMonth(selectedDate);
    };

    const calculateRevenue = (selectedDate) => {
        const [year, month] = selectedDate.split('-').map(Number);

        const filteredOrders = orderState.filter(order => {
            const orderDate = new Date(order.createdAt);
            return (
                orderDate.getFullYear() === year &&
                orderDate.getMonth() + 1 === month
            );
        });

        const totalRevenue = filteredOrders.reduce((total, order) => {
            const amount = parseFloat(order.totalPrice);
            return total + (isNaN(amount) ? 0 : amount);
        }, 0);
        setMonthlyRevenue(totalRevenue);
    };

    return (
        <div className='d-flex align-items-center justify-content-between w-100'>
            <div className="header">
                 <p className='desc'>Doanh thu</p>
                <h6 className='my-2'>Tổng doanh thu theo tháng là: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(monthlyRevenue)}</h6>
            </div>
            <input type="month" value={selectedMonth} onChange={handleDateChange} />
        </div>
    );
}
