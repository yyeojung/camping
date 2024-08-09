import "normalize.css";
import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import Layout from "../src/commons/layout";
import { ImageProvider } from "@/contexts/imageContext";
import { SelectedProvider } from "@/contexts/selectedContext";
import { useEffect, useState } from "react";
// import firebase from "../src/firebase/firebase"

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  // 서버사이드 렌더링 시 콘솔 에러 삭제 (html 불일치)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    // <CampingProvider> 캠핑 검색목록에서 클릭하는 1개의 캠핑장 정보만 넘기면 되서 삭제
    <SelectedProvider>
      <ImageProvider>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ImageProvider>
    </SelectedProvider>
    // </CampingProvider>
  );
}
