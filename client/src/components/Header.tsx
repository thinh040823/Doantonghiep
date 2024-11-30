import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoCartOutline, IoSearch } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { searchInput } from '../features/products/productSlice';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleOpen = ()=>{
    setIsMenuOpen(false)
  }
  const [values, setValues] =
    useState();
  const toggleMenu = () => setIsMenuOpen(true);
  const userState = useSelector(
    (state) => state.auth.user
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      searchInput(values.keyword)
    );
    navigate("/search");
  };
  const cartUser = useSelector(state=>state.auth.cartUser)
  console.log("object ", cartUser)
  return (
    <>
      <div className="relative">
        <div className="fixed bg-white w-100" style={{zIndex:9999999999}}>
          <header className='h-[60px] bg-main'>
            <img className='mx-auto h-[60px]' src="https://cdn0.fahasa.com/media/wysiwyg/Thang-09-2024/NCC_Tanviet_0924_header_1263X60_18_1.jpg" alt="" />
          </header>
          <header className="container mx-auto bg-white py-1">
            <div className="grid py-[12px] grid-cols-3 gap-4 items-center">
              <div>
                <Link to="/">
                <div className="">
                  <h4 className='ml-[15px] text-main text-[18px] font-bold'>PANAMA</h4>
                  <img
                    className="h-[39px] w-[100px]"
                    src="https://tse2.mm.bing.net/th?id=OIP.b_Sh8HxGR9f2d354E6tIFAHaFu&pid=Api&P=0&h=220"
                    alt="Fahasa Logo"
                  />
                </div>
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-[585px]">
                  <form action="" onSubmit={
                        handleSubmit
                      }>
                    <input
                      className="w-[585px] px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
                      type="text"
                      onChange={(e) =>
                        setValues({
                          ...values,
                          keyword:
                            e.target
                              .value,
                        })
                      }
                      placeholder="Có gì mới hôm nay ..."
                    />
                    <button
                      type="submit"
                      className="absolute right-0 top-0 h-full px-4 bg-main text-white rounded-r-lg flex items-center justify-center"
                      style={{ borderRadius: "0 8px 8px 0" }}
                    >
                      <IoSearch className="h-5 w-5 fill-white" />
                    </button>
                  </form>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="text-center me-3 relative">
                  <Link to='/cart' className='hover:text-main'>
                    <IoCartOutline className='mx-auto h-[24px] w-[24px]' />
                    <p className='text-[12px]'>Giỏ hàng</p>
                    <span className='absolute top-[-10px] right-[-2px] text-[12px] text-red-500  px-[6px]' style={{border:"1px solid" ,borderRadius:"50%"}}>{cartUser ? cartUser?.length : 0}</span>
                  </Link>
                </div>
                {userState !== null ? (
                    <div
                      className="dropdown"
                      >
                      <button
                        className="dropdown-toggle bg-white d-flex align-items-center"
                        type="button"
                        style={{
                          border: "none",
                        }}
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <div className="text-center hover:text-main">
                          <img src={userState?.avt[0]?.url} alt="avata" className='w-[24px] h-[24px] rounded-[50%]'/>
                        <p className='text-[12px]'>{userState?.name}</p>
                      </div>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            className="dropdown-item cursor-pointer"
                            to="/account">
                            Tài khoản
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item cursor-pointer"
                            to="/account">
                            FaceBook
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item cursor-pointer"
                            to="/account">
                            Zalo
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item cursor-pointer"
                            to="/my-order">
                            Đơn hàng của tôi
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item cursor-pointer"
                            to="/update-account">
                            Cập nhật tài
                            khoản
                          </Link>
                        </li>
                        <li>
                          <a
                            className="dropdown-item cursor-pointer"
                            onClick={() => {
                              sessionStorage.clear();
                              localStorage.clear();
                              toast.success("Đăng xuất thành công")
                              window.location.reload();
                              navigate("/");
                            }}>
                            Đăng xuất
                          </a>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <>
                      <div className="text-center hover:text-main" onClick={toggleMenu}>
                        <FaRegUser className='mx-auto h-[24px] w-[24px]' />
                        <p className='text-[12px]'>Tài khoản</p>
                      </div>
                    </>
                  )}
                
              </div>
            </div>
          </header>
          {isMenuOpen && (
            <Login handleOpen={handleOpen} />
          )}
        </div>
      </div>
    </>
  );
}
