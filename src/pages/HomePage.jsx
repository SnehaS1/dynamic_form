// src/pages/HomePage.js
import React from "react";
import DynamicForm from "../Form";
import DynamicForm2 from "../Form2";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [formState, setFormState] = React.useState({});
  const formFields = [
    {
      id: "fullname",
      label: "Full Name",
      formType: "input",
      required: false,
      minLength: 5,
      maxLength: 10,
    },
    {
      id: "email",
      label: "Email",
      formType: "email",
      required: false,
    },
    {
      id: "country",
      label: "Country",
      formType: "select",
      values: ["USA", "Canada", "Mexico"],
      required: false,
    },
    {
      id: "gender",
      label: "Gender",
      formType: "radio",
      values: ["Male", "Female", "Other"],
      required: false,
    },
    {
      id: "hobbies",
      label: "Hobbies",
      formType: "checkbox",
      values: ["Reading", "Traveling", "Cooking"],
      required: false,
    },
  ];
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    console.log(values);
    setFormState(values);
    navigate("/about");
  };
  return (
    <div>
      <h1>Home Page</h1>
      <DynamicForm2 fields={formFields} onSubmit={handleSubmit} />;
    </div>
  );
}

export default HomePage;
