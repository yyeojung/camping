import { commonBtnStyle } from "@/commons/styles/common";
import styled from "@emotion/styled";
import type { ReactNode } from "react";

interface IPropsButton {
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: ReactNode;
}

const CustomButton = styled.button`
  ${commonBtnStyle}
`;

export default function Button({
  className,
  type,
  children,
  onClick,
}: IPropsButton) {
  return (
    <CustomButton className={className} onClick={onClick} type={type}>
      {children}
    </CustomButton>
  );
}
