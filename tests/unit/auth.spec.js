import mockAxios from "axios";
import AuthService from "../../src/services/auth";

jest.mock("axios");

describe("AuthService", () => {
  it("should return a token when user login", async () => {
    const token = "123.123.123";
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } });
    });

    const response = await AuthService(mockAxios).login({
      email: "teste@email.com",
      password: "123",
    });
    expect(response.data).toHaveProperty("token");
    expect(response).toMatchSnapshot()
  });
});
