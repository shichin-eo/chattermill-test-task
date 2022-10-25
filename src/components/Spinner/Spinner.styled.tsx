import styled, { keyframes } from "styled-components";

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const SWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SLoader = styled.div`
  display: block;
  border: 2px solid;
  border-top: 2px solid;
  border-radius: 50%;
  animation: ${spin} 1s infinite;
  height: 32px;
  width: 32px;
  border-color: #326bc5;
  border-top-color: #e5e5eb;
`;
