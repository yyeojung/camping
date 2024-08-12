import { commonBtnStyle } from "@/commons/styles/common";
import styled from "@emotion/styled";

const Form = styled.form`
  margin-top: 6rem;

  input {
    width: 100%;
    border-radius: 1rem;
    height: 4rem;
    margin-top: 0.6rem;
    font-size: 1.4rem;

    &.btn {
      ${commonBtnStyle}
      margin-top: 2rem;
      width: 100%;
      border-radius: 2rem;
      border: none;
      box-shadow: 0 1rem 2rem 0 rgba(0, 0, 0, 0.1);
    }
  }

  .pwd {
    margin-top: 2rem;
  }

  p {
    font-size: 1.4rem;
  }

  .error {
    margin-top: 0.4rem;
    color: #dc4f4f;
  }
`;
export default function FormLogin() {
  return (
    <Form>
      <p>Email</p>
      <input type="text" placeholder="test@email.com" />
      <p className="pwd">Password</p>
      <input type="password" placeholder="test1234" />
      <input className="btn" type="submit" value="Login" />
    </Form>
  );
}
