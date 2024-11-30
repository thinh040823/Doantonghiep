import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createCategory, getIdCategory, resetState, updateCategory } 
from '../feature/pcategory/pcategorySlice';
import { createCategoryBlog, getIdCategoryBlog, updateCategoryBlog } from '../feature/blogCategory/categoryBlogSlice';

let schema = yup.object().shape({
  title: yup.string().required("Title is Required")
});

const AddCategoryBlog = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()

    const newCat = useSelector((state) => state.categoryBlog);
    const { isSuccess, isError, create,categoryBlogName,updateName } = newCat;
    useEffect(() => {
      if (id !== undefined) {
        dispatch(getIdCategoryBlog(id));
      } else {
        dispatch(resetState());
      }
    }, [id]);

    const formik = useFormik({
      enableReinitialize:true,
        initialValues: {
        title: categoryBlogName || "",
      },
    validationSchema: schema,
    onSubmit: (values) => {
      if(id !== undefined){
        const data = {_id : id,categoryData : values}
        dispatch(updateCategoryBlog(data))
        toast.success("Cập nhật thành công!");
        navigate("/admin/list-categoryblog");
        window.location.reload()
      }else{
        dispatch(createCategoryBlog(values));
        toast.success("Thêm vào danh sách thành công");
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
          navigate('/admin/list-categoryblog')
        }, 300);
      }
    },
  });
    return (
        <div>
            <h3 className='mb-4 title'>{id !== undefined ? "Sửa ":"Thêm "} danh mục Blog </h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput 
                        type ="text" 
                        label ="Enter Category blog"
                        onchange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        val={formik.values.title}
                        />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>
                      {id !== undefined ? "Update":"Add"} Category</button>
                </form>
            </div>
        </div>
    );
}

export default AddCategoryBlog;
