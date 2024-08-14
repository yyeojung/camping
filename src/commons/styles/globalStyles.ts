import { css } from "@emotion/react";

export const globalStyles = css`
  /* 나눔고딕 */
  @font-face {
    font-family: "NanumGothic";
    src: url("/font/NanumGothic.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "NanumGothicBold";
    src: url("/font/NanumGothicBold.ttf") format("truetype");
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: "NanumGothicExtraBold";
    src: url("/font/NanumGothicExtraBold.ttf") format("truetype");
    font-weight: 800;
    font-style: normal;
  }

  html {
    font-size: 10px;
  }
  html,
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  div,
  p,
  blockquote,
  pre,
  code,
  address,
  ul,
  ol,
  li,
  menu,
  nav,
  section,
  article,
  aside,
  dl,
  dt,
  dd,
  table,
  thead,
  tbody,
  tfoot,
  label,
  caption,
  th,
  td,
  form,
  fieldset,
  legend,
  hr,
  input,
  button,
  textarea,
  object,
  figure,
  figcaption {
    margin: 0;
    padding: 0;
  }
  * {
    font-size: 1.6rem;
    font-family: "NanumGothic", Helvetica, sans-serif;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-thumb {
    width: 0.5rem;
    background-color: #ccc;
    border-radius: 1rem;
    border: 0.3rem solid transparent;
    background-clip: padding-box;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  button {
    background: transparent;
    cursor: pointer;
    border: none;
    border-radius: 0.8rem;
    transition: background-color 0.3s ease;
  }
  input,
  textarea {
    padding: 0.8rem;
    border-radius: 0.4rem;
    border: 0.1rem solid #ccc;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }

  input:focus,
  textarea:focus {
    border-color: #007bff;
    outline: none;
  }
  a {
    color: #000;
    text-decoration: none;
  }
  ul,
  ol,
  li {
    list-style-type: none;
  }
  table {
    border-spacing: 0;
  }
  .sr_only {
    overflow: hidden;
    position: absolute;
    width: 0.1rem;
    height: 0.1rem;
    margin: -0.1rem;
    padding: 0;
    border: 0;
    clip: rect(0, 0, 0, 0);
  }
`;

export const responsive = {
  tablet: "(max-width: 1024px)",
  mobile: "(max-width: 767px)",
};
