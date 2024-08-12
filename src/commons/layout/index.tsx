import { useRouter } from "next/router";
import LayoutHeader from "../header";
import styled from "@emotion/styled";

interface ILayoutProps {
  children: JSX.Element;
}

const Guide = styled.div`
  max-width: 120rem;
  margin: auto;
  padding: 8rem 0;
  @media (max-width: 1200px) {
    padding: 0 1.6rem;
  }
`;
export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();

  const isHome = router.pathname === "/";
  const isLogin = router.pathname === "/login";

  return (
    <>
      {isHome ? (
        <>{props.children}</>
      ) : isLogin ? (
        <>
          <LayoutHeader className="is_login" />
          <>{props.children}</>
        </>
      ) : (
        <>
          <LayoutHeader />
          <Guide>{props.children}</Guide>
        </>
      )}
    </>
  );
}
