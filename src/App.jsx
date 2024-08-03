import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";
import LandingPage from "./pages/LandingPage/Landing";
import SingleProduct from "./Components/SingleProduct";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { checkAuthState } from "./store/authSlice";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute element={<LandingPage />} />} />
          <Route path="/product/:id" element={<ProtectedRoute element={<SingleProduct />} />} />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
