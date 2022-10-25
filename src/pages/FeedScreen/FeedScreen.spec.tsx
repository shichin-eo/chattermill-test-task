import { render, fireEvent } from "@testing-library/react";
import { FeedScreen } from "./FeedScreen";
import { MemoryRouter } from "react-router-dom";

import React from "react";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("FeedScreen", () => {
  test("render FeedScreen", async () => {
    const { queryByTestId, getByTestId } = render(
      <MemoryRouter>
        <FeedScreen />
      </MemoryRouter>,
    );

    expect(queryByTestId("feed-screen-root")).toBeInTheDocument();
    expect(queryByTestId("dropdown-header")).toBeInTheDocument();
    expect(queryByTestId("feed-screen-header")).toBeInTheDocument();
    expect(queryByTestId("feed-screen-logout-btn")).toBeInTheDocument();
    expect(queryByTestId("feed-screen-footer")).toBeInTheDocument();
    expect(queryByTestId("feed-screen-loadmore")).toBeInTheDocument();

    fireEvent.click(getByTestId("feed-screen-logout-btn"));
    expect(mockHistoryPush).toHaveBeenCalledWith("/login");
  });
});
