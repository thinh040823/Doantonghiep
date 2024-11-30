import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../feature/auth/authSlice'
import brandReducer from '../feature/brand/brandSlice'
import categoryReducer from '../feature/pcategory/pcategorySlice'
import categoryBlogReducer from '../feature/blogCategory/categoryBlogSlice'
import productReducer from '../feature/product/productSlice'
import uploadReducer from '../feature/upload/uploadSlice';
import slideReducer from '../feature/slide/SlideSlice';
import supplierReducer from '../feature/supplier/supplierSlice';
import blogReducer from '../feature/blog/blogSlice';
import packageProductReducer from '../feature/packageProduct/packageProductSlice';
import voucherReducer from '../feature/voucher/voucherSlice';

// tổng hợp các reducer để truyền vào provider
export const store = configureStore({
    reducer:{
        auth : authReducer,
        product:productReducer,
        brand:brandReducer,
        blog:blogReducer,
        category:categoryReducer,
        categoryBlog:categoryBlogReducer,
        upload:uploadReducer,
        slide:slideReducer,
        supplier:supplierReducer,
        package:packageProductReducer,
        voucher:voucherReducer,
    }
})