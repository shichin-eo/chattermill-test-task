import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { LoginScreen } from "./LoginScreen";

// This is the function we'll be testing
async function withFetch() {
  const res = await fetch(
    "https://frontend-task.production.cloud.chattermill.xyz/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "abc", password: "dfe" }),
    },
  );
  const json = await res.json();

  return json;
}

describe("LoginScreen", () => {
  test("Failed Login", async () => {
    global.fetch = () =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            code: 401,
            message: "missing Username or Password",
          }),
      }) as any;
    const { queryByTestId, getByTestId } = render(<LoginScreen />);
    expect(queryByTestId("login-screen-root")).toBeInTheDocument();
    expect(queryByTestId("login-screen-error")).not.toBeInTheDocument();
    expect(queryByTestId("login-screen-loginbtn")).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(getByTestId("login-screen-loginbtn"));
    });
    await withFetch();
    expect(queryByTestId("login-screen-error")).toBeInTheDocument();
    expect(getByTestId("login-screen-error")).toHaveTextContent(
      "Invalid email or password",
    );
  });
  test("Save token", async () => {
    global.fetch = () =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            code: 200,
            token: "test token",
            expire: new Date("2024-10-27"),
          }),
      }) as any;
    const { queryByTestId, getByTestId } = render(<LoginScreen />);
    expect(queryByTestId("login-screen-root")).toBeInTheDocument();
    expect(queryByTestId("login-screen-error")).not.toBeInTheDocument();
    expect(queryByTestId("login-screen-loginbtn")).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(getByTestId("login-screen-loginbtn"));
    });
    await withFetch();
  });
});
