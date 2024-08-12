import { errorAnimation } from "@/commons/styles/common";
import Button from "@/components/button";
import FormJoin from "@/components/login/formJoin";
import FormLogin from "@/components/login/formLogin";
import styled from "@emotion/styled";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const Wrap = styled.div`
  background: linear-gradient(
    to bottom right,
    rgba(107, 142, 35, 0.6),
    rgba(70, 130, 180, 0.4)
  );
  width: 100%;
  height: 100vh;
`;

const BoxWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-top: 8rem;
`;
const LoginBox = styled.div`
  display: flex;
  min-height: 70rem;
  max-width: 100rem;
  background: rgba(255, 255, 255, 0.4);
  overflow: hidden;
  border-radius: 3rem;
  box-shadow: 0 1rem 2rem 0 rgba(0, 0, 0, 0.1);

  &.active {
    animation: ${errorAnimation} 0.1s;
  }

  > div {
    width: 50%;
  }
  .left {
    background: #5db0a3;

    h2 {
      font-family: "inter";
      margin: 7rem 0 8rem 6rem;
      color: #fff;
      font-weight: 800;
      font-size: 4.8rem;
    }
    img {
      width: 100%;
    }
  }

  .right {
    position: relative;

    .link_home {
      color: #6a6a6a;
      position: absolute;
      top: 3rem;
      right: 3rem;
      display: flex;
      gap: 0.6rem;
    }
    .form {
      max-width: 30rem;
      margin: 11rem auto 0;

      h2 {
        font-family: "inter";
        font-size: 3.2rem;
        color: #6a6a6a;
      }
      .info {
        font-size: 1.4rem;
        margin-top: 1rem;
        font-weight: 700;
      }
    }
  }

  button.tab {
    position: absolute;
    bottom: 3rem;
    right: 3rem;
    background: #fff;
    border: none;
    color: #000;
    border-radius: 2rem;
    gap: 0.4rem;
    box-shadow: 0 1rem 2rem 0 rgba(0, 0, 0, 0.1);

    &:hover {
      background: rgba(93, 176, 163, 0.463);
      color: #fff;
    }
  }
`;
export default function index() {
  const [formError, setFormError] = useState<boolean>(false);
  const [tabLogin, setTabLogin] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormError(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [formError]);

  return (
    <Wrap>
      <BoxWrap>
        <LoginBox className={formError ? "active" : ""}>
          <div className="left">
            <h2>
              Welcome
              <br />
              Daily Camping!
            </h2>
            <img src="/image/login_camping.png" alt="캠핑 이미지" />
          </div>
          <div className="right">
            <Link href="/" passHref>
              <a className="link_home">
                홈 화면으로 돌아가기
                <IoIosArrowForward />
              </a>
            </Link>
            {/* 로그인/ 회원가입 탭 */}
            {tabLogin ? (
              <div className="form">
                <h2>Login</h2>
                <p className="info">아래 테스트 이메일로 로그인 가능합니다:)</p>
                <FormLogin />
              </div>
            ) : (
              <div className="form">
                <h2>Sign Up</h2>
                <p className="info">회원가입 입니다:)</p>
                <FormJoin setFormError={setFormError} />
              </div>
            )}
            <Button
              onClick={() => {
                setTabLogin((prev) => !prev);
              }}
              className="tab"
            >
              {tabLogin ? "Sign Up" : "Login"}
              <IoIosArrowForward />
            </Button>
          </div>
        </LoginBox>
      </BoxWrap>
    </Wrap>
  );
}
