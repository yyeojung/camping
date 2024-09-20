import { responsive } from "@/commons/styles/globalStyles";
import styled from "@emotion/styled";
import { type ReactNode } from "react";

const Form = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 3rem;
  border: 0.1rem solid #ccc;
  padding: 4rem 8rem;
  margin-top: 4rem;

  .required {
    color: #eb3737;
    font-weight: 800;
    padding-left: 0.6rem;
  }

  @media ${responsive.mobile} {
    padding: 4rem 1.6rem;
  }
`;

export default function ReviewForm({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <Form className={className}>{children}</Form>;
}
