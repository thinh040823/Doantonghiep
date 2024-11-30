import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Link, useNavigate} from 'react-router-dom'
import Breadcrumd from '../components/Breadcrumd';
import {updateUser } from '../features/users/userSlice';
import Helmetz from '../components/Helmetz';

const UpdateAccount = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
	const userState = useSelector(state=>state.auth.user)

    let userSchema = Yup.object().shape({
        name: Yup.string().required('Tên không được để trống'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        email: Yup.string().email('Email sai').required('Email không được để trống'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        address: Yup.string().required('Địa chỉ không được để trống'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        mobile: Yup.string().required('Số điện thoại không được để trống'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        password: Yup.string().required('Mật khẩu không được để trống')
    });


    const formik = useFormik({
      enableReinitialize:true,
        initialValues: {
            name:userState?.name||"",
            email: userState?.email||"",
            mobile:userState?.mobile||"",
            address:userState?.address||"",
            password:userState?.password||""
        },
        validationSchema:userSchema,
        onSubmit: values => {
            const data = {_id : userState?._id,values : values}
            dispatch(updateUser(data))
            navigate("/account")
        },
    });
    
    return (
        <>
            <Breadcrumd title="Đăng ký"/>
            <Helmetz title='Cập nhật tài khoản'/>
            <section className="container pb-5 pt-[155px]">
                    <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <h3 className="py-4 title_pr">Cập nhật </h3>
                                <form onSubmit={formik.handleSubmit} action="" className='d-flex w-50 flex-column gap-15'>
                                   <div className="">
                                        <label htmlFor="exampleInputPassword1" className="form-label">
                                            Nhập tên
                                        </label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange('name')}
                                            onBlur={formik.handleBlur('name')}
                                            placeholder="Nhập tên"
                                            className="form-control" />
                                    </div>
                                     <div className="error">
                                        {formik.touched.name && formik.errors.name ? (
                                            <div>{formik.errors.name}</div>
                                        ) : null}
                                    </div>
                                    
                                    <div className="">
                                        <label htmlFor="exampleInputPassword1" className="form-label">
                                            Nhập Email
                                        </label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange('email')}
                                            onBlur={formik.handleBlur('email')}
                                            placeholder="Nhập địa chỉ email"
                                            className="form-control" />
                                    </div>
                                     <div className="error">
                                        {formik.touched.email && formik.errors.email ? (
                                            <div>{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className="">
                                        <label htmlFor="exampleInputPassword1" className="form-label">
                                            Nhập số điện thoại
                                        </label>
                                        <input 
                                            type="text" 
                                            name="mobile"
                                            value={formik.values.mobile}
                                            onChange={formik.handleChange('mobile')}
                                            onBlur={formik.handleBlur('mobile')}
                                            placeholder="Nhập số điện thoại"
                                            className="form-control" />
                                    </div>
                                     <div className="error">
                                        {formik.touched.mobile && formik.errors.mobile ? (
                                            <div>{formik.errors.mobile}</div>
                                        ) : null}
                                    </div>
                                    <div className="">
                                        <label htmlFor="exampleInputPassword1" className="form-label">
                                            Nhập địa chỉ
                                        </label>
                                        <input 
                                            type="text" 
                                            name="address"
                                            value={formik.values.address}
                                            onChange={formik.handleChange('address')}
                                            onBlur={formik.handleBlur('address')}
                                            placeholder="Nhập địa chỉ"
                                            className="form-control" />
                                    </div>
                                     <div className="error">
                                        {formik.touched.address && formik.errors.address ? (
                                            <div>{formik.errors.address}</div>
                                        ) : null}
                                    </div>
                                    <div className="">
                                        <label htmlFor="exampleInputPassword1" className="form-label">
                                            Nhập mật khẩu
                                        </label>
                                        <input 
                                            type="password" 
                                            name="name"
                                            value={formik.values.password}
                                            onChange={formik.handleChange('password')}
                                            onBlur={formik.handleBlur('password')}
                                            placeholder="Nhập mật khẩu"
                                            className="form-control" />
                                    </div>
                                     <div className="error">
                                        {formik.touched.password && formik.errors.password ? (
                                            <div>{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                    <div className="">
                                        <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                            <button className='button-res w-100' type='submit'>Cập nhật</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            </section>
        </>
    );
}

export default UpdateAccount;
