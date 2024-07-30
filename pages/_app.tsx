import "normalize.css";
import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import Layout from "../src/commons/layout";
import { CampingProvider } from "@/contexts/campingContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CampingProvider>
      <Global styles={globalStyles} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CampingProvider>
  );
}
