import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css';
import HomePage from './pages/HomePage';
import MainLayout from './components/MainLayout';
import ListUsers from './pages/ListUser';
import AddUser from './pages/AddUser';
import BrandList from './pages/BrandList';
import AddBrand from './pages/AddBrand';
import Login from './pages/Login';
import AddCat from './pages/AddCat';
import CategoryList from './pages/CategoryList';
import CategoryBlogList from './pages/CategoryBlogList';
import AddCategoryBlog from './pages/AddCategoryBlog';
import ListSlide from './pages/ListSlide';
import AddSlide from './pages/AddSlide';
import ProductList from './pages/ProductList';
import Addproduct from './pages/AddProduct';
import SupplierList from './pages/SupplierList';
import AddSupplier from './pages/AddSupplier';
import ListBlog from './pages/ListBlog';
import AddBlog from './pages/AddBlog';
import CheckUser from './pages/CheckUser';
import CheckBlog from './pages/CheckBlog';
import Updateproduct from './pages/UpdateProduct';
import CheckProduct from './pages/CheckProduct';
import PackageProduct from './pages/PackageProduct';
import ListPackage from './pages/ListPackage';
import UpdateBlog from './pages/UpdateBlog';
import Order from './pages/Order';
import ListVoucher from './pages/ListVoucher';
import AddVoucher from './pages/AddVoucher';
import CheckPack from './pages/CheckPack';
import { PrivateRoutes } from './routing/PrivateRoutes';
import Notification from './pages/Notification';

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Login/>} />
          {/* bên trong mainlayout có outlet nhận các phần tử con làm children */}
          <Route path='/admin' element={<PrivateRoutes><MainLayout/></PrivateRoutes>}>
            <Route index element={<HomePage/>} />
            <Route path='list-users' element={<ListUsers/>} />
            <Route path='thongbao' element={<Notification/>} />
            <Route path='add-user' element={<AddUser/>} />
            <Route path='user/:id' element={<AddUser/>} />
            <Route path='check-user/:id' element={<CheckUser/>} />

            <Route path='category' element={<AddCat/>} />
            <Route path='category/:id' element={<AddCat/>} />
            <Route path='list-category' element={<CategoryList/>} />

            <Route path='category-blog' element={<AddCategoryBlog/>} />
            <Route path='categoryblog/:id' element={<AddCategoryBlog/>} />
            <Route path='list-categoryblog' element={<CategoryBlogList/>} />

            <Route path='brand' element={<AddBrand/>} />
            <Route path='brand/:id' element={<AddBrand/>} />
            <Route path='list-brand' element={<BrandList/>} />

            <Route path='add-slide' element={<AddSlide/>} />
            <Route path='update-slide/:id' element={<AddSlide/>} />
            <Route path='list-slide' element={<ListSlide/>} />

            <Route path='list-product' element={<ProductList/>} />
            <Route path='add-product' element={<Addproduct/>} />
            <Route path='product/:id' element={<Updateproduct/>} />
            <Route path='check-product/:id' element={<CheckProduct/>} />

            <Route path='supplier' element={<SupplierList/>} />
            <Route path='supplier/:id' element={<AddSupplier/>} />
            <Route path='add-supplier' element={<AddSupplier/>} />


            <Route path='list-blogs' element={<ListBlog/>} />
            <Route path='add-blog' element={<AddBlog/>} />
            <Route path='blog/:id' element={<UpdateBlog/>} />
            <Route path='check-blog/:id' element={<CheckBlog/>} />

            <Route path='package-product' element={<PackageProduct/>} />
            <Route path='package' element={<ListPackage/>} />
            
            <Route path='orders' element={<Order/>} />

            <Route path='list-voucher' element={<ListVoucher/>} />
            <Route path='add-voucher' element={<AddVoucher/>} />
            <Route path='package-history/:id' element={<CheckPack />} />

          </Route>
        </Routes>
    </Router>
  );
}

export default App;
