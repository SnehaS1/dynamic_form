// src/Router.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PaymentGrid from "./pages/Deliquency";
import FeedbackApp from "./pages/Feedback";
import DraggableButtonWithForm from "./pages/draggableform";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/delinquency" element={<PaymentGrid data={Pay} />} /> */}
        <Route path="/feedback" element={<FeedbackApp />} />
        <Route path="/draggable" element={<DraggableButtonWithForm />} />

        {/* <Route path="/contact" element={<ContactPage />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
