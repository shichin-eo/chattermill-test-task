import React, { useMemo } from "react";

import {
  ReviewWrapper,
  ReviewComment,
  ReviewDate,
  ReviewThemes,
} from "./Review.styled";
const { getTimeDiff } = require("time-difference-js");
import { Divider } from "../../core/kit/divider";
import Sentiment from "../Sentiment";

type Sentiment = -1 | 0 | 1;

interface IReview {
  comment: string;
  themes: IReviewTheme[];
  created_at: string;
}

interface IReviewTheme {
  theme_id: number;
  sentiment: Sentiment;
  name: string | null;
}

const Review = ({ comment, created_at, themes }: IReview) => {
  const timeDiff = useMemo(() => {
    const { value, suffix } = getTimeDiff(new Date(created_at), new Date());
    return `${value} ${suffix} ago`;
  }, [created_at]);
  // TODO : replace Math.random() with generation id

  return (
    <>
      <ReviewWrapper data-testid="review-wrapper">
        <ReviewComment data-testid="review-comment">{comment}</ReviewComment>
        <ReviewThemes>
          {themes.map((theme: IReviewTheme) => (
            <Sentiment
              key={theme.theme_id * Math.random()}
              sentiment={theme.sentiment}
              name={theme.name}
            />
          ))}
        </ReviewThemes>
        <ReviewDate data-testid="review-date">{timeDiff}</ReviewDate>
      </ReviewWrapper>
      <Divider />
    </>
  );
};

export default Review;
