import styled from "@emotion/styled";
import type { ReactNode } from "react";

interface IPropsButton {
  className?: string;
  children: ReactNode;
}

const CustomButton = styled.button`
  width: auto;
  height: 4rem;
  padding: 1.2rem 2rem;
  background-color: #67794a;
  border: 0.1rem solid #6b620d;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #7e925e;
  }
`;

export default function Button({ className, children }: IPropsButton) {
  return <CustomButton className={className}>{children}</CustomButton>;
}
