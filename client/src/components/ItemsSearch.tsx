import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Product from './Product'

export default function ItemsSearch() {
  const ItemsProductSearch = useSelector(state=>state?.product?.search)
  useEffect(()=>{
    window.scroll(0,0)
  })
  return (
    <div className='container pb-5 pt-[155px]'>
        <div className="py-4">
            <h3 className='text-center'>Sản phẩm tìm được</h3>
        </div>
        <div className="d-flex flex-wrap align-items-center justify-content-start py-5 gap-20">
          {
            ItemsProductSearch?.length > 0 ? (
              ItemsProductSearch?.map((e,index)=>(
                <Product key={index} item={e}/>
              ))
            ) :(
              <div className="py-5 w-100">
                <p className='text-center'>Không tìm thấy sản phẩm liên quan</p>
              </div>
            )
          }
        </div>
    </div>
  )
}
