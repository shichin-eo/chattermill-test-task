import styled from "styled-components";

export const LoginScreenRoot = styled.div`
  min-height: 100vh;
  max-width: 336px;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 48px 0 96px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 24px 0;
  align-items: center;
`;

export const InputContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
`;

export const SEyeIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translate(-16px, -50%);
  cursor: pointer;
  color: #89d3db;
`;

export const SErrorWrapper = styled.span`
  font-family: Euclid Circular B;
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0px;
  text-align: left;
  color: #c41e19;
  margin-top: 10px;
  user-select: none;
`;
