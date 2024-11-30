import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import Cart from "./components/Cart";
import UpdateAccount from "./pages/UpdateAccount";
import Account from "./pages/Account";
import MyOrder from "./pages/MyOrder";
import ItemsSearch from "./components/ItemsSearch";
import Products from "./pages/Products";
import BlogDetail from "./pages/BlogDetail";
import BlogCategory from "./pages/BlogCategory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout />}>
            <Route
              index
              element={<HomePage />}
            />
            <Route
              path="/product/:id"
              element={<ProductDetail />}
            />
            <Route path='cart' element={<Cart />} />
            <Route path='search' element={<ItemsSearch/>}/>
            <Route path='product' element={<Products/>} />
            <Route path='category-blog' element={<BlogCategory/>} />
            <Route path='blog/:id' element={<BlogDetail/>}/>
            <Route path='checkout' element={<PrivateRoutes><Checkout/></PrivateRoutes>}/>
            <Route path='checkout-success' element={<PrivateRoutes><CheckoutSuccess/></PrivateRoutes>}/>
            <Route path='my-order' element={<PrivateRoutes><MyOrder/></PrivateRoutes>}/>
            <Route path='account' element={<PrivateRoutes><Account/></PrivateRoutes>}/>
            <Route path='update-account' element={<PrivateRoutes><UpdateAccount/></PrivateRoutes>}/>
            <Route
              path="*"
              element={<NotFound />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
