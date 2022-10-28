/* eslint-disable no-undef */
import {
  validateEmptyAndEmail,
  validateEmptyAndLength3,
} from "../../src/utils/validators";

describe("Validators utils, maxLength3", () => {
  it("should return an error with empty payload", () => {
    expect(validateEmptyAndLength3()).toBe("*Este campo é obrigatório");
  });

  it("should return an error with less than 3 characteres", () => {
    expect(validateEmptyAndLength3("12")).toBe("*Mínimo de 3 caracteres");
  });

  it("should returns true when input pass a correct param", () => {
    expect(validateEmptyAndLength3("1234")).toBe(true);
  });
});

describe("Validators utils, Email", () => {
  it("should return an error with empty payload", () => {
    expect(validateEmptyAndEmail()).toBe("*Este campo é obrigatório");
  });

  it("should return an error with invalid Email", () => {
    expect(validateEmptyAndEmail("mayemail")).toBe(
      "*Este campo precisa ser um email"
    );
  });

  it("should returns true when input pass a correct Email", () => {
    expect(validateEmptyAndEmail("email@teste.com")).toBe(true);
  });
});
