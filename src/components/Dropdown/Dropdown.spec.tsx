import React, { useState } from "react";
import { fireEvent, render } from "@testing-library/react";
import Dropdown from "./Dropdown";

const activeThemes = [
  {
    id: 1,
    name: "Theme1",
  },
  {
    id: 2,
    name: "Theme2",
  },
  { id: 3, name: "Theme3" },
  { id: 4, name: "Theme4" },
];

const DropdownComponent = () => {
  const [filterId, setFilterId] = useState<number | null>(null);

  const resetReviewsHandler = () => {};

  return (
    <Dropdown
      items={activeThemes}
      setFilterId={setFilterId}
      resetReviewsHandler={resetReviewsHandler}
      filterId={filterId}
    />
  );
};

describe("Dropdown", () => {
  test("Basic dropdown", async () => {
    const { getByTestId, queryByTestId } = render(<DropdownComponent />);
    expect(getByTestId("dropdown-header")).toHaveTextContent("All themes");
    expect(queryByTestId("dropdown-content")).not.toBeInTheDocument();
    expect(queryByTestId("dropdown-item 1")).not.toBeInTheDocument();

    fireEvent.click(getByTestId("dropdown-header"));
    expect(queryByTestId("dropdown-content")).toBeInTheDocument();
    expect(queryByTestId("dropdown-item 1")).toBeInTheDocument();
    expect(getByTestId("dropdown-item 2")).toHaveTextContent("Theme2");

    fireEvent.click(getByTestId("dropdown-item 2"));
    expect(queryByTestId("dropdown-content")).not.toBeInTheDocument();
    expect(getByTestId("dropdown-header")).toHaveTextContent("Theme2");
    expect(queryByTestId("dropdown-reset-btn")).not.toBeInTheDocument();
    fireEvent.click(getByTestId("dropdown-header"));
    expect(queryByTestId("dropdown-reset-btn")).toBeInTheDocument();

    fireEvent.click(getByTestId("dropdown-reset-btn"));
    expect(queryByTestId("dropdown-reset-btn")).not.toBeInTheDocument();
    expect(getByTestId("dropdown-header")).toHaveTextContent("All themes");
  });
});
