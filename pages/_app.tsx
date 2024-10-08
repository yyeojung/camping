import "normalize.css";
import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import Layout from "../src/commons/layout";
import { useEffect, useState } from "react";
import Providers from "@/contexts/providers";

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
    <Providers>
      <Global styles={globalStyles} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}
