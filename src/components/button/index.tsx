import styled from "@emotion/styled";
import type { ReactNode } from "react";

interface IPropsButton {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

const CustomButton = styled.button`
  width: auto;
  height: 4rem;
  padding: 1.2rem 2rem;
  background-color: #67794a;
  color: #fff;
  border: 0.1rem solid #6b620d;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #7e925e;
  }
`;

export default function Button({ className, children, onClick }: IPropsButton) {
  return (
    <CustomButton className={className} onClick={onClick}>
      {children}
    </CustomButton>
  );
}
