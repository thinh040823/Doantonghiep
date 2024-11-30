import React, { useEffect, useState } from 'react';
import Breadcrumd from './Breadcrumd';
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePrCart, getCart, updateQuantity } from '../features/users/userSlice';
import { toast } from 'react-toastify';

export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector(state => state.auth?.user);    
    useEffect(() => {
        if (userState) {
            dispatch(getCart());
        }
        window.scroll(0,0)
    }, [dispatch, userState]);
    
    const cartState = useSelector(state => state.auth?.cartUser);
    const [productUpdateDetail, setProductUpdateDetail] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        if (productUpdateDetail !== null) {
            let cartDetail = { cartItemId: productUpdateDetail?.cartItemId, newQuantity: productUpdateDetail?.quantity };
            dispatch(updateQuantity(cartDetail));
            setTimeout(() => {
                dispatch(getCart());
            }, 300);
        }
    }, [dispatch, productUpdateDetail]);

    const deleteCart = (cartItemId) => {
        dispatch(deletePrCart(cartItemId));
        setTimeout(() => {
            dispatch(getCart());
        }, 100);
        toast.success("Sản phẩm đã được xóa khỏi giỏ hàng");
    };

    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < cartState?.length; i++) {
            sum += (Number(cartState[i]?.quantity) * (cartState[i]?.productId?.priceSale || cartState[i]?.productId?.price));
        }
        setTotalAmount(sum);
    }, [cartState]);

    return (
        <div>
            <Breadcrumd title="Giỏ hàng" />
            {
                cartState?.length > 0 ? (
                    <div className="container pb-5 pt-[155px]">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h3 className='mb-4 title-cart'>GIỎ HÀNG</h3>
                            </div>
                            <div className="col-12">
                                <div className="cart-header py-3 d-flex justify-content-between align-items-center border-bottom">
                                    <h5 className='cart-col-1'>Sản phẩm</h5>
                                    <h5 className='cart-col-2'>Giá tiền</h5>
                                    <h5 className='cart-col-3'>Số lượng</h5>
                                    <h5 className='cart-col-4'>Tổng tiền</h5>
                                </div>
                                {
                                    cartState?.length > 0 && cartState?.map((e, index) => (
                                        <div key={index} className="cart-data py-3 d-flex justify-content-between align-items-center border-bottom">
                                            <div className="cart-col-1 d-flex align-items-center gap-3">
                                                <div className="cart-image w-25">
                                                    <img src={e?.productId?.images[0]?.url} width={80} className='img-fluid' alt="product img" />
                                                </div>
                                                <div className="cart-details w-75">
                                                    <h6 className="mb-1">{e?.productId?.title}</h6>
                                                    <p className="mb-0 text-muted">Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e?.productId?.priceSale || e?.productId?.price)}</p>
                                                </div>
                                            </div>
                                            <div className="cart-col-2">
                                                <h6 className="price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e?.productId?.priceSale || e?.productId?.price)}</h6>
                                            </div>
                                            <div className="cart-col-3 d-flex align-items-center gap-3">
                                                <input 
                                                    type="number" 
                                                    className="form-control w-50" 
                                                    min={1} 
                                                    value={e?.quantity} 
                                                    onChange={(c) => setProductUpdateDetail({ cartItemId: e?._id, quantity: c.target.value })} 
                                                />
                                                <MdDelete 
                                                    className='text-danger fs-5'
                                                    style={{cursor:"pointer"}} 
                                                    onClick={() => deleteCart(e?._id)} 
                                                />
                                            </div>
                                            <div className="cart-col-4">
                                                <h6 className="total">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((e?.productId?.priceSale || e?.productId?.price) * e?.quantity)}</h6>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="row pb-5 pt-[155px]">
                            <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center border-top pt-3">
                                    <h5>Tổng tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</h5>
                                    <div className="d-flex gap-3">
                                        <Link className='text-primary' to='/'>Tiếp tục mua hàng</Link>
                                        <button className='button-res' onClick={() => navigate('/checkout')}>Đặt hàng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ):(
                    <div className="container pb-5 pt-[155px]">
                        <div className="text-center flex justify-center">
                            <div className="">
                                <img src="https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/checkout_cart/ico_emptycart.svg" alt="" />
                                <h4 className='py-4'>GIỎ HÀNG TRỐNG</h4>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
