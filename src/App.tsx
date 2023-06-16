import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { RegisterTypeProduct } from './pages/registerTypeProducts';
import { RegisterProduct } from './pages/registerProducts';
import { SaleForm } from './pages/newSale';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/newTypeProduct" element={<RegisterTypeProduct />} />
        <Route path="/newProduct" element={<RegisterProduct />} />
        <Route path="/newSale" element={<SaleForm />} />

      </Routes>
    </>
  );
};

export default App;
