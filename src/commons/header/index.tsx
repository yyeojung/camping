import { Modal } from "@/components/modal";
import { useModal } from "@/hooks/useModal";
import styled from "@emotion/styled";
import Link from "next/link";
import { useIsMobile } from "../responsive/useMediaQuery";
import { IoMenu } from "react-icons/io5";
import { responsive } from "../styles/globalStyles";
import MobileMenuModal from "@/components/modal/header/mobileMenuModal";
import { useState } from "react";

const Header = styled.header`
  position: relative;
  width: 100%;
  height: 8rem;
  border-bottom: 0.1rem solid #dbdbdb;

  @media ${responsive.mobile} {
    height: 6rem;

    .header_wrap {
      padding: 0 1.6rem;
    }
  }

  .header_wrap {
    max-width: 120rem;
    padding-left: 1rem;
    margin: auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Logo = styled.a`
  width: 12rem;
  height: 3.5rem;
  display: block;
  background: url(/image/logo.svg) center/ 100% no-repeat;

  @media ${responsive.mobile} {
    width: 8rem;
  }
`;

const Menu = styled.ul`
  li {
    width: 12rem;
    text-align: center;
    display: inline-block;
    font-weight: 700;
    cursor: pointer;
    a {
      display: inline-block;
      position: relative;
      padding: 1rem 0;

      &::before {
        display: block;
        content: "";
        clear: both;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 0.2rem;
        width: 0;
        background: #67794a;
        border-radius: 1rem;
        transition: all 0.3s;
      }

      &:hover::before {
        width: 100%;
      }
    }
  }
`;

const MobileMenu = styled.button`
  svg {
    width: 3.2rem;
    height: 3.2rem;
    stroke: #333;
  }
`;

export default function LayoutHeader() {
  const { currentModal, openModal, closeModal } = useModal();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  //  모바일 메뉴 토글 클릭이벤트
  const onClickMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // 준비중 alert
  //   const onClickAlert = () => {
  //     modalToggle();
  //   };
  return (
    <>
      <Header>
        <div className="header_wrap">
          <Link href="/" passHref>
            <Logo>
              <span className="sr_only">요즘캠핑</span>
            </Logo>
          </Link>
          {!isMobile ? (
            <Menu>
              <li
                onClick={() => {
                  openModal("review");
                }}
              >
                요즘 캠핑 후기
              </li>
              <li
                onClick={() => {
                  openModal("my");
                }}
              >
                내 캠핑장
              </li>
            </Menu>
          ) : (
            <MobileMenu onClick={onClickMenu}>
              <IoMenu />
            </MobileMenu>
          )}
          {/* 모바일메뉴 */}
          <MobileMenuModal menuOpen={menuOpen} onClick={onClickMenu} />
          {/* 후기, 내 캠핑장 alert */}
          {(currentModal === "review" || currentModal === "my") && (
            <Modal
              currentModal={currentModal}
              hide={closeModal}
              message="준비 중입니다!"
            />
          )}
        </div>
      </Header>
    </>
  );
}
