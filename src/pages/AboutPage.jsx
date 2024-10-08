// src/pages/AboutPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

function AboutPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page.</p>
      <div className="table-container">
        <div className="table-header">
          <div className="table-column">Header 1</div>
          <div className="table-column">Header 2</div>
          <div className="table-column">Header 3</div>
        </div>

        <div className="table-body">
          <div className="table-row">
            <div className="table-column">
              Row 1, Col 1 col 2s weqweessfinland
            </div>
            <div className="table-column">Row 1, Col 2</div>
            <div className="table-column">Row 1, Col 3</div>
          </div>
          <div className="table-row">
            <div className="table-column">Row 2, Col 1</div>
            <div className="table-column">Row 2, Col 2</div>
            <div className="table-column">Row 2, Col 3</div>
          </div>
        </div>
      </div>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default AboutPage;
