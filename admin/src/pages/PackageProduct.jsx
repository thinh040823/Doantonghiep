import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { getSupplier } from '../feature/supplier/supplierSlice';
import { getProducts } from '../feature/product/productSlice';
import { addPackage, resetState } from '../feature/packageProduct/packageProductSlice';

let schema = yup.object().shape({
  ncc: yup.string().required("Ncc is Required"),
  productId: yup.string().required("Product is Required"),
  quantity: yup.number()
  .required("Số lượng là bắt buộc")
  .min(1, "Số lượng phải lớn hơn hoặc bằng 1")
  .typeError("Số lượng phải là một số hợp lệ"),
});

const PackageProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSupplier());
    dispatch(getProducts());
  }, [dispatch]);

  const supplierState = useSelector(state => state.supplier?.suppliers);
  const productState = useSelector(state => state.product?.products);

  const formik = useFormik({
    initialValues: {
      ncc: "",
      productId: "",
      quantity: ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log('Form values:', values); // Log form values
      dispatch(addPackage({
        ncc: values.ncc,
        productId: values.productId,
        quantity: values.quantity
      }));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate('/admin/package');
      }, 300);
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'> Quản lý nhập hàng</h3>
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <select
            name="ncc"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ncc}
            className="form-control py-3 mb-3"
          >
            <option value="">Chọn nhà cung cấp</option>
            {supplierState.map((supplier) => (
              <option key={supplier.id} value={supplier.title}>
                {supplier.title}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.ncc && formik.errors.ncc}
          </div>
          <select
            name="productId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.productId}
            className="form-control py-3 mb-3"
          >
            <option value="">Chọn sản phẩm</option>
            {productState.map((product) => (
              <option key={product._id} value={product._id}>
                {product.title}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.productId && formik.errors.productId}
          </div>
          <CustomInput 
            type="number" 
            label="Nhập số lượng"
            onchange={formik.handleChange("quantity")}
            onBlur={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <button type="submit" className='btn btn-success border-0 rounded-3 my-5'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PackageProduct;
