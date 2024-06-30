import { css } from "@emotion/react";

export const globalStyles = css`
  /* 나눔고딕 */
  @font-face {
    font-family: 'NanumGothic';
    src: url('/font/NanumGothic.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumGothicBold';
    src: url('/font/NanumGothicBold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumGothicExtraBold';
    src: url('/font/NanumGothicExtraBold.ttf') format('truetype');
    font-weight: 800; 
    font-style: normal;
  }
  

  html {
    font-size: 10px;
  }
  * {
    font-size: 1.6rem;
    font-family: 'NanumGothic', Helvetica, sans-serif;
  }
  button {
    color: #fff;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;
  }
  input, textarea {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }

  input:focus, textarea:focus {
    border-color: #007bff;
    outline: none;
  }
`;