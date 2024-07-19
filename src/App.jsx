import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./Components/Dashboard";
import RootLayout from './Components/RootLayout';
import Cart from "./Components/Cart";
import SingleProduct from "./Components/SingleProduct";

function App() {
  
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
