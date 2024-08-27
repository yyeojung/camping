import styled from "@emotion/styled";
import Link from "next/link";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { IoMenu } from "react-icons/io5";
import { responsive } from "../styles/globalStyles";
import MobileMenuModal from "@/components/modal/header/mobileMenuModal";
import { useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { useModal } from "@/hooks/useModal";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { Modal } from "@/components/modal";
import { useRouter } from "next/router";

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 8rem;
  background: #fff;
  z-index: 10;
  border-bottom: 0.1rem solid #dbdbdb;

  &.is_login {
    background: transparent;

    ul {
      display: none;
    }
  }

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

  /* 로그인 스타일 */
  .login {
    a,
    button {
      background: #dae3ca;
      border: 0.1rem solid #9da58d;
      padding: 0.8rem 1.2rem;
      border-radius: 2rem;
      font-size: 1.4rem;
      font-weight: 400;

      &:before {
        display: none;
      }
      &:hover {
        background: #bbc6a5;
      }
    }
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
    min-width: 10rem;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    padding: 0 1rem;
    font-weight: 700;

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

const MobileHeader = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;

  li:not(.login) {
    height: 3.2rem;
  }

  li.login {
    a,
    button {
      font-size: 1.2rem;
      height: 2.8rem;
    }
  }
`;
const MobileMenuBtn = styled.button`
  svg {
    width: 3.2rem;
    height: 3.2rem;
    stroke: #333;
  }
`;

export default function LayoutHeader({ className }: { className?: string }) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { user } = useAuth();
  const { currentModal, openModal, closeModal } = useModal();
  const router = useRouter();

  // 로그아웃 클릭 이벤트
  const onClickLogout = async () => {
    try {
      await signOut(auth);
      openModal("logout");
    } catch (error) {
      console.log(error);
    }
  };

  //  모바일 메뉴 토글 클릭이벤트
  const onClickMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  //   내캠핑장 로그인 모달 닫고 login으로 이동
  const closeMyModal = () => {
    router.back();
    setTimeout(() => {
      void router.push("/login");
    }, 100);
  };

  return (
    <>
      <Header className={className}>
        <div className="header_wrap">
          <Link href="/" passHref>
            <Logo>
              <span className="sr_only">daily camping</span>
            </Logo>
          </Link>
          {!isMobile ? (
            <Menu>
              <li>
                <Link href="/campingList?region=전체&subRegion=" passHref>
                  캠핑장 검색
                </Link>
              </li>
              <li>
                <Link href="/campingReview" passHref>
                  요즘 캠핑 후기
                </Link>
              </li>
              <li>
                {user ? (
                  <Link href="/myCamping" passHref>
                    내 캠핑장
                  </Link>
                ) : (
                  <a
                    onClick={() => {
                      openModal("myCampingLogin");
                    }}
                  >
                    내 캠핑장
                  </a>
                )}
              </li>
              <li className="login">
                {!user ? (
                  <Link href="/login" passHref>
                    로그인
                  </Link>
                ) : (
                  <button onClick={onClickLogout}>로그아웃</button>
                )}
              </li>
            </Menu>
          ) : (
            <MobileHeader>
              <li className="login">
                {!user ? (
                  <Link href="/login" passHref>
                    로그인
                  </Link>
                ) : (
                  <button onClick={onClickLogout}>로그아웃</button>
                )}
              </li>
              <li>
                <MobileMenuBtn onClick={onClickMenu}>
                  <IoMenu />
                </MobileMenuBtn>
              </li>
            </MobileHeader>
          )}
          {/* 모바일메뉴 */}
          {isMobile && (
            <MobileMenuModal menuOpen={menuOpen} onClick={onClickMenu} />
          )}
          {/* 로그아웃 alert */}
          {currentModal === "logout" && (
            <Modal
              currentModal={currentModal}
              hide={closeModal}
              message="로그아웃 되었습니다!"
            />
          )}

          {/* 내캠핑장 로그인 alert */}
          {currentModal === "myCampingLogin" && (
            <Modal
              currentModal={currentModal}
              hide={closeMyModal}
              message="로그인 후 이용 가능합니다!"
            />
          )}
        </div>
      </Header>
    </>
  );
}
