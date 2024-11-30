import React from 'react';
import moment from 'moment-timezone';
import ProductDescription from './ProductDescription';
import { Link } from 'react-router-dom';

export default function Blog({ item, col, size }) {
  // Kiểm tra dữ liệu của item
  console.log('Blog item:', item);

  const truncatedDescription = item?.description && item?.description.length > 40
    ? item.description.slice(0, 40) + '...'
    : item?.description;

  // Kiểm tra giá trị của truncatedDescription
  console.log('Truncated Description:', truncatedDescription);

  return (
    <div className={`col-${col} mb-4 rounded-[12px] overflow-hidden p-2`} style={{border:"1px solid #ccc"}}>
      <div className="row">
        <div className="col-6">
            <Link to={`/blog/${item?._id}`}>
                <img className='w-100 h-[100px]' src={item?.images[0]?.url} alt="" />
            </Link>
        </div>
        <div className="col-6">
            <h6>
                <Link to={`/blog/${item?._id}`} className='font-bold'>
                    {item?.title}
                </Link>
            </h6>
          <p style={{ fontSize: "12px" }}>
            {moment(item?.createdAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss")}
          </p>
          <div className="mt-4">
            <ProductDescription description={truncatedDescription} />
          </div>
        </div>
      </div>
    </div>
  );
}
