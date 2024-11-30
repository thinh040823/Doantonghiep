import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { deleteSlide, getSlides } from '../feature/slide/SlideSlice';
import CustomModel from '../components/CustomModel';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    render: (text, record) => (
      <div>
        {record?.image?.length > 0 && (
          <img
            key={record?.image[0]?._id}
            src={record?.image[0]?.url}
            alt={record?.title}
            style={{ width: '600px', height: '100px', objectFit: 'cover', marginRight: '5px' }}
          />
        )}
      </div>
    ),
  },
  {
    title: 'Hành Động',
    dataIndex: 'action',
  },
];

const ListSlide = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setUserId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getSlides());
  }, []);

  const slides = useSelector(state => state.slide.Slides);

  const handleDeleteProduct = (id) => {
    dispatch(deleteSlide(id));
    toast.success("Xóa slide thành công");
    setOpen(false);
    setTimeout(() => {
      dispatch(getSlides());
    }, 100);
  }

  const data1 = slides.map((slide, index) => ({
    key: index + 1,
    image: slide.images, // Correctly accessing the images field
    action: (
      <>
        <Link to={`/admin/update-slide/${slide._id}`}><FaEdit className='fs-5 text-secondary' /></Link>
        <button
          style={{ border: "none" }}
          className='bg-white'
          >
          <MdDelete className='ms-3 fs-5 text-danger' 
          onClick={()=>showModal(slide._id)}/>
        </button>
      </>
    ),
  }));

  return (
    <div>
      <h3 className='mb-4 title'>
        Danh sách slide
      </h3>
      <div className="row">
        <div className="col-4">
          <button className='btn btn-primary mt-2 mb-2'>
            <Link to='/admin/add-slide' className='text-decoration-none text-white'>
              Thêm slide
            </Link>
          </button>
        </div>
        <div className="col-8">
        </div>
      </div>
      <div className="">
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
            hideModal={hideModal}
            open={open}
            performAction={() => { handleDeleteProduct(userId) }}
            title="Bạn có muốn xóa Slide này không ?" />
    </div>
  );
}

export default ListSlide;
