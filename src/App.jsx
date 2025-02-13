import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { HomePage } from './components/pages/home/HomePage'
import { NoPage } from './components/pages/noPage/NoPage'
import { ProductInfo } from './components/productInfo/ProductInfo'
import { ScrollTop } from './components/scrollTop/ScrollTop'
import { CartPage } from './components/pages/Cart/CartPage'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ScrollTop/>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/*' element={<NoPage/>} />
          <Route path="/product-info" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

