import React, { useEffect, useState } from 'react'
import Helmetz from '../components/Helmetz'
import {Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSlide } from '../features/slide/slideSlice'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Autoplay } from 'swiper/modules';
import Product from '../components/Product';
import { getAllProduct } from '../features/products/productSlice';
import { getAllCategory } from '../features/Category/categorySlice'
import Blog from '../components/Blog'
import { Tabs } from 'antd';
import { IoMenu } from "react-icons/io5";
import { getAllBlog } from '../features/blog/blogSlice'
const onChange = (key) => {
  console.log(key);
};
const categories = [
  { name: 'Halloween', category: 'halloween', image: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2024/Icon_Halloween_120x120.png' },
  { name: 'Tiểu thuyết', category: 'Tiểu thuyết', image: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2024/icon_ManngaT06.png' },
  { name: 'Kinh tế', category: 'Kinh tế', image: 'https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/ICON/Icon_KinhTe.png' },
  { name: 'Sách trong nước', category: 'Sách trong nước', image: 'https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_FlashSale_Thuong_120x120.png' },
  { name: 'Ngoại văn', category: 'Ngoại văn', image: 'https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/ICON/Icon_VanHoc_1.png' },
  { name: 'Sản phẩm trợ giá', category: 'Sản phẩm trợ giá', image: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2024/Icon_GiamGia_120x120.png' },
  { name: 'Làm đẹp sức khoẻ', category: 'Làm đẹp sức khoẻ', image: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-09-2024/IconT9_Logo%20NCC_MCBooks_120x120.png' },
  { name: 'Dụng cụ học tập', category: 'Dụng cụ học tập', image: 'https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/ICON/Icon_KinhTe.png' },
  { name: 'Đồ chơi', category: 'Đồ chơi', image: 'https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_MaGiamGia_8px_1.png' },
  { name: 'Hành trang', category: 'Hành trang đến trường', image: 'https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_SanPhamMoi_8px_1.png' },
];
export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllSlide())
    dispatch(getAllProduct())
    dispatch(getAllCategory())
    dispatch(getAllBlog())
  },[])
  const productState = useSelector(state=>state.product?.products)
  const categoryState = useSelector(state=>state.category?.category)
  const blogState = useSelector(state=>state.blog?.blogs)
  const slideState = useSelector(state=>state.slide?.slides)

  const filterProductsByType = (type) => productState&&productState?.filter(product => product.type === type) || [];

  const trendingProducts = filterProductsByType("Xu hướng theo ngày");
  const hotSaleProducts = filterProductsByType("Sách HOT - giảm sốc");
  const bestsellerProducts = filterProductsByType("Bestseller ngoại văn");
  const halloweenProducts = filterProductsByType("Happy Halloween");
  const flashSaleProducts = filterProductsByType("flashSale");
  const lichProducts = filterProductsByType("Lịch");
  const [isVisible, setIsVisible] = useState(false);
  const items = [
    {
      key: '1',
      label: (
        <h4 className='font-bold text-red-600'>Happy Halloween</h4>
      ),
      children: (
        <div className="flex flex-wrap justify-between gap-2 row">
          {
            halloweenProducts && halloweenProducts?.map((e,index)=>(
              <Product key={index} item={e}/>
            ))
          }
        </div>
      ),
    },
  ];
  const items3 = [
    {
      key: '1',
      label: (
        <h4 className='font-bold text-red-600'>Lịch</h4>
      ),
      children: (
        <div className="flex flex-wrap justify-between gap-2 row">
          {
            lichProducts && lichProducts?.map((e,index)=>(
              <Product key={index} item={e}/>
            ))
          }
        </div>
      ),
    },
  ];
  const items2 = [
    {
      key: '1',
      label: (
        <h4 className='font-bold text-[14px] text-red-600'>Xu hướng theo ngày</h4>
      ),
      children: (
        <div className="flex flex-wrap justify-between gap-2 row">
          {
            trendingProducts && trendingProducts?.map((e,index)=>(
              <Product key={index} item={e}/>
            ))
          }
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <h4 className='font-bold text-[14px] text-red-600'>Sách HOT - giảm sốc</h4>
      ),
      children: (
        <div className="flex flex-wrap justify-between gap-2 row">
          {
            hotSaleProducts && hotSaleProducts?.map((e,index)=>(
              <Product key={index} item={e}/>
            ))
          }
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <h4 className='font-bold text-[14px] text-red-600'>Bestseller ngoại văn</h4>
      ),
      children: (
        <div className="flex flex-wrap justify-between gap-2 row">
          {
            bestsellerProducts && bestsellerProducts?.map((e,index)=>(
              <Product key={index} item={e}/>
            ))
          }
        </div>
      ),
    },
  ];
  const handleCategoryClick = (category) => {
    navigate(`/product?category=${category.toLowerCase()}`);
  };
  const toggleListVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className='pt-[155px] bg-[#f8f6f0]'>
      <Helmetz title='Trang chu' description='trang chu cua toi'/>
      <div className="container">
        <div className="row">
        <div className="col-3 bg-white shadow-md rounded-lg p-4 relative">
          <h4 className="font-bold text-xl mb-4 text-gray-800">Danh mục sản phẩm</h4>
            <p
                onClick={toggleListVisibility} 
                className="cursor-pointer text-[18px]"
              >
                Hiển thị tất cả danh mục sản phẩm
              <IoMenu className='float-right text-[24px]'/>
              </p>
            <img className="absolute bottom-10 w-[260px]" src="https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2024/BannerSacombank_T10_392x156_07.jpg" alt="" />
            {isVisible && (
              <ul className="absolute left-72 top-20 mt-2 w-[250px] bg-white shadow-lg border border-gray-300 z-10">
                {categoryState && categoryState.length > 0 ? (
                  categoryState.map((category, index) => (
                    <li
                      key={index}
                      className="hover:text-blue-500 transition-colors cursor-pointer font-medium text-[18px] py-2 px-4"
                    >
                      <Link to={`/product?category=${category.title.toLowerCase()}`}>
                        {category.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>Không có danh mục nào để hiển thị.</li>
                )}
              </ul>
            )}
          </div>
            <div className="col-6">
              <div className="w-100">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={40}
                    loop={true}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Navigation,Autoplay]}
                    className="mySwiper"
                    >
                    {Array.isArray(slideState) && slideState.map((e, index) => (
                    <SwiperSlide key={index}>
                      <img width="100%" className='h-[320px] rounded' src={e?.images[0]?.url} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="col-3">
              <div className="mb-1">
                <img style={{borderRadius:"10px",overflow:"hidden"}} className='h-[152px] mb-3' width="100%" src="https://cdn0.fahasa.com/media/wysiwyg/Thang-09-2024/Resize_TrangDoiTacThang09_SubBanner_392x156.jpg" alt="" />
              </div>
              <div className="">
                <img style={{borderRadius:"10px",overflow:"hidden"}} className='h-[152px]' width="100%" src="https://cdn0.fahasa.com/media/wysiwyg/Thang-09-2024/Khongtienmat_0924_392x156.png" alt="" />
              </div>
            </div>
          </div>
          <div className="row py-2">
            <div className="col-3 flex justify-center "><img className='rounded-md' src="https://cdn0.fahasa.com/media/wysiwyg/Thang-09-2024/TrangChuongTrinhThang9_%20Block06_TuSachTrangRam_SmallBanner_310x210_2.jpg" alt="" /></div>
            <div className="col-3 flex justify-center"><img className='rounded-md' src="https://cdn0.fahasa.com/media/wysiwyg/Thang-09-2024/BannerHomePage_TrangBachHoa_Smallbanner_310x210.jpg" alt="" /></div>
            <div className="col-3 flex justify-center"><img className='rounded-md' src="https://cdn0.fahasa.com/media/wysiwyg/Thang-09-2024/BannerCapypara_0724_Smallbanner_310x210_2.png" alt="" /></div>
            <div className="col-3 flex justify-center"><img className='rounded-md' src="https://cdn0.fahasa.com/media/wysiwyg/Thang-09-2024/FirstNew_Silver_Smallbanner_T9_Silver_310x210_2.jpg" alt="" /></div>
          </div>
      </div>
      <div className="container bg-white my-4 pb-4 rounded-[10px]">
        <section className='container py-3'>
          <div className="flex overflow-x-auto space-x-4 justify-between">
          <Swiper
                    slidesPerView={7}
                    spaceBetween={40}
                    loop={true}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Navigation,Autoplay]}
                    className="mySwiper"
                    >
                    {Array.isArray(categories) && categories.map((category, index) => (
                    <SwiperSlide key={index}>
                     <div
                        key={category.category}
                        className="cursor-pointer text-center"
                        onClick={() => handleCategoryClick(category.category)}
                      >
                        <img
                          className="w-[41px] h-[41px] mb-2 mx-auto"
                          src={category.image}
                          alt={category.name}
                        />
                        {/* Tên danh mục */}
                        <p>{category.name}</p>
                      </div>
                    </SwiperSlide>
                  ))}
            </Swiper>
            {/* {categories.map((category) => (
              <div
                key={category.category}
                className="cursor-pointer text-center"
                onClick={() => handleCategoryClick(category.category)}
              >
                <img
                  className="w-[41px] h-[41px] mb-2 mx-auto"
                  src={category.image}
                  alt={category.name}
                />
                <p>{category.name}</p>
              </div>
            ))} */}
          </div>
        </section>
      </div>
      <div className="bg-backgound">
        <div className="container flex justify-center">
        <div className="w-100 mx-auto">
                <div className="mb-4 flex justify-between bg-white p-4 rounded-[15px]">
                  <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/flashsale/label-flashsale.svg?q=" alt="" />
                  <Link to='/product' className='text-blue-500 font-bold'>Xem tất cả</Link>
                </div>
                <Swiper
                    slidesPerView={5}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Navigation,Autoplay]}
                    className="mySwiper"
                    >
                    {Array.isArray(productState) && productState.map((e, index) => (
                    <SwiperSlide key={index}>
                      <Product item={e}/>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
          
        </div>
      </div>
      <div className="container bg-white my-4 pb-4 rounded-[10px]">
        <section className='container py-3'>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </section>
      </div>
      <div className="container bg-white my-4 pb-4 rounded-[10px]">
        <section className='py-3 rounded-[10px]'>
          <div className="bg-[#FCDDEF] flex gap-4 items-center px-4 rounded-[10px]">
            <img className='w-[32px] h-[32px]' src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/icon_dealhot_new.png" alt="" />
            <h5 className='py-4 font-bold text-[18px]'>SÁCH YÊU THÍCH</h5>
          </div>
          <Tabs defaultActiveKey="1" items={items2} onChange={onChange} />
        </section>
      </div>
      <div className="container bg-white my-4 pb-4 rounded-[10px]">
        <section className='py-3 rounded-[10px]'>
          <div className="flex gap-4 items-center px-2 rounded-[10px]">
            <img className='w-[24px] h-[24px]' src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/241003/Icon_Block_Halloween.png" alt="" />
            <h5 className='py-2 font-bold text-[18px]'>Chương trình sách theo mùa</h5>
          </div>
          <div className="row mt-2">
            <div className="col-8">
              <img src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/Block-Homepage/2024/Hinh1_780x580_Halloween.png" className='rounded-[12px]' alt="" />
            </div>
            <div className="col-4">
              <h5 className='mb-4 font-bold'>Chương trình sách theo mùa</h5>
            {
              Array.isArray(blogState) && blogState.map((e, index) => (
                <Blog key={index} col={12} item={e} />
              ))
            }
            </div>
          </div>
        </section>
      </div>
      <div className="container bg-white my-4 pb-4 rounded-[10px]">
      <section className='container py-3'>
        <Tabs defaultActiveKey="1" items={items3} onChange={onChange} />
      </section>
      </div>
      {/* <div className=" mt-4 pb-4 rounded-[10px] ]">
        <div className=" container flex justify-between py-3 bg-white rounded-[10px]">
          <div className="">
            <img src="https://cdn0.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/5_NCC_McBook_115x115.png" alt="" />
          </div>
          <div className="">
            <img src="https://cdn0.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/NCC_AlphaBooks_115x115.png" alt="" />
          </div>
          <div className="">
            <img src="https://cdn0.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/3_NCC_TanViet_115x115.png" alt="" />
          </div>
          <div className="">
            <img src="https://cdn0.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/9_NCC_MinhLong_115x115.png" alt="" />
          </div>
          <div className="">
            <img src="https://cdn0.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/7_NCC_SGBook_115x115.png" alt="" />
          </div>
          <div className="">
            <img src="https://cdn0.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/8_NCC_ZenBooks_115x115.png" alt="" />
          </div>
          <div className="">
            <img src="https://cdn0.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/6_NCC_HuyHoang_115x115.png" alt="" />
          </div>
          <div className="">
            <img src="https://cdn0.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/NCC_BoardGameViet_115x115.png" alt="" />
          </div>
          <div className="">
            <img src="https://cdn0.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/NCC_DinhTi_115x115.png" alt="" />
          </div>
        </div>
      </div> */}
      <div className="mt-4 pb-4 mb-[50px]">
        <section className='container bg-white rounded-[10px] py-3'>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </section>
      </div>
    </div>
  )
}
