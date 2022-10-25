import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  SDropdownToggle,
  SCaretDown,
  SOverlay,
  SDropdown,
  SContent,
  SContentItem,
  SResetBtn,
  SCaredDownWrapper,
} from "./Dropdown.styled";
import { caretDown } from "react-icons-kit/fa/caretDown";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { useClickAway } from "react-use";
import { Divider } from "../../core/kit/divider";
import { ALL_THEMES } from "../../constants";

interface ThemeById {
  id: number;
  name: string;
}

interface Dropdown {
  items?: ThemeById[];
  setFilterId: (value: number | null) => void;
  resetReviewsHandler: () => void;
  filterId: number | null;
}

const CONRAINER_ID = "dropdown-overlay-container";

const Dropdown = ({
  items,
  setFilterId,
  resetReviewsHandler,
  filterId,
}: Dropdown) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>(ALL_THEMES);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const popoverRef = useRef(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handlerSelectedItem = (item: ThemeById) => {
    setSelectedItem(item.name);
    setFilterId(item.id);
    toggleHandler();
  };

  const resetFilter = () => {
    if (filterId) {
      setFilterId(null);
      setSelectedItem(ALL_THEMES);
      setIsOpen(false);
      resetReviewsHandler();
    }
  };

  /**
   *initialize react-popper. it handles overlays position
   */
  const { styles, attributes, update } = usePopper(
    triggerRef.current,
    popoverRef.current,
    {
      placement: `bottom`,
      modifiers: [
        { name: "flip", enabled: true },

        {
          name: "preventOverflow",
          enabled: true,
          options: {
            rootBoundary: "viewport",
            altAxis: true,
          },
        },
      ],
    },
  );

  const triggerRefOffsetWidth = triggerRef.current?.offsetWidth;
  const triggerRefOffsetHeight = triggerRef.current?.offsetHeight;

  const popoverProps = useMemo(
    () => ({
      ref: popoverRef,
      style: styles.popper,
      ...attributes.popper,
    }),
    [styles, attributes],
  );

  const toggleHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const displayedItems = useMemo(() => {
    return items?.map((el) => (
      <SContentItem
        key={el.id}
        data-testid={`dropdown-item ${el.id}`}
        onClick={() => handlerSelectedItem(el)}
        checked={el.name === selectedItem}
      >
        {el.name}
      </SContentItem>
    ));
  }, [items, selectedItem]);

  const content = useMemo(() => {
    return (
      isOpen && (
        <SContent data-testid={"dropdown-content"}>
          {displayedItems}
          <Divider />
          <SResetBtn onClick={resetFilter} data-testid={"dropdown-reset-btn"}>
            Reset themes
          </SResetBtn>
        </SContent>
      )
    );
  }, [displayedItems, isOpen, resetFilter]);

  const overlay = useMemo(
    () =>
      container &&
      ReactDOM.createPortal(
        <SOverlay width={triggerRefOffsetWidth} {...popoverProps}>
          {content}
        </SOverlay>,
        container,
      ),
    [container, content, popoverProps, triggerRefOffsetWidth],
  );

  /**
   * Close Dropdown after click away
   */
  useClickAway(popoverRef, (e) => {
    if (e.target instanceof Node) {
      if (isOpen && !triggerRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    }
  });
  /**
   * Update width and height regarding triggerRef
   */
  useEffect(() => {
    update?.();
  }, [triggerRefOffsetHeight, triggerRefOffsetWidth, update]);

  useEffect(() => {
    let containerElem = document.getElementById(CONRAINER_ID);
    if (!containerElem) {
      containerElem = document.createElement("div");
      containerElem.id = CONRAINER_ID;
      document.body.appendChild(containerElem);
    }
    setContainer(containerElem);
  }, []);

  return (
    <SDropdown>
      <SDropdownToggle
        isOpen={isOpen}
        onClick={toggleHandler}
        ref={triggerRef}
        data-testid="dropdown-header"
      >
        {selectedItem}
        <SCaredDownWrapper isOpen={isOpen}>
          <SCaretDown icon={caretDown} />
        </SCaredDownWrapper>
      </SDropdownToggle>
      {overlay}
    </SDropdown>
  );
};

export default Dropdown;
