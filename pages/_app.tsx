import "normalize.css";
import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import Layout from "../src/commons/layout";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <Layout>
        <Component />
      </Layout>
    </>
  );
}
