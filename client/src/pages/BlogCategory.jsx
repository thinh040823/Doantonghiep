import React, { useEffect, useState } from 'react'
import Breadcrumd from '../components/Breadcrumd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlog } from '../features/blog/blogSlice'
import ProductDescription from '../components/ProductDescription'
import { getAllCategorylog } from '../features/CategoryBlog/categoryBlogSlice'
import moment from 'moment-timezone'

export default function BlogCategory() {
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    dispatch(getAllBlog())
    dispatch(getAllCategorylog())
  }, [dispatch])

  const blogState = useSelector(state => state.blog?.blogs)
  const categoryBlogState = useSelector(state => state.categoryBlog?.categoryBlog)

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  const filteredBlogs = selectedCategory
    ? blogState.filter(blog => blog.categoryBlog === selectedCategory)
    : blogState

  return (
    <div>
      <Breadcrumd title="Tin tức" />
      <div className="container pb-5 pt-[155px]">
        <div className="row">
          <div className="col-8">
            <div className="pb-4">
              <h5>TIN TỨC</h5>
            </div>
            <div className="">
              {Array.isArray(filteredBlogs) && filteredBlogs.map((e, index) => (
                <div className="blog-list d-flex mb-3" key={index}>
                  <div className="">
                    <Link to={`/blog/${e?._id}`}>
                      <img src={e?.images[0]?.url}
                        width="247px"
                        height="185px"
                        alt="blog" />
                    </Link>
                  </div>
                  <div className="content-blog" style={{ padding: " 0 0 0 20px " }}>
                    <Link to={`/blog/${e?._id}`}>
                      <h6>{e?.title}</h6>
                    </Link>
                    <p className='mt-2 mb-0' style={{fontSize:"12px"}}>
                      {moment(e?.createdAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss")}
                    </p>
                    <p>
                      <ProductDescription description={e?.description && e?.description?.length > 40 ? e?.description?.substring(0, 40) + '...' : e?.description} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-4">
            <h4 className='font-bold text-[20px]'>DANH MỤC SẢN PHẨM</h4>
            <ul className='m-0 p-0'>
              {Array.isArray(categoryBlogState) && categoryBlogState.map((e, index) => (
                <li
                  className={`mb-2 list-blogcategory ${selectedCategory === e.title ? 'active' : ''}`}
                  key={index}
                  onClick={() => handleCategorySelect(e.title)}
                >
                  {e?.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
