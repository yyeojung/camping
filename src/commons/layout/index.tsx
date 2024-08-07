import { useRouter } from "next/router";
import LayoutHeader from "../header";
import styled from "@emotion/styled";

interface ILayoutProps {
  children: JSX.Element;
}

const Guide = styled.div`
  max-width: 120rem;
  margin: auto;
  padding-bottom: 8rem;
  @media (max-width: 1200px) {
    padding: 0 1.6rem;
  }
`;
export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();

  const isHiddenHeader = router.pathname === "/";
  return (
    <>
      {!isHiddenHeader ? (
        <>
          <LayoutHeader />
          <Guide>{props.children}</Guide>
        </>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
}
