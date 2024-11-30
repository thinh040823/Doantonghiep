import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../features/products/productSlice';
import { getAllCategory } from '../features/Category/categorySlice';
import Product from '../components/Product';
import { useLocation } from 'react-router-dom';

export default function Products() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({ priceRange: '', name: '' });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category'); // Get the category from URL query parameter
  console.log(selectedCategory)
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCategory());
    window.scroll(0, 0);
  }, [dispatch]);

  // Update selectedCategories when the selectedCategory query param changes
  useEffect(() => {
    if (selectedCategory && !selectedCategories.includes(selectedCategory)) {
      setSelectedCategories([selectedCategory.toLowerCase()]);
    }
  }, [selectedCategory]);

  const productState = useSelector(state => state.product?.products);
  const categoryState = useSelector(state => state.category?.category);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value
    }));
  };

  const handlePriceRangeChange = (e) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      priceRange: e.target.value
    }));
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories(prevSelectedCategories => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter(c => c !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const priceRanges = [
    { label: 'Tất cả', value: '' },
    { label: 'Dưới 100.000', value: '0-100000' },
    { label: 'Từ 100.000 - 300.000', value: '100000-300000' },
    { label: 'Từ 300.000 - 1.000.000', value: '300000-1000000' },
    { label: 'Trên 1.000.000', value: '1000000-' }
  ];

  const filterProducts = (products) => {
    return products && products.filter(product => {
      const matchesName = product.title.toLowerCase().includes(filter.name.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category.toLowerCase());  // Category check
      
      let matchesPrice = true;
      if (filter.priceRange) {
        const [minPrice, maxPrice] = filter.priceRange.split('-').map(p => parseFloat(p));
        matchesPrice = product.priceSale >= minPrice && (isNaN(maxPrice) || product.priceSale <= maxPrice);
      }

      return matchesPrice && matchesName && matchesCategory;
    }).sort((a, b) => {
      if (sortOrder === 'asc') return a.priceSale - b.priceSale;
      if (sortOrder === 'desc') return b.priceSale - a.priceSale;
      return 0;
    });
  };

  const filteredProducts = filterProducts(productState);

  return (
    <div className='container pb-5 pt-[155px]'>
      <div className="row">
        <div className="col-md-4">
          <div>
            <h6 className="mb-2 font-bold">Tên sản phẩm</h6>
            <input 
              type="text" 
              name="name" 
              placeholder="Filter by name" 
              value={filter.name} 
              onChange={handleFilterChange} 
              className="form-control mb-3"
            />
          </div>
          <div>
            <h6 className="mb-2 pt-3 font-bold">Giá tiền</h6>
            {priceRanges.map(range => (
              <div key={range.value} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priceRange"
                  value={range.value}
                  checked={filter.priceRange === range.value}
                  onChange={handlePriceRangeChange}
                />
                <label className="form-check-label">
                  {range.label}
                </label>
              </div>
            ))}
          </div>
          <div>
            <h6 className="mb-2 pt-3 font-bold">Danh mục</h6>
            <div key="all" className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="category"
                value="all"
                checked={selectedCategories.length === 0}
                onChange={() => {
                  setSelectedCategories([]);  // Khi chọn "Tất cả", bỏ chọn các danh mục khác
                }}
              />
              <label className="form-check-label">
                Tất cả
              </label>
            </div>
            {Array.isArray(categoryState) && categoryState.map((category) => (
              <div key={category._id} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="category"
                  value={category.title}
                  checked={selectedCategories.includes(category.title.toLowerCase())}  // Đảm bảo checkbox được checked nếu danh mục trùng với selectedCategory
                  onChange={() => handleCategorySelect(category.title.toLowerCase())}
                />
                <label className="form-check-label">
                  {category.title}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-8">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className='font-bold'>Danh sách sản phẩm</h6>
            <select 
              name="sortOrder" 
              value={sortOrder} 
              onChange={handleSortOrderChange} 
              className="form-control"
              style={{width:"200px"}}
            >
              <option value="">Chọn thứ tự</option>
              <option value="asc">Giá tăng dần</option>
              <option value="desc">Giá giảm dần</option>
            </select>
          </div>
          <div className="row flex gap-2">
            {filteredProducts?.length >=1 ? filteredProducts.map((e, index) => (
              <Product item={e} key={index}/>
            ))
            : (
              <p>Không có sản phầm bạn cần</p>
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
