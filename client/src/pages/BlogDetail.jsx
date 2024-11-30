import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getBlog } from '../features/blog/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductDescription from '../components/ProductDescription';
import moment from 'moment-timezone';

export default function BlogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlog(id));
    window.scroll(0, 0);
  }, [dispatch, id]);
  const ablog = useSelector(state => state.blog?.aBlog?.findBlog);
  return (
    <div className='pt-[155px] pb-5 container'>
      <div className="row d-flex">
        <div className="col-6">
          <h2 className='font-bold'>TIN TỨC</h2>
          <div className="py-5">
            <h1>{ablog?.title}</h1>
            <div className="d-flex align-items-center">
              <strong className='me-2'>Người đăng bài:</strong>
              <p className='mb-0'>{ablog?.orderBy?.name}</p>
            </div>
            <p className='mt-2'>
              {moment(ablog?.createdAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>
          <div className="content-blog">
            <img 
              className=""
              width="200px"
              src={ablog?.images[0]?.url} 
              alt={ablog?.title} 
            />
            <p className='mt-4'>
              <ProductDescription description={ablog?.description} />
            </p>
          </div>
        </div>
        <div className="col-6">
          <h1 className="text-[30px] font-bold mb-10">Chào mừng bạn đã đến với PANAMA</h1>
          <img className="rounded-[20px]" src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/Block-Homepage/2024/Hinh1_780x580_Halloween.png" alt="" />
        </div>
      </div>
    </div>
  );
}
