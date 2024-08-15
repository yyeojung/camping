import styled from "@emotion/styled";
import { type ReactNode } from "react";

const Title = styled.div`
  margin-top: 6.4rem;
  h2 {
    font-size: 2.4rem;
  }
`;
export default function SubTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <Title className={className}>{children}</Title>;
}
