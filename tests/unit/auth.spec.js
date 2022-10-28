/* eslint-disable no-undef */
import mockAxios from "axios";
import AuthService from "../../src/services/auth";

jest.mock("axios");

describe("Services auth, AuthService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a token when user log-in", async () => {
    const token = "123.123.123";

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } });
    });

    const response = await AuthService(mockAxios).login({
      email: "teste@email.com",
      password: "123",
    });

    expect(response.data).toHaveProperty("token");
    expect(response).toMatchSnapshot();
  });

  it("should return an user when register", async () => {
    const user = {
      email: "teste@email.com",
      name: "Ana",
      password: "123",
    };

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: user });
    });

    const response = await AuthService(mockAxios).register(user);

    expect(response.data).toHaveProperty("email");
    expect(response.data).toHaveProperty("name");
    expect(response.data).toHaveProperty("password");
    expect(response).toMatchSnapshot();
  });

  it("should return return an error when there's no network", async () => {
    const error = { status: 404, statusText: "Not Found" };

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: error });
    });

    const response = await AuthService(mockAxios).login({
      email: "teste@email.com",
      password: "123",
    });

    expect(response.errors).toHaveProperty("status");
    expect(response.errors).toHaveProperty("statusText");
  });
});
