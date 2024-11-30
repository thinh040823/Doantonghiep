import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createSupplier, getIdSupplier, resetState, updateSupplier } from '../feature/supplier/supplierSlice';


let schema = yup.object().shape({
  title: yup.string().required("Title is Required")
});

const AddSupplier = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const {id} = useParams()
    useEffect(() => {
      if (id !== undefined) {
        dispatch(getIdSupplier(id));
      } else {
        dispatch(resetState());
      }
    }, [id]);
    const supplierName = useSelector(state=>state.supplier?.supplierName)
    const formik = useFormik({
      enableReinitialize:true,
      initialValues: {
      title: supplierName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(id !== undefined){
        const data = {_id : id,supplierData : values}
        dispatch(updateSupplier(data))
        toast.success("Cập nhật thành công!");
        navigate("/admin/supplier");
      }else{
        dispatch(createSupplier(values));
        toast.success("Tạo thành công!");
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
          navigate('/admin/supplier')
        }, 300);
      }
    },
  });
    return (
        <div>
            <h3 className='mb-4 title'> {id?"Cập nhật ": "Thêm "} Nhà sản xuất</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput 
                        type ="text" 
                        label ="Enter NSX"
                        onchange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        val={formik.values.title}
                        />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddSupplier;
