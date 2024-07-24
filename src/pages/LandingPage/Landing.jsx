import React from "react";
import Cart from "../../Components/Cart";
import SingleProduct from "../../Components/SingleProduct";
import RootLayout from "../../Components/NavBarPanel";
import Dashboard from '../../Components/Dashboard'

const LandingPage = () => {
  return (
    <div>
      <RootLayout />
      <Dashboard />
      <Cart />
      <SingleProduct />
    </div>
  );
};

export default LandingPage;
