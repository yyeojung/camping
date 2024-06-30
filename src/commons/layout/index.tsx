import { useRouter } from "next/router";
import LayoutHeader from "../header";

const HIDDEN_HEADERS = ["/"];

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();

  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);
  return (
    <>
      {!isHiddenHeader && <LayoutHeader />}
      <div>{props.children}</div>
    </>
  );
}
