import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import {useNavigate} from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch,useSelector} from 'react-redux'
import { login } from '../feature/auth/authSlice';



const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let userSchema = Yup.object().shape({
        email: Yup.string().email('Email should be valid').required('Email is Required'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        password: Yup.string().required('Passsword is Required')
    });

    const formik = useFormik({
    initialValues: {
        email: "",
        password:""
    },
    validationSchema:userSchema,
    onSubmit: values => {
            dispatch(login(values))
            navigate('/admin')
        },
    });

    const {user,isLoading,isError,isSuccess,message} = useSelector(state=>state.auth)// auth duoc tao ra o ben authSlice 
    useEffect(()=>{
        // login thanh cong thi chuyen trang
        if(!user == null || isSuccess){
            navigate('/admin')
        }
    },[user,isLoading,isError,isSuccess,message])
    useEffect(()=>{
        if(user !==null){
            navigate('/admin')
        }
    },[])
    return (
        <>
        <div className="bg-dark">
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div style={{minHeight:"100vh"}} className='py-5'>
                            <br /><br /><br /><br /><br />
                            <div className="my-5 w-100 bg-white rounded-3 mx-auto p-4">
                                <h3 className='text-center title'>ĐĂNG NHẬP ADMIN</h3>
                                <p className='text-center'>Login to your account to continue</p>
                                <div className="error text-center">
                                    {message =="Rejected" ? "Bạn không phải Admin" : ""}
                                </div>
                                <form action="" onSubmit={formik.handleSubmit}>
                                    <CustomInput 
                                        name="email"
                                        type="text" 
                                        label='Email address...' 
                                        i_id ="email" 
                                        val={formik.values.email}
                                        onchange={formik.handleChange("email")}
                                        onBlur={formik.handleBlur("email")}
                                        />
                                    <div className="error">
                                        {formik.touched.email && formik.errors.email ? (
                                            <div>{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                    <CustomInput
                                        name="password"
                                        type="password" 
                                        label='Password...' 
                                        i_id ="pass" 
                                        val={formik.values.password}
                                        onchange={formik.handleChange("password")}
                                        onBlur={formik.handleBlur("password")}
                                        />
                                    <div className="error">
                                        {formik.touched.password && formik.errors.password ? (
                                        <div>{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                    <button
                                        className='mt-4 border-0 px-3 py-2 text-center text-decoration-none fs-5 text-white fw-bold w-100' 
                                        type='submit' 
                                        style={{background:"#C92127"}}
                                    >
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div style={{minHeight:"100vh"}} className='py-5'>
                            <br /><br /><br /><br /><br />
                            <div className="my-5 w-100 rounded-3 mx-auto p-4">
                                <img width="400px" src="https://logodix.com/logo/866810.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;
