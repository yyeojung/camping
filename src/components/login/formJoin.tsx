import { commonBtnStyle } from "@/commons/styles/common";
import { app } from "@/firebase/firebase";
import styled from "@emotion/styled";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

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
    color: #dc4f4f;
  }
`;
export default function FormJoin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);

    if (name === "passwordConfirm") setPasswordConfirm(value);
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

    if (emailRegex.test(email)) {
      setError(
        `이메일 형식이 올바르지 않습니다. 영문 대소문자, 숫자와 특수기호(_),(-),(@)만 사용 가능합니다.`,
      );
    } else {
      setError("");
    }
    console.log(emailRegex.test(email));

    if (password?.length < 8) {
      setError("비밀번호는 8자리 이상으로 입력해주세요.");
    } else if (password.length > 0 && password !== passwordConfirm) {
      setError("비밀번호와 비밀번호 확인 값이 다릅니다.");
    } else {
      setError("");
    }

    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      alert("회원가입에 성공하였습니다.");
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <p>Email</p>
      <input
        name="email"
        type="text"
        placeholder="이메일을 입력해주세요."
        required
        value={email}
        onChange={onChange}
      />
      <p className="pwd">Password</p>
      <input
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        required
        value={password}
        onChange={onChange}
      />
      <input
        className="pwd"
        name="passwordConfirm"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        required
        value={passwordConfirm}
        onChange={onChange}
      />
      {error && <p className="error">{error}</p>}
      <input className="btn" type="submit" value="Sign Up" />
    </Form>
  );
}
