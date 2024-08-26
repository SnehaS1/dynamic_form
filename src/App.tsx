import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DynamicForm from "./Form";
import DynamicForm2 from "./Form2";
const formFields = [
  {
    id: "fullname",
    label: "Full Name",
    formType: "input",
    required: true,
    minLength: 5,
    maxLength: 10,
    pattern: "^[A-Za-z]+$",
  },
  {
    id: "email",
    label: "Email",
    formType: "email",
    required: true,
  },
  {
    id: "country",
    label: "Country",
    formType: "select",
    values: ["USA", "Canada", "Mexico"],
    required: true,
  },
  {
    id: "gender",
    label: "Gender",
    formType: "radio",
    values: ["Male", "Female", "Other"],
    required: true,
  },
  {
    id: "hobbies",
    label: "Hobbies",
    formType: "checkbox",
    values: ["Reading", "Traveling", "Cooking"],
    required: true,
  },
];
function App() {
  const handleSubmit = (values: any) => {
    console.log("Form Values:", values);
  };
  return (
    <div className="App">
      <DynamicForm2 fields={formFields} onSubmit={handleSubmit} />;
    </div>
  );
}

export default App;
