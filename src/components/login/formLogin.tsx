import { commonBtnStyle } from "@/commons/styles/common";
import { auth } from "@/firebase/firebase";
import styled from "@emotion/styled";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useRef } from "react";

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
export default function FormLogin({
  formError,
  setFormError,
}: {
  formError: boolean;
  setFormError: (value: boolean) => void;
}) {
  const emailInput = useRef<HTMLInputElement>(null);
  const pwdInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function login(email: string, password: string) {
    try {
      const userLogin = await signInWithEmailAndPassword(auth, email, password);
      setFormError(false);
      router.back();
      return userLogin;
    } catch (error) {
      console.log(error);
      setFormError(true);
      return null;
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailInput.current?.value ?? "";
    const password = pwdInput.current?.value ?? "";
    await login(email, password);
  };
  return (
    <Form onSubmit={onSubmit}>
      <p>Email</p>
      <input
        type="email"
        ref={emailInput}
        name="email"
        placeholder="test@email.com"
      />
      <p className="pwd">Password</p>
      <input
        type="password"
        ref={pwdInput}
        name="password"
        placeholder="test1234"
      />
      {formError && <p className="error">이메일, 비밀번호를 확인해주세요.</p>}
      <input className="btn" type="submit" value="Login" />
    </Form>
  );
}
