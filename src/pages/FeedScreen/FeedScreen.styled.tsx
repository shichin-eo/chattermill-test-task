import styled from "styled-components";

export const FeedScreenRoot = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 60%;
  margin: auto;
`;

export const FeedScreenHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 32px;
`;

export const SWrapperBtn = styled.div`
  display: flex;
  width: 100px;
  & > button {
    width: 100%;
  }
`;

export const FeedScreenFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
`;
