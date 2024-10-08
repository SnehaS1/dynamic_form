// src/Router.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PaymentGrid from "./pages/Deliquency";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/delinquency" element={<PaymentGrid />} />

        {/* <Route path="/contact" element={<ContactPage />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
