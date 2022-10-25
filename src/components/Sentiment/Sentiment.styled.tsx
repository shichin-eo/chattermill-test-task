import styled, { css } from "styled-components";

interface SSentiment {
  isNegative: boolean;
}

export const SSentiment = styled.div<SSentiment>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: fit-content;
  border-radius: 7px;
  outline: none;
  padding: 0px 10px;
  color: #8a849c;
  margin-right: 6px;
  font-family: Euclid Circular B;
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0px;
  text-align: left;

  ${({ isNegative }) =>
    isNegative
      ? css`
          background: linear-gradient(
              180deg,
              rgba(238, 48, 116, 0.08) 3.66%,
              rgba(238, 48, 116, 0.1) 96.97%
            ),
            #ffffff;
        `
      : css`
          background: linear-gradient(
              180deg,
              rgba(37, 177, 73, 0.1) 0%,
              rgba(37, 177, 73, 0.12) 92.42%
            ),
            #ffffff;
        `};
`;
