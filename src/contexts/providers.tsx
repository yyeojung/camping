import { type ReactNode } from "react";
import { AuthProvider } from "./authContext";
import { SelectedProvider } from "./selectedContext";
import { ImageProvider } from "./imageContext";

// context 여러개라서 옮김
export default function Providers({ children }: { children: ReactNode }) {
  return (
    // <CampingProvider> 캠핑 검색목록에서 클릭하는 1개의 캠핑장 정보만 넘기면 되서 삭제
    <AuthProvider>
      <SelectedProvider>
        <ImageProvider>{children}</ImageProvider>
      </SelectedProvider>
    </AuthProvider>
  );
}
