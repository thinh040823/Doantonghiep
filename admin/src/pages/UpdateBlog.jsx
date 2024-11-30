import {
  React,
  useEffect,
  useState,
} from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import {
  delImg,
  resetImages,
  uploadImg,
} from "../feature/upload/uploadSlice";
import { getCategoryBlog } from "../feature/blogCategory/categoryBlogSlice";
import {
  getIdBlog,
  resetState,
  updateBlog,
} from "../feature/blog/blogSlice";

let schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is Required"),
  description: yup
    .string()
    .required(
      "Description is Required"
    ),
  categoryBlog: yup
    .string()
    .required("Category is Required"),
});

const UpdateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getIdBlog(id));
  }, [id]);

  useEffect(() => {
    dispatch(getCategoryBlog());
  }, []);

  const categoryBl = useSelector(
    (state) =>
      state.categoryBlog.categoryBlog
  );
  const imgState = useSelector(
    (state) => state.upload.images
  );
  const blogState = useSelector(
    (state) =>
      state.blog.blogId?.findBlog
  );

  const [
    initialValues,
    setInitialValues,
  ] = useState({
    title: "",
    description: "",
    categoryBlog: "",
    images: [],
  });

  const [
    uploadedImages,
    setUploadedImages,
  ] = useState([]);

  useEffect(() => {
    if (blogState) {
      setInitialValues({
        title: blogState?.title || "",
        description:
          blogState?.description || "",
        categoryBlog:
          blogState?.categoryBlog || "",
        images: blogState?.images || [],
      });
    }
  }, [blogState]);

  useEffect(() => {
    if (imgState.length > 0) {
      setUploadedImages(
        imgState.map((i) => ({
          public_id: i.public_id,
          url: i.url,
        }))
      );
    }
  }, [imgState]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      const data = {
        _id: id,
        blogData: {
          ...values,
          images:
            uploadedImages.length > 0
              ? uploadedImages
              : initialValues.images,
        },
      };
      dispatch(updateBlog(data));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        dispatch(resetImages());
        navigate("/admin/list-blogs");
      }, 100);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        Cập nhật blog
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column">
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onchange={formik.handleChange(
              "title"
            )}
            onBlur={formik.handleBlur(
              "title"
            )}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title &&
              formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={(value) =>
                formik.setFieldValue(
                  "description",
                  value
                )
              }
              value={
                formik.values
                  .description
              }
            />
          </div>
          <div className="error">
            {formik.touched
              .description &&
              formik.errors.description}
          </div>

          <select
            name="categoryBlog"
            onChange={formik.handleChange(
              "categoryBlog"
            )}
            onBlur={formik.handleBlur(
              "categoryBlog"
            )}
            value={
              formik.values.categoryBlog
            }
            className="form-control py-3 mb-3"
            id="">
            <option value="">
              Select categoryBlog
            </option>
            {categoryBl.map((i, j) => (
              <option
                key={j}
                value={i.title}>
                {i.title}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched
              .categoryBlog &&
              formik.errors
                .categoryBlog}
          </div>

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) =>
                dispatch(
                  uploadImg(
                    acceptedFiles
                  )
                )
              }>
              {({
                getRootProps,
                getInputProps,
              }) => (
                <section>
                  <div
                    {...getRootProps()}>
                    <input
                      {...getInputProps()}
                    />
                    <p>
                      Drag 'n' drop some
                      files here, or
                      click to select
                      files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {(uploadedImages.length > 0
              ? uploadedImages
              : initialValues.images
            )?.map((i, j) => (
              <div
                className="position-relative"
                key={j}>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(
                      delImg(
                        i.public_id
                      )
                    )
                  }
                  className="btn-close position-absolute"
                  style={{
                    top: "10px",
                    right: "10px",
                  }}></button>
                <img
                  src={i.url}
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
            ))}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit">
            Cập nhật Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
