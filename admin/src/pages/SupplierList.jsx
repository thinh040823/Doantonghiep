import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, getBrands } from '../feature/brand/brandSlice';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import CustomModel from '../components/CustomModel';
import { deleteSupplier, getSupplier } from '../feature/supplier/supplierSlice';

const { Search } = Input;

const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Tên nhà cung cấp',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const SupplierList = () => {
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
    dispatch(getSupplier());
  }, [dispatch]);

  const stateBrands = useSelector(state => state.supplier.suppliers);
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
          <Link to={`/admin/supplier/${filteredData[i]._id}`}><FaEdit className='fs-5 text-secondary' /></Link>
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
    dispatch(deleteSupplier(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getSupplier());
    }, 100);
  }

  return (
    <div>
      <h3 className='mb-4 title'>
        Danh sách nhà cung cấp
      </h3>
      <div className="row">
        <div className="col-4">
          <button className='btn btn-primary mt-2 mb-2'>
            <Link to='/admin/add-supplier' className='text-decoration-none text-white'>
              Thêm nhà cung cấp
            </Link>
          </button>
        </div>
        <div className="col-8">
          {/* Thêm trường nhập dữ liệu để nhập từ khóa tìm kiếm */}
          <Search
            placeholder="Tìm kiếm nhà cung cấp"
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
        title="Bạn có muốn xóa nhà cung cấp này ?" />
    </div>
  );
}

export default SupplierList;
