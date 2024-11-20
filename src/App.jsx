import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import UserProfile from './components/UserProfile/Userprofile';
import UserProfileAccess from './components/UserProfile/UserProfileAccess/UserProfileAccess';
import UserProfileEdit from './components/UserProfile/UserProfileEdit';
import Logo from './components/Logo/Logo';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ResetPasswordForm from './pages/ResetPassword/ResetPasswordForm';
import ProductSearch from './pages/SellProduct/ProductSearch';
import CategoryConfirmation from './pages/SellProduct/CategoryConfirmation';
import CategoryCarousel from './components/CategoryCarousel/CategoryCarousel'
import ProductDetails from './pages/SellProduct/ProductDetails';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import MyPublication from './pages/MyPublications/MyPublications';
import ShipmentForm from './components/Shipment/ShipmentForm/ShipmentForm';
import PaymentMethodSelector from './components/Payment/PaymentMethodSelector/PaymentMethodSelector';
import CreditCardForm from './components/Payment/CreditCardForm/CreditCardForm';
import CashPaymentForm from './components/Payment/CashPaymentForm/CashPaymentForm';
import NotFound from './pages/NotFound/NotFound';
import Contact from './pages/Contact/Contact';
import FAQ from './pages/CustomerServices/FAQ/FAQ';
import JoinUs from './pages/CustomerServices/JoinUs/JoinUs';
import CartPage from '../src/pages/CartPage/CartPage';     
import History from '../src/pages/History/History'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user/profile/edit" element={<UserProfileEdit />} />
            <Route path="/user/profile/access" element={<UserProfileAccess />} />
            <Route path="/logo" element={<Logo />} />
            <Route path="/forgot-password" element={<ResetPassword />} />
            <Route path="/reset-password" element={<ResetPasswordForm />} />
            <Route path="/product/search" element={<ProductSearch />} />
            <Route path="/confirm-category/:categoryId" element={<CategoryConfirmation />} />
            <Route path="/category" element={<CategoryCarousel />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/my/publications" element={<MyPublication />} />
            <Route path="/shipment/form" element={<ShipmentForm />} />
            <Route path="/payment/method/selector" element={<PaymentMethodSelector />} />
            <Route path="/payment/credit-card" element={<CreditCardForm />} />
            <Route path="/payment/cash" element={<CashPaymentForm />} />
            <Route path="*" element={<NotFound />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/FAQ' element={<FAQ/>}/>
            <Route path='/JoinUs' element={<JoinUs/>}></Route>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/history" element={<History />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;