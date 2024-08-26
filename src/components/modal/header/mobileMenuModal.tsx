import React, { useEffect } from "react";
import { IoCloseOutline, IoSearch } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { FaCampground } from "react-icons/fa";
import styled from "@emotion/styled";
import Link from "next/link";

const MobileMenuList = styled.div<{ menuOpen: boolean }>`
  position: fixed;
  display: flex;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  opacity: ${(props) => (props.menuOpen ? "1" : "0")};
  visibility: ${(props) => (props.menuOpen ? "visible" : "hidden")};

  .menu_box {
    position: absolute;
    top: 0;
    z-index: 20;
    width: 60%;
    background: #fff;
    min-height: 100vh;
    border-left: 0.1rem solid #ccc;
    padding: 8rem 1rem 2rem;
    transition: all 0.4s;
    right: ${(props) => (props.menuOpen ? "0" : "-60%")};
  }

  ul li {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    height: 4rem;
    line-height: 4rem;
    border-radius: 1.6rem;

    a {
      font-size: 1.4rem;
      width: 100%;
      padding: 0 1.6rem;
    }

    &:not(:first-of-type) {
      margin-top: 0.4rem;
    }

    &:hover {
      background: #ebebeb;
    }
  }
`;

const CloseMenuBtn = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

export default function MobileMenuModal({
  menuOpen,
  onClick,
}: {
  menuOpen: boolean;
  onClick: () => void;
}) {
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <MobileMenuList menuOpen={menuOpen} onClick={onClick}>
      <div
        className="menu_box"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
      >
        <CloseMenuBtn onClick={onClick}>
          <IoCloseOutline />
        </CloseMenuBtn>
        <ul>
          <li onClick={onClick}>
            <Link href="/campingList" passHref>
              <a>
                <IoSearch />
                캠핑장 검색
              </a>
            </Link>
          </li>
          <li onClick={onClick}>
            <Link href="/campingReview" passHref>
              <a>
                <LuClipboardList />
                요즘 캠핑 후기
              </a>
            </Link>
          </li>
          <li onClick={onClick}>
            <Link href="/myCamping" passHref>
              <a>
                <FaCampground />내 캠핑장
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </MobileMenuList>
  );
}
