import styled from "styled-components";

export const Input = styled.input`
  margin: 0;
  padding: 11px 16px 10px;
  border: none;
  outline: none;
  font-family: "Open Sans", Arial, sans-serif;
  font-size: 14px;
  line-height: 21px;
  color: #1c0a36;
  border-radius: 7px;
  box-shadow: inset 0 0 0 1px #dde1eb;

  &:hover {
    box-shadow: inset 0 0 0 1px #d4d8e0;
  }

  &:focus {
    box-shadow: inset 0 0 0 1px #2a65c3;
    outline: none;
  }

  &::placeholder {
    color: #b3afc0;
  }
`;
