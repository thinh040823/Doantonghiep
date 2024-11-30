import React from 'react';
import Helmetz from '../components/Helmetz';

export default function CheckoutSuccess() {
    return (
        <>
            <Helmetz title='Thanh toán thành công'/>
            <div className="container mb-4 pt-[155px]">
                <div className="text-center" style={{ paddingTop: "180px", paddingBottom: "20px" }}>
                    <h1>Đặt hàng thành công</h1>
                    <div className="mt-4 mb-4 d-flex align-items-center justify-content-center">
                        <img src="https://www.nhahangquangon.com/wp-content/uploads/2020/10/icon-thanh-cong-200x200.png" alt="checkout success" />
                    </div>
                </div>
            </div>
        </>
    );
}
