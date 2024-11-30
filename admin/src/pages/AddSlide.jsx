import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { delImg, resetImages, uploadImg } from "../feature/upload/uploadSlice";
import { createSlide, getIdSlide, getSlides, resetState, updateSlide } from "../feature/slide/SlideSlice";

let schema = yup.object().shape({
  images: yup.array().of(
    yup.object().shape({
      public_id: yup.string().required(),
      url: yup.string().required(),
    })
  ).required("images is Required"),
});

const AddSlide = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const imgState = useSelector((state) => state?.upload?.images);
  const imagesAslide = useSelector((state) => state?.slide?.aSlide?.images || []);

  useEffect(() => {
    if (id) {
      dispatch(getIdSlide(id));
    }
  }, [id, dispatch]);

  const formik = useFormik({
    initialValues: {
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (id) {
        const data = { _id: id, slideData: values };
        dispatch(updateSlide(data));
        dispatch(resetImages());
        toast.success("Cập nhật slide thành công");
        navigate("/admin/list-slide");
        setTimeout(()=>{
            dispatch(getSlides())
        },300)
      } else {
        dispatch(createSlide(values));
        formik.resetForm();
        toast.success("Thêm Slide thành công");
        setTimeout(() => {
          dispatch(resetState());
          dispatch(resetImages());
          navigate('/admin/list-slide');
          setTimeout(()=>{
            dispatch(getSlides())
          },300)
        }, 100);
      }
    },
  });

  useEffect(() => {
    if (id && imagesAslide.length > 0) {
      formik.setFieldValue('images', imagesAslide);
    }
  }, [imagesAslide, id]);

  useEffect(() => {
    if (imgState.length > 0) {
      formik.setFieldValue('images', imgState);
    }
  }, [imgState]);

  const handleDeleteImage = (public_id) => {
    dispatch(delImg(public_id));
    const updatedImages = formik.values.images.filter(img => img.public_id !== public_id);
    formik.setFieldValue('images', updatedImages);
  };

  return (
    <div>
      <h3 className="mb-4 title">{id ? "Sửa " : "Thêm "} Slide</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {formik.values.images?.map((i, j) => (
              <div className="position-relative" key={j}>
                <button
                  type="button"
                  onClick={() => handleDeleteImage(i.public_id)}
                  className="btn-close position-absolute"
                  style={{ top: "10px", right: "10px" }}
                ></button>
                <img src={i.url} alt="" width={200} height={200} />
              </div>
            ))}
          </div>
          {formik.errors.images && formik.touched.images ? (
            <div className="text-danger">{formik.errors.images}</div>
          ) : null}
          <button className="btn btn-primary border-0 rounded-3 my-5" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSlide;
