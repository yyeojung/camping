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
