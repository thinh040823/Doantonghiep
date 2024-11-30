import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, getBrands } from '../feature/brand/brandSlice';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import CustomModel from '../components/CustomModel';

const { Search } = Input;

const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const [searchText, setSearchText] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setBrandId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const stateBrands = useSelector(state => state.brand.brands);
  const clonedBrands = [...stateBrands];
  const mapBrand = clonedBrands.slice().reverse();

  const filteredData = mapBrand.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const data1 = [];
  for (let i = 0; i < filteredData.length; i++) {
    data1.push({
      key: i + 1,
      title: filteredData[i].title,
      action: (
        <>
          <Link to={`/admin/brand/${filteredData[i]._id}`}><FaEdit className='fs-5 text-secondary' /></Link>
          <button
            className='bg-transparent border-0'
            onClick={() => {
              showModal(filteredData[i]._id);
            }}
          >
            <MdDelete className='ms-3 fs-5 text-danger' />
          </button>
        </>
      )
    });
  }

  const deleteBr = (e) => {
    dispatch(deleteBrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  }

  return (
    <div>
      <h3 className='mb-4 title'>
        Brand List
      </h3>
      <div className="row">
        <div className="col-4">
          <button className='btn btn-primary mt-2 mb-2'>
            <Link to='/admin/brand' className='text-decoration-none text-white'>
              Add brand
            </Link>
          </button>
        </div>
        <div className="col-8">
          {/* Thêm trường nhập dữ liệu để nhập từ khóa tìm kiếm */}
          <Search
            placeholder="Tìm kiếm brand"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div className="">
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteBr(brandId) }}
        title="Are you sure you want to delete this brand ?" />
    </div>
  );
}

export default BrandList;
