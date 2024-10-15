import styled from "@emotion/styled";
import { responsive } from "../globalStyles";

export const Wrap = styled.div`
  h2 {
    text-align: center;
  }

  .loading_wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 2.4rem;

  &:not(:first-of-type) {
    margin-top: 1.6rem;
  }

  &:last-of-type {
    justify-content: flex-end;
    gap: 1rem;

    .cancel_btn {
      background: #f2f2f2;
      color: #8d8d8d;
      border-color: #8d8d8d;
    }
  }

  .form_title {
    min-width: 12rem;
    line-height: 4rem;
    text-align: center;
  }

  textarea {
    width: calc(100% - 18.4rem);
    background: #f2f2f2;
    border: 0.1rem solid #ccc;
    border-radius: 1rem;
    height: 30rem;

    &:focus {
      border: 0.1rem solid #67794a;
    }
  }

  textarea.title {
    height: 4rem;
    overflow: hidden;
    min-height: 4rem;
  }

  @media ${responsive.mobile} {
    flex-direction: column;
    min-width: 10rem;
    gap: 0;

    .form_title {
      text-align: left;
    }

    input,
    textarea {
      width: 100%;
    }
  }
`;
