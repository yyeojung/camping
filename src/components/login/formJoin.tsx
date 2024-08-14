import { commonBtnStyle } from "@/commons/styles/common";
import { auth } from "@/firebase/firebase";
import { useModal } from "@/hooks/useModal";
import styled from "@emotion/styled";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { Modal } from "../modal";

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
export default function FormJoin({
  setFormError,
}: {
  setFormError: (value: boolean) => void;
}) {
  const emailInput = useRef<HTMLInputElement>(null);
  const pwdInput = useRef<HTMLInputElement>(null);
  const pwdConfirmInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const { currentModal, openModal } = useModal();

  const emailRegex =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  async function register(email: string, password: string) {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  }

  const getUserId = () => ({
    email: emailInput.current?.value ?? "",
    password: pwdInput.current?.value ?? "",
    passwordConfirm: pwdConfirmInput.current?.value ?? "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, passwordConfirm } = getUserId();

    if (!emailRegex.test(email)) {
      setError("이메일 형식이 올바르지 않습니다.");
      setFormError(true);
    } else if (password?.length < 8) {
      setError("비밀번호는 8자리 이상으로 입력해주세요.");
      setFormError(true);
    } else if (password.length > 0 && password !== passwordConfirm) {
      setError("비밀번호와 비밀번호 확인 값이 다릅니다.");
      setFormError(true);
    } else {
      setError("");
      setFormError(false);
      openModal("completed");
    }
  };

  const closeModal = async () => {
    const { email, password } = getUserId();
    try {
      await register(email, password);
    } catch (error) {
      console.log(error);
      setError("회원가입 중 문제가 발생했습니다.");
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <p>Email</p>
      <input
        name="email"
        type="email"
        placeholder="이메일을 입력해주세요."
        required
        ref={emailInput}
      />
      <p className="pwd">Password</p>
      <input
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        required
        ref={pwdInput}
      />
      <input
        name="passwordConfirm"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        required
        ref={pwdConfirmInput}
      />
      {error && <p className="error">{error}</p>}
      <input className="btn" type="submit" value="Sign Up" />

      {currentModal === "completed" && (
        <Modal
          currentModal={currentModal}
          hide={closeModal}
          message="회원가입이 완료되었습니다."
          subMessage="자동으로 로그인이 됩니다."
          type="info"
        />
      )}
    </Form>
  );
}
