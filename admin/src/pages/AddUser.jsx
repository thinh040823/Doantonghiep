import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { getAllUser, getUser, register, resetState, updateUser } from '../feature/auth/authSlice';

let schema = yup.object().shape({
  name: yup.string().required("name is Required"),
  email: yup.string().email("Nhập sai email !").required("email is Required"),
  password: yup.string().required("password is Required"),
  address: yup.string().required("address is Required"),
  mobile: yup.string().required("mobile is Required"),
  role: yup.string().required("role is Required"),
});

const AddUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getUser(id));
    } else {
      dispatch(resetState());
    }
  }, [id]);

  const AUser = useSelector((state) => state?.auth?.getUser?.getUser);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: AUser?.name || "",
      email: AUser?.email || "",
      password: AUser?.password || "",
      address: AUser?.address || "",
      mobile: AUser?.mobile || "",
      role: AUser?.role || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (id !== undefined) {
        const data = { _id: id, values: values };
        dispatch(updateUser(data));
        dispatch(resetState());
        toast.success("Cập nhật thành công");
        navigate("/admin/list-users");
        window.location.reload();
      } else {
        dispatch(register(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate('/admin/list-users');
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>{id ? "Cập nhật " : "Thêm "} người dùng</h3>
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <CustomInput 
            type="text" 
            label="Nhập tên"
            onchange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>

          <CustomInput 
            type="email" 
            label="Nhập Email"
            onchange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>

          <CustomInput 
            type="password" 
            label="Nhập mật khẩu"
            onchange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password}
          </div>

          <CustomInput 
            type="text" 
            label="Nhập địa chỉ"
            onchange={formik.handleChange("address")}
            onBlur={formik.handleBlur("address")}
            val={formik.values.address}
          />
          <div className="error">
            {formik.touched.address && formik.errors.address}
          </div>

          <CustomInput 
            type="text" 
            label="Nhập số điện thoại"
            onchange={formik.handleChange("mobile")}
            onBlur={formik.handleBlur("mobile")}
            val={formik.values.mobile}
          />
          <div className="error">
            {formik.touched.mobile && formik.errors.mobile}
          </div>

          <select
            name="role"
            onChange={formik.handleChange("role")}
            onBlur={formik.handleBlur("role")}
            value={formik.values.role}
            className="form-control py-3 mb-3"
          >
            <option value="">Select Role</option>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <div className="error">
            {formik.touched.role && formik.errors.role}
          </div>

          <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
