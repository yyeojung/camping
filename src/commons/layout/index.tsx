import { useRouter } from "next/router";
import LayoutHeader from "../header";
import styled from "@emotion/styled";

const HIDDEN_HEADERS = ["/"];

interface ILayoutProps {
  children: JSX.Element;
}

const Guide = styled.div`
  max-width: 120rem;
  margin: auto;
  @media (max-width: 1200px) {
    padding: 0 1.6rem;
  }
`;
export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();

  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);
  return (
    <>
      {!isHiddenHeader && <LayoutHeader />}
      {!isHiddenHeader ? (
        <Guide>{props.children}</Guide>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
}
