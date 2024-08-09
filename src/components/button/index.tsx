import { commonBtnStyle } from "@/commons/styles/common";
import styled from "@emotion/styled";
import type { ReactNode } from "react";

interface IPropsButton {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

const CustomButton = styled.button`
  ${commonBtnStyle}
`;

export default function Button({ className, children, onClick }: IPropsButton) {
  return (
    <CustomButton className={className} onClick={onClick}>
      {children}
    </CustomButton>
  );
}
