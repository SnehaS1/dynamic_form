import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DynamicForm from "./Form";
import DynamicForm2 from "./Form2";
import AppRouter from "./Router";
import FeedbackApp from "./pages/Feedback";

function App() {
  return (
    <div className="App">
      <AppRouter />
      <FeedbackApp />
    </div>
  );
}

export default App;
