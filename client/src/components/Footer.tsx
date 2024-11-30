import React from 'react'
import { FaFacebook ,FaInstagramSquare,FaYoutube,FaTwitter   } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
export default function Footer() {
  return (
    <>
        <hr />
     <div className="container" style={{marginTop:"100px"}} >
        <div className="row">
          <div className="col-4">
              <div className="img">
                <img src="https://tse2.mm.bing.net/th?id=OIP.b_Sh8HxGR9f2d354E6tIFAHaFu&pid=Api&P=0&h=220" alt="" />
                {/* <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/logo.png" alt="" /> */}
              </div>
              <div className="py-4">
                <p className='mb-1' style={{fontSize:"13px"}}>Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM
                  <br />
                  Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA60 <br />
                  - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam</p>

                <p className='mb-1' style={{fontSize:"13px"}}>Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. <br /> 
                KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng <br /> 
                cũng như tất cả Hệ Thống Fahasa trên toàn quốc.</p>
                <img height="30px" width="100px" src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/logo-bo-cong-thuong-da-thong-bao1.png" alt="" />
              </div>
              <div className="d-flex align-items-center justify-content-start gap-10">
                <FaFacebook className='fs-3'/>
                <FaInstagramSquare  className='fs-3'/>
                <FaYoutube className='fs-3' />
                <FaTwitter  className='fs-3'/>
              </div>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-4">
                <div className="mb-3">
                  <h6>DỊCH VỤ</h6>
                </div>
                <ul>
                  <li>Điều khoản sử dụng</li>
                  <li>Chính sách bảo mật thông tin cá nhân</li>
                  <li>Chính sách bảo mật thanh toán</li>
                  <li>Giới thiệu Fahasa</li>
                  <li>Hệ thống trung tâm - nhà sách</li>
                </ul>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <h6>HỖ TRỢ</h6>
                </div>
                <ul>
                  <li>Chính sách đổi - trả - hoàn tiền</li>
                  <li>Chính sách bảo hành - bồi hoàn</li>
                  <li>Chính sách vận chuyển</li>
                  <li>Chính sách khách sỉ</li>
                  <li>Phương thức thanh toán và xuất HĐ</li>
                </ul>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <h6>TÀI KHOẢN CỦA TÔI</h6>
                </div>
                <ul>
                  <li>Đăng nhập/Tạo mới tài khoản</li>
                  <li>Thay đổi địa chỉ khách hàng</li>
                  <li>Chi tiết tài khoản</li>
                  <li>Lịch sử mua hàng</li>
                </ul>
              </div>
            </div>
            <div className="py-4">
              <h6 className='py-3'>LIÊN HỆ</h6>
              <div className="row">
                <div className="col-4">
                  <div className="d-flex align-items-center gap-10">
                    <CiLocationOn/>
                    <p className='mb-0' style={{fontSize:"13px"}}>Nguyen Quoc Thinh</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-flex align-items-center gap-10">
                    <MdOutlineEmail/>
                    <p className='mb-0' style={{fontSize:"13px"}}> thinh@gmail.com</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-flex align-items-center gap-10">
                    <FaPhone/>
                    <p className='mb-0' style={{fontSize:"13px"}}> 1900636467</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row py-3">
              <div className="col-3">
                <img src="https://tse3.mm.bing.net/th?id=OIP.sQDDPhRnC1XJeLjx7xzcJgAAAA&pid=Api&P=0&h=220" width="100px" alt="" />
              </div>
            </div>
            <div className="row py-3">
              {/* <div className="col-3">
                <img src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/vnpay_logo.png" width="100px" alt="" />
              </div>
              <div className="col-3">
                <img src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/ZaloPay-logo-130x83.png" width="100px" alt="" />
              </div>
              <div className="col-3">
                <img src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/momopay.png" width="50px" alt="" />
              </div>
              <div className="col-3">
                <img src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/shopeepay_logo.png" width="100px" alt="" />
              </div> */}
            </div>
          </div>
        </div>
        <div className="py-3">
          <p className='mb-0 text-center' style={{fontSize:"12px",color:"#c2c2c2"}}>Giấy chứng nhận Đăng ký Kinh doanh số 0304132047 do 
            Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 
            20/12/2005, đăng ký thay đổi lần thứ 10, ngày 20/05/2022.</p>
        </div>
      </div>
    </>
  )
}
