import "normalize.css";
import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import Layout from "../src/commons/layout";
import { CampingProvider } from "@/contexts/campingContext";
import { ImageProvider } from "@/contexts/imageContext";
import { SelectedProvider } from "@/contexts/selectedContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CampingProvider>
      <SelectedProvider>
        <ImageProvider>
          <Global styles={globalStyles} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ImageProvider>
      </SelectedProvider>
    </CampingProvider>
  );
}
