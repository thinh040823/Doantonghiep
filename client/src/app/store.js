import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/users/userSlice';
import productReducer from '../features/products/productSlice';
import slideReducer from '../features/slide/slideSlice';
import blogReducer from '../features/blog/blogSlice';
import categoryBlogReducer from '../features/CategoryBlog/categoryBlogSlice';
import packageproductReducer from '../features/packageProduct/packageProductSlice';
import categoryReducer from '../features/Category/categorySlice';
import contactReducer from '../features/contact/contactSlice';
import uploadReducer from '../features/upload/uploadSlice';

export const store = configureStore({
  reducer: {
    auth : authReducer,
    product : productReducer,
    slide:slideReducer,
    blog:blogReducer,
    categoryBlog:categoryBlogReducer,
    package:packageproductReducer,
    category:categoryReducer,
    contact:contactReducer,
    upload:uploadReducer,

  },
});
