import styled from "@emotion/styled";
import { type ReactNode } from "react";

const Contents = styled.div`
  display: flex;
  align-items: center;
  min-height: calc(100vh - 26rem);
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
`;
export default function SubContents({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <Contents className={className}>{children}</Contents>;
}
