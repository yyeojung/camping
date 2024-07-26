import { Modal } from "@/components/modal";
import { useModal } from "@/hooks/useModal";
import styled from "@emotion/styled";
import Link from "next/link";

const Header = styled.header`
  width: 100%;
  height: 8rem;
  border-bottom: 0.1rem solid #dbdbdb;

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
  width: 12.5rem;
  height: 3.5rem;
  display: block;
  background: url(/image/logo.svg);
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

export default function LayoutHeader() {
  const { isShowing, modalToggle } = useModal();
  const onClickAlert = () => {
    modalToggle();
  };
  return (
    <>
      <Header>
        <div className="header_wrap">
          <Link href="/" passHref>
            <Logo>
              <span className="sr_only">요즘캠핑</span>
            </Logo>
          </Link>
          <Menu>
            <li onClick={onClickAlert}>요즘 캠핑 후기</li>
            <li onClick={onClickAlert}>내 캠핑장</li>
          </Menu>
          {/* 후기, 내 캠핑장 alert */}
          <Modal
            isShowing={isShowing}
            hide={modalToggle}
            message="준비 중입니다!"
          />
        </div>
      </Header>
    </>
  );
}
