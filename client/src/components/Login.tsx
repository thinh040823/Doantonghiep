import axios from 'axios';
import React, { useState, RefObject, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { base_url } from '../utils/base_url';
import { toast } from 'react-toastify';
import { login } from '../features/users/userSlice';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import Dropzone from "react-dropzone";

// import { login } from '../features/users/userSlice';
export default function Login({handleOpen}) {
  const [check, setCheck] = useState(false);
  const [emailLogin,setEmailLogin] = useState("")
  const [passwordLogin,setPasswordLogin] = useState("")

  const [emailRegister,setEmailRegister] = useState("")
  const [name,setName] = useState("")
  const [passwordRegister,setPasswordRegister] = useState("")
  const [otp,setOtp] = useState("")
  const [checkOtp,setCheckOtp] = useState("")
  const [avt,setAvt]=useState([])
  const dispatch = useDispatch()
  const handleLogin=(e)=>{
    e.preventDefault();
    console.log(emailLogin,passwordLogin)
    const values = {
      email:emailLogin,
      password:passwordLogin
    }
    dispatch(login(values))
    const res = axios.post(`${base_url}auth/login`,values)
    .then((response) => {
      toast.success(response.data.message);
      setEmailLogin("")
      setPasswordLogin("")
    })
    .catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message || 'Đã xảy ra lỗi.');
      } else if (error.request) {
        toast.error('Không thể kết nối đến server.');
      } else {
        toast.error('Đã xảy ra lỗi.');
      }
    console.log(res)      
    
  })}
  const imgState = useSelector((state) => state.upload.images);

  const img = [];
  imgState.forEach((i:any) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  
  useEffect(() => {
    setAvt(img);
  }, [imgState])
  const handleRegister=(e)=>{
    e.preventDefault();
    if(checkOtp !== otp){
      toast.error("OTP không khớp vui lòng nhập lại")
    }else{
      const values = {
        email:emailRegister,
        password:passwordRegister,
        name:name,
        avt:avt
      }
      const res = axios.post(`${base_url}auth/register`,values)
      .then((response) => {
        toast.success(response.data.message);
        setOtp("")
        setEmailRegister("")
        setPasswordRegister("")
        setCheck(false)
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message || 'Đã xảy ra lỗi.');
        } else if (error.request) {
          toast.error('Không thể kết nối đến server.');
        } else {
          toast.error('Đã xảy ra lỗi.');
        }
    })
    }
  }
  const sendEmail=()=>{
    const response = axios.post(`${base_url}auth/sendemail/${emailRegister}`)
    .then((response) => {
      setCheckOtp(response.data.OTP);
      toast.success("Gửi OTP thành công")
    })
    .catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message || 'Đã xảy ra lỗi.');
      } else if (error.request) {
        toast.error('Không thể kết nối đến server.');
      } else {
        toast.error('Đã xảy ra lỗi.');
      }    
  })
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end" style={{zIndex:1000000000}}>
      <div className="w-[450px] bg-white border rounded-[10px] me-[300px]">
        <div className="flex items-center justify-center pt-3">
          <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/03/Logo-DH-Kien-Truc-Da-Nang-DAU.png" className="w-[100px] h-[100px]" alt="" />
        </div>
        <div className="p-[8px] py-[20px] flex justify-between">
          <div onClick={()=>setCheck(false)} className={`w-[50%] text-center cursor-pointer px-[8px] ${check === false ? "text-main font-bold" : ""}`}>
            Đăng nhập
          </div>
          <div onClick={()=>setCheck(true)} className={`w-[50%] text-center cursor-pointer px-[8px] ${check === true ? "text-main font-bold" : ""}`}>
            Đăng ký
          </div>
        </div>
        <hr />  
        {
            !check ? (
                <form className='p-[16px]' onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Nhập địa chỉ Email</label>
                        <input type="email" onChange={(e)=>setEmailLogin(e.target.value)} value={emailLogin} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="">
                        <label htmlFor="exampleInputPassword1" className="form-label">Mật khẩu</label>
                        <input type="password" onChange={(e)=>setPasswordLogin(e.target.value)} value={passwordLogin} className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <p className='text-main text-end mt-2'>Quên mật khẩu</p>
                    <button type="submit" className="mx-auto mt-4 login">Đăng nhập</button>
                    <button onClick={handleOpen} className="mx-auto mt-2 cancel">Bỏ qua</button>
                </form>
            ):(
                <form className='p-[16px]' onSubmit={handleRegister}>
                    <div className="mb-3 relative">
                        <label htmlFor="exampleInputEmail1" className="form-label">Nhập địa chỉ Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                className="form-control pr-[120px]"
                                id="exampleInputEmail1"
                                value={emailRegister}
                                onChange={(e)=>setEmailRegister(e.target.value)}
                                aria-describedby="emailHelp"
                                placeholder="Nhập địa chỉ email"
                            />
                            <span
                                className="absolute text-[12px] font-bold right-0 top-0 py-[10px] mr-3 cursor-pointer text-blue-400"
                                onClick={sendEmail}
                            >
                                Gửi mã OTP
                            </span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Mã xác nhận OTP</label>
                        <input value={otp} onChange={(e)=>setOtp(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="">
                        <label htmlFor="name" className="form-label">Mật khẩu</label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" id="name"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Mật khẩu</label>
                        <input value={passwordRegister} onChange={(e)=>setPasswordRegister(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div className="bg-white border-1 p-2 text-center">
                    <Dropzone
                      onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>
                              Ảnh đại diện
                            </p>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </div>
                  <div className="showimages d-flex flex-wrap gap-3 mt-3">
                    {imgState?.map((i, j) => {
                      return (
                        <div className="position-relative w-100" key={j}>
                          <button
                            type="button"
                            onClick={() => dispatch(delImg(i.public_id))}
                            className="btn-close position-absolute"
                            style={{ top: "10px", right: "10px" }}
                          ></button>
                          <div className="flex justify-center">
                            <img className='rounded-[50%] w-[70px] h-[70px]' src={i.url} alt=""  />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                    <button type="submit" className="mx-auto mt-4 login">Đăng ký</button>
                    <button onClick={handleOpen} className="mx-auto mt-2 cancel">Bỏ qua</button>
                </form>
            )
        }
      </div>
    </div>
  );
}
