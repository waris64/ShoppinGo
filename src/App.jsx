import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./Components/Dashboard";
import RootLayout from './Components/RootLayout';
import Cart from "./Components/Cart";
import { Provider } from "react-redux";
import store from "./store/store";
// import ProductDetails from "./Components/SingleProduct";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/product/:id" element={<ProductDetails />}/> */}
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
