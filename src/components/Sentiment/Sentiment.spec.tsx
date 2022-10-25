import React from "react";
import { render } from "@testing-library/react";
import Sentiment from "./Sentiment";

const mockSentiments = [
  {
    sentiment: -1,
    name: "Theme1",
  },
  {
    sentiment: 0,
    name: "Theme2",
  },
  {
    sentiment: 1,
    name: "Theme3",
  },
];

describe("Sentiment", () => {
  test("Negative sentiment", async () => {
    const { sentiment, name } = mockSentiments[0];
    const { getByTestId, container, queryByTestId, queryByText } = render(
      <Sentiment sentiment={sentiment} name={name} />,
    );
    const icon = container.querySelector("svg");
    expect(getByTestId("sentiment-wrapper")).toBeInTheDocument();
    expect(icon).toBeInTheDocument;
    expect(queryByTestId("negative-icon")).toBeInTheDocument();
    expect(queryByTestId("positive-icon")).not.toBeInTheDocument();
    expect(queryByText("Theme1")).toBeInTheDocument();
    expect(queryByText("Theme2")).not.toBeInTheDocument();
  });
  test("Neutral sentiment", async () => {
    const { sentiment, name } = mockSentiments[1];
    const { getByTestId, container, queryByTestId, queryByText } = render(
      <Sentiment sentiment={sentiment} name={name} />,
    );
    const icon = container.querySelector("svg");
    expect(getByTestId("sentiment-wrapper")).toBeInTheDocument();
    expect(icon).not.toBeInTheDocument;
    expect(queryByTestId("negative-icon")).not.toBeInTheDocument();
    expect(queryByTestId("positive-icon")).not.toBeInTheDocument();
    expect(queryByText("Theme1")).not.toBeInTheDocument();
    expect(queryByText("Theme2")).toBeInTheDocument();
  });
  test("Positive sentiment", async () => {
    const { sentiment, name } = mockSentiments[2];
    const { getByTestId, container, queryByTestId, queryByText } = render(
      <Sentiment sentiment={sentiment} name={name} />,
    );
    const icon = container.querySelector("svg");
    expect(getByTestId("sentiment-wrapper")).toBeInTheDocument();
    expect(icon).toBeInTheDocument;
    expect(queryByTestId("negative-icon")).not.toBeInTheDocument();
    expect(queryByTestId("positive-icon")).toBeInTheDocument();
    expect(queryByText("Theme1")).not.toBeInTheDocument();
    expect(queryByText("Theme3")).toBeInTheDocument();
  });
});
