import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import DynamicForm from "./Form";

test("disables all other fields when one field is filled", async () => {
  const nameInput = screen.getByLabelText(/Full Name/i);
  const emailInput = screen.getByLabelText(/Email/i);

  userEvent.type(nameInput, "JohnDoe");

  expect(emailInput).toBeDisabled();
});

test("enables all fields when the filled field is cleared", async () => {
  const nameInput = screen.getByLabelText(/Full Name/i);
  const emailInput = screen.getByLabelText(/Email/i);

  userEvent.type(nameInput, "JohnDoe");
  expect(emailInput).toBeDisabled();

  userEvent.clear(nameInput);
  expect(emailInput).toBeEnabled();
});

test("disables all fields on form submission", async () => {
  const nameInput = screen.getByLabelText(/Full Name/i);
  const emailInput = screen.getByLabelText(/Email/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  userEvent.type(nameInput, "JohnDoe");
  fireEvent.click(submitButton);

  expect(nameInput).toBeDisabled();
  expect(emailInput).toBeDisabled();
  expect(submitButton).toBeDisabled();
});
