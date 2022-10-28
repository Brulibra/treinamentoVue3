/* eslint-disable no-undef */
import useStore from "@/hooks/useStore";
import {
  setCurrentUser,
  resetUserStore,
  setApiKey,
  cleanCurrentUser,
} from "../../src/store/user";

describe("Store user, setCurrentUser", () => {
  let store = useStore();
  beforeEach(() => {
    store = useStore();
  });

  afterEach(() => {
    resetUserStore();
  });

  it("should set the current user", () => {
    setCurrentUser({ name: "Ana" });

    expect(store.User.currentUser.name).toBe("Ana");
  });

  it("should set apy_key on current user", () => {
    setApiKey("123");

    expect(store.User.currentUser.apiKey).toBe("123");
  });

  it("should clean current user", () => {
    setCurrentUser({ name: "Ana" });

    expect(store.User.currentUser.name).toBe("Ana");
    cleanCurrentUser();

    expect(store.User.currentUser.name).toBeFalsy()
  });
});
