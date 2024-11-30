import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { addVoucher, resetState } from '../feature/voucher/voucherSlice';


let schema = yup.object().shape({
  startDay: yup.string().required("startDay is Required"),
  endDay: yup.string().required("endDay is Required"),
  quantity: yup.string().required("quantity is Required"),
  percent: yup.string().required("percent is Required"),
  title: yup.string().required("Title is Required"),
});

const AddVoucher = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const formik = useFormik({
      initialValues: {
        startDay:"",
        endDay:"",
        quantity:"",
        percent:"",
        title:"",
      },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(addVoucher(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState())
        navigate('/admin/list-voucher')
      }, 300);
    },
  });
    return (
        <div>
            <h3 className='mb-4 title'> Thêm voucher</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput 
                        type ="date" 
                        label ="Ngày bắt đầu"
                        onchange={formik.handleChange("startDay")}
                        onBlur={formik.handleBlur("startDay")}
                        val={formik.values.startDay}
                        />
                    <div className="error">
                        {formik.touched.startDay && formik.errors.startDay}
                    </div>
                    <CustomInput 
                        type ="date" 
                        label ="Ngày kết thúc"
                        onchange={formik.handleChange("endDay")}
                        onBlur={formik.handleBlur("endDay")}
                        val={formik.values.endDay}
                        />
                    <div className="error">
                        {formik.touched.endDay && formik.errors.endDay}
                    </div>
                    <CustomInput 
                        type ="number" 
                        label ="Phần trăm"
                        onchange={formik.handleChange("percent")}
                        onBlur={formik.handleBlur("percent")}
                        val={formik.values.percent}
                        />
                    <div className="error">
                        {formik.touched.percent && formik.errors.percent}
                    </div>
                    <CustomInput 
                        type ="number" 
                        label ="quantity"
                        onchange={formik.handleChange("quantity")}
                        onBlur={formik.handleBlur("quantity")}
                        val={formik.values.quantity}
                        />
                    <div className="error">
                        {formik.touched.quantity && formik.errors.quantity}
                    </div>
                    <CustomInput 
                        type ="text" 
                        label ="Tên voucher"
                        onchange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        val={formik.values.title}
                        />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>
                      Thêm voucher
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddVoucher;
