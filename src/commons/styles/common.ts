import { keyframes } from "@emotion/react";

export const commonBtnStyle = `
  width: auto;
  height: 4rem;
  padding: 1.2rem 2rem;
  background-color: #67794a;
  color: #fff;
  border: 0.1rem solid #6b620d;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
    transition: all .2s;

  &:hover {
    background-color: #7e925e;
  }
`;

export const errorAnimation = keyframes`
  0% {
    transform: scale(0.95);
  }
  20% {
    transform: scale(1);
  }
  40% {
    margin-left: -10px;
  }
  60% {
    margin-left: 0;
    margin-right: -20px;
  }
  80% {
    margin-right: 0;
    margin-left: -20px;
  }
  100% {
    margin: 0;
  }
`;
