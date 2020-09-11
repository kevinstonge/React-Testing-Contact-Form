import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "../App";
import ContactForm from "./ContactForm";
// test("renders App without crashing", () => {
//   render(<ContactForm />);
// });
describe("user inputs", () => {
  // FIRST NAME
  describe("first name input", () => {
    //INVALID NAMES
    const invalidNames = ["a", "b", "c"];
    describe("with invalid first name", () => {
      test.each(invalidNames)("displays error", async (name) => {
        const { getByLabelText, container } = render(<ContactForm />);
        const firstNameInput = getByLabelText("First Name*");
        await act(async () => {
          fireEvent.change(firstNameInput, { target: { value: name } });
          fireEvent.blur(firstNameInput);
        });
        expect(container.innerHTML).toMatch("Looks like there was an error");
      });
    });
    //VALID NAMES
    const validNames = ["bob", "susan"];
    describe(`with valid first name`, () => {
      test.each(validNames)("displays no error", async (name) => {
        const { getByLabelText, container } = render(<ContactForm />);
        const firstNameInput = getByLabelText("First Name*");
        await act(async () => {
          fireEvent.change(firstNameInput, { target: { value: name } });
          fireEvent.blur(firstNameInput);
        });
        expect(container.innerHTML).not.toMatch(
          "Looks like there was an error"
        );
      });
    });
  });

  //EMAIL
  describe("email address input", () => {
    //INVALID email
    const invalidEmails = ["a@x", "gmail.com", "f38gmail.com"];
    describe("with invalid email address", () => {
      test.each(invalidEmails)("displays error", async (email) => {
        const { getByLabelText, container } = render(<ContactForm />);
        const emailInput = getByLabelText("Email*");
        await act(async () => {
          fireEvent.change(emailInput, { target: { value: email } });
          fireEvent.blur(emailInput);
        });
        expect(container.innerHTML).toMatch("Looks like there was an error");
      });
    });
    //VALID email
    const validEmails = ["bob@gmail.com", "sue@hotmail.net"];
    describe(`with valid email address`, () => {
      test.each(validEmails)("displays no error", async (email) => {
        const { getByLabelText, container } = render(<ContactForm />);
        const emailInput = getByLabelText("Email*");
        await act(async () => {
          fireEvent.change(emailInput, { target: { value: email } });
          fireEvent.blur(emailInput);
        });
        expect(container.innerHTML).not.toMatch(
          "Looks like there was an error"
        );
      });
    });
  });
});
