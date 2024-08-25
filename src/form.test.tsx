import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import DynamicForm from "./Form";

const formFields = [
  {
    id: "fullname",
    label: "Full Name",
    formType: "input",
    required: true,
    minLength: 5,
    maxLength: 10,
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

describe("DynamicForm", () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    render(<DynamicForm fields={formFields} onSubmit={onSubmit} />);
  });

  test("renders all form fields", () => {
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hobbies/i)).toBeInTheDocument();
  });

  test("displays validation errors for required fields", async () => {
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText(/Full Name is required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Country is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Gender is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Hobbies is required/i)).toBeInTheDocument();
  });

  test("displays validation error for minimum length", async () => {
    userEvent.type(screen.getByLabelText(/Full Name/i), "John");
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText(/Minimum length is 5/i)).toBeInTheDocument();
  });

  test("displays validation error for maximum length", async () => {
    userEvent.type(screen.getByLabelText(/Full Name/i), "Jonathan12345");
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText(/Maximum length is 10/i)
    ).toBeInTheDocument();
  });

  test("displays validation error for invalid email", async () => {
    userEvent.type(screen.getByLabelText(/Email/i), "invalid-email");
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText(/Invalid email address/i)
    ).toBeInTheDocument();
  });

  test("successful form submission", async () => {
    userEvent.type(screen.getByLabelText(/Full Name/i), "JohnDoe");
    userEvent.type(screen.getByLabelText(/Email/i), "john@example.com");
    userEvent.selectOptions(screen.getByLabelText(/Country/i), "USA");
    userEvent.click(screen.getByLabelText(/Male/i));
    userEvent.click(screen.getByLabelText(/Reading/i));

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      fullname: "JohnDoe",
      email: "john@example.com",
      country: "USA",
      gender: "Male",
      hobbies: ["Reading"],
    });
  });
});
