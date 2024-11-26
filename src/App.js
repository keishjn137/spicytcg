import './App.css';
import { Home } from './components/Home/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Checkout from './components/Checkout/checkout';
import UserProfile from './components/UserProfile/UserProfile';
import ProductManagement from './components/Management/Management';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/manage' element={<ProductManagement />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
