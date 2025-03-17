import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { HomePage } from './components/pages/home/HomePage'
import { NoPage } from './components/pages/noPage/NoPage'
import { ProductInfo } from './components/productInfo/ProductInfo'
import { ScrollTop } from './components/scrollTop/ScrollTop'
import { CartPage } from './components/pages/Cart/CartPage'
import { AllProducts } from './components/allProducts/AllProducts'
import { Login } from './components/registration/Login'
import { SignUp } from './components/registration/SignUp'
import { UserDashboard } from './components/pages/user/UserDashboard'
import { AdminDashboard } from './components/pages/admin/AdminDashboard'
import { AddProductPage } from './components/pages/admin/AddProductPage'
import { UpdateProductPage } from './components/pages/admin/UpdateProductPage'
import {MyState} from './context/myState'
import { ProtectedRouteForAdmin } from './protectedRoute/ProtectedRouteForAdmin'
import { ProtectedRouteForUser } from './protectedRoute/ProtectedRouteForUser'
import { ToastContainer } from 'react-toastify'
import { CategoryPage } from './components/pages/category/CategoryPage'

const App = () => {
  return (
    <MyState>
      <BrowserRouter>
        <ScrollTop/>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/*' element={<NoPage/>} />
          <Route path="/product-info/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path='/all-products' element={<AllProducts/>}/>
          <Route path="/category/:categoryname" element={<CategoryPage />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/user-dashboard' element={
            <ProtectedRouteForUser>
              <UserDashboard/>
              </ProtectedRouteForUser>}/>
          <Route path='/admin-dashboard' element={<ProtectedRouteForAdmin><AdminDashboard/></ProtectedRouteForAdmin>}/>
          <Route path="/addproduct" element={
            <ProtectedRouteForAdmin>
              <AddProductPage />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/updateproduct/:id" element={
            <ProtectedRouteForAdmin>
              <UpdateProductPage />
            </ProtectedRouteForAdmin>
          } />
        </Routes>

      </BrowserRouter>
    </MyState>
  );
};

export default App;

