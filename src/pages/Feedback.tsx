import React, { useState } from "react";
import "../pages/feedback.css";

function FeedbackApp() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("addFeedback"); // "addFeedback" or "viewFeedback"
  const [isSubmitted, setIsSubmitted] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setActiveTab("addFeedback");
    setIsSubmitted(false);
  };

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const handleSubmitFeedback = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="App">
      {/* Vertical Feedback Button */}
      <button className="feedback-button" onClick={togglePopup}>
        Feedback
      </button>

      {/* Feedback Popup */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={togglePopup}>
              &times;
            </button>
            <div className="tabs">
              <button
                className={`tab ${activeTab === "addFeedback" ? "active" : ""}`}
                onClick={() => handleTabChange("addFeedback")}
              >
                Add Feedback
              </button>
              <button
                className={`tab ${
                  activeTab === "viewFeedback" ? "active" : ""
                }`}
                onClick={() => handleTabChange("viewFeedback")}
              >
                View Feedback
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "addFeedback" && !isSubmitted && (
                <div className="add-feedback-form">
                  <h3>Add Feedback</h3>
                  <p>We value your feedback to improve our services.</p>
                  <label>Select Category</label>
                  <select>
                    <option value="app">Application Issue</option>
                    <option value="service">Service Quality</option>
                  </select>
                  <label>Feedback</label>
                  <textarea
                    rows={4}
                    placeholder="Enter your feedback"
                  ></textarea>
                  <button className="submit-btn" onClick={handleSubmitFeedback}>
                    Submit
                  </button>
                </div>
              )}

              {activeTab === "addFeedback" && isSubmitted && (
                <div className="success-message">
                  <h3>Submit Feedback</h3>
                  <p>Thank you for your valuable feedback!</p>
                  <button
                    className="view-feedback-btn"
                    onClick={() => handleTabChange("viewFeedback")}
                  >
                    View Feedback
                  </button>
                </div>
              )}

              {activeTab === "viewFeedback" && (
                <div className="view-feedback-content">
                  <h3>Feedback History</h3>
                  <p>No feedback available yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackApp;
