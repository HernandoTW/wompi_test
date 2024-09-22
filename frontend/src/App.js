// frontend/src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import PaymentPage from './pages/PaymentPage';
import SummaryPage from './pages/SummaryPage';
import StatusPage from './pages/StatusPage';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './redux/slices/productsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/status" element={<StatusPage />} />
      </Routes>
    </Router>
  );
}

export default App;
