import styled, { css } from "styled-components";
import Icon from "react-icons-kit";

interface SOverlay {
  width?: number;
}

interface SDropdownToggle {
  isOpen: boolean;
}

interface SContentItem {
  checked: boolean;
}

export const SDropdown = styled.div`
  font-family: Euclid Circular B;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: left;
`;

export const SDropdownToggle = styled.div<SDropdownToggle>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 235px;
  width: fit-content;
  user-select: none;
  height: 42px;
  border: 1px solid #d4d8e0;
  border-radius: 7px;
  padding: 0 16px;
  cursor: pointer;
  margin-bottom: 25px;

  ${({ isOpen }) =>
    isOpen
      ? css`
          border-color: #326bc5;
          box-shadow: 0 0 0 2px rgb(17 131 236 / 20%);
        `
      : ""};
`;

export const SCaretDown = styled(Icon)`
  color: #89d3db;
`;

export const SCaredDownWrapper = styled.div<SDropdownToggle>`
  transition: transform ease-in-out 0.3s;
  ${({ isOpen }) =>
    isOpen
      ? css`
          transform: rotate(180deg);
        `
      : css`
          transform: rotate(0deg);
        `};
`;

export const SOverlay = styled.div<SOverlay>`
  width: ${({ width }) => width}px;
  z-index: 9999;
`;

export const SContent = styled.ul`
  width: 100%;
  border-radius: 7px;
  margin: 2px 0;
  list-style-type: none;
  padding: 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-height: 280px;
  overflow-y: auto;
  font-family: Euclid Circular B;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: left;
  background-color: #fff;
`;

export const SContentItem = styled.li<SContentItem>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;
  user-select: none;
  cursor: pointer;
  padding: 6px 16px;
  :hover {
    background-color: #e5e5eb;
  }
  ${({ checked }) =>
    checked
      ? css`
          background-color: #e5e5eb;
        `
      : css`
          background-color: transparent;
        `}
`;

export const SResetBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  cursor: pointer;
  :hover {
    background-color: #e5e5eb;
  }
`;
