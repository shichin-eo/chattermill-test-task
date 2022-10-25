import React, { useMemo } from "react";
import { NegativeIcon, PositiveIcon } from "../../assets";
import { SSentiment } from "./Sentiment.styled";

interface ISentiment {
  sentiment: number;
  name: string | null;
}

const Sentiment = ({ sentiment, name }: ISentiment) => {
  const isNegative = sentiment === -1;
  const icon = useMemo(() => {
    switch (sentiment) {
      case -1:
        return <NegativeIcon />;
      case 1:
        return <PositiveIcon />;
      default:
        return null;
    }
  }, [sentiment]);
  return (
    <SSentiment isNegative={isNegative} data-testid="sentiment-wrapper">
      {icon}
      {name}
    </SSentiment>
  );
};

export default Sentiment;
