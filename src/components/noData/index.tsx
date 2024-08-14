import styled from "@emotion/styled";
import { type ReactNode } from "react";
import { FaCampground } from "react-icons/fa";

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  color: #525252;
`;

const NoDataIcon = styled(FaCampground)`
  width: 10rem;
  height: 10rem;
  fill: #ccc;
`;
export default function NoData({ children }: { children: ReactNode }) {
  return (
    <Wrap>
      <NoDataIcon />
      {children}
    </Wrap>
  );
}
