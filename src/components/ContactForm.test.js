import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "../App";
import ContactForm from "./ContactForm";
// test("renders App without crashing", () => {
//   render(<ContactForm />);
// });
describe("user inputs", () => {
  describe("first name input", () => {
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
});
