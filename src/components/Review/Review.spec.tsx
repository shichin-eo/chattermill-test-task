import React from "react";
import { render } from "@testing-library/react";
import Review from "./Review";

interface IReview {
  comment: string;
  themes: IReviewTheme[];
  created_at: string;
}

interface IReviewTheme {
  theme_id: number;
  sentiment: 0 | -1 | 1;
  name: string | null;
}

const mockReview: IReview = {
  comment: "Test comment",
  created_at: "2019-07-18T23:28:36Z",
  themes: [
    {
      theme_id: 6374,
      sentiment: 1,
      name: "General",
    },
    {
      theme_id: 6344,
      sentiment: 1,
      name: "Speed",
    },
    {
      theme_id: 6345,
      sentiment: 1,
      name: "Ease of Use",
    },
  ],
};

describe("Review", () => {
  test("Basic Review", async () => {
    const { getByTestId } = render(
      <Review
        comment={mockReview.comment}
        created_at={mockReview.created_at}
        themes={mockReview.themes}
      />,
    );

    expect(getByTestId("review-wrapper")).toBeInTheDocument();
    expect(getByTestId("review-comment")).toHaveTextContent("Test comment");
    expect(getByTestId("review-date")).toHaveTextContent("3 years ago");
    expect(getByTestId("review-date")).toHaveStyle("color: #8e899d");
  });
});
