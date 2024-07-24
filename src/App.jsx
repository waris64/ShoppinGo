import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import LandingPage from "./pages/LandingPage/Landing";
import SingleProduct from "./Components/SingleProduct";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/product/:id" element={<SingleProduct />} /> 
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
