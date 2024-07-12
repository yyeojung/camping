import styled from "@emotion/styled";
import Link from "next/link";

const Header = styled.header`
  width: 100%;
  height: 8rem;
  border-bottom: 0.1rem solid #4a4a4a;

  .header_wrap {
    width: 120rem;
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

const Menu = styled.div``;

export default function LayoutHeader() {
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
            <Link href="/review">요즘 캠핑 후기</Link>
            <Link href="/board">내 캠핑장</Link>
          </Menu>
        </div>
      </Header>
    </>
  );
}
