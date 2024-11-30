import React from 'react';
import { Link } from 'react-router-dom';

export default function Product({ item }) {
  const originalPrice = item?.price;
  const salePrice = item?.priceSale;
  const discountPercentage = ((originalPrice - salePrice) / originalPrice) * 100;

  // Hàm cắt bớt tiêu đề nếu dài quá 60 ký tự
  const truncateTitle = (title) => {
    if (title.length > 35) {
      return title.slice(0, 35) + '...'; // Thêm '...' vào cuối
    }
    return title;
  };

  return (
    <div className='product'>
      <div className="flex justify-center">
        <img src={item?.images[0]?.url} alt="Sách" className='w-[226px] h-[190px]' />
      </div>
      <div className="content p-3">
        <h6 className="mb-2 hover:text-black" style={{ fontSize: "16px" }}>
          <Link to={`/product/${item?._id}`}>
            {truncateTitle(item?.title)} {/* Sử dụng hàm cắt bớt */}
          </Link>
        </h6>
        <div className="d-flex align-items-center gap-10">
          <p className='mb-0' style={{ color: "#C92127", fontWeight: "600" }}>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.priceSale)}
          </p>
          <p className='mb-0 salee'>
            {Math.round(discountPercentage)}%
          </p>
        </div>
        <div className="">
          <p className='sale-price'>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.price)}
          </p>
        </div>
        <div className="bg-buy">Đã bán {item?.countBy}</div>
      </div>
    </div>
  );
}
