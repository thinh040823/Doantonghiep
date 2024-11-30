import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate,useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../feature/brand/brandSlice";
import { getCategory } from "../feature/pcategory/pcategorySlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";

import { delImg, resetImages, uploadImg } from "../feature/upload/uploadSlice";
import { UdProducts, createProducts, getaProduct, resetState } from "../feature/product/productSlice";
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  descriptionShort: yup.string().required("descriptionShort is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  priceSale: yup.number().required("PriceSale is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  type: yup.string().required("Type is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategory());
  }, []);
  
  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.category.categories);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);


  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  
  useEffect(() => {
    formik.values.images = img;
  }, [img])

  const formik = useFormik({
    
    initialValues: {
      title: "",
      descriptionShort: "",
      description: "",
      price: "",
      priceSale:"",
      brand:  "",
      category: "",
      tags: "",
      images: "",
      type:""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState())
        dispatch(resetImages())
        navigate('/admin/list-product')
      }, 300);
    },
  });
 
  return (
    <div>
      <h3 className="mb-4 title">Thêm sản phẩm</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column as"
        >
          <CustomInput
            type="text"
            label="Nhập tên sản phẩm"
            name="title"
            onchange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <label htmlFor="Miêu tả dài" className="pb-2">Miêu tả dài</label>
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="">
            <label htmlFor="Miêu tả ngắn" className="pb-2">Miêu tả ngắn</label>
            <ReactQuill
              theme="snow"
              name="descriptionShort"
              onChange={formik.handleChange("descriptionShort")}
              value={formik.values.descriptionShort}
            />
          </div>
          <div className="error">
            {formik.touched.descriptionShort && formik.errors.descriptionShort}
          </div>
          <CustomInput
            type="number"
            label="Nhập giá tiền"
            name="price"
            onchange={formik.handleChange("price")}
            onBlur={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <CustomInput
            type="number"
            label="Nhập giá tiền được giảm"
            name="priceSale"
            onchange={formik.handleChange("priceSale")}
            onBlur={formik.handleBlur("priceSale")}
            val={formik.values.priceSale}
          />
          <div className="error">
            {formik.touched.priceSale && formik.errors.priceSale}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mt-5 mb-3"
            id=""
          >
            <option value="">Chọn thương hiệu</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Chọn danh mục</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select hidden
            </option>
            <option value="false">Ẩn</option>
            <option value="true">Hiện</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <select
            name="type"
            onChange={formik.handleChange("type")}
            onBlur={formik.handleBlur("type")}
            value={formik.values.type}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Chọn loại
            </option>
            <option value="Xu hướng theo ngày">Xu hướng theo ngày</option>
            <option value="Sách HOT - giảm sốc">Sách HOT - giảm sốc</option>
            <option value="Bestseller ngoại văn">Bestseller ngoại văn</option>
            <option value="Happy Halloween">Happy Halloween</option>
            <option value="flashSale">flashSale</option>
            <option value="Lịch">Lịch</option>
          </select>
          <div className="error">
            {formik.touched.type && formik.errors.type}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {  
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Thêm sản phẩm 
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;