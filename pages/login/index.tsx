import FormJoin from "@/components/login/formJoin";
import styled from "@emotion/styled";
import Link from "next/link";

const Wrap = styled.div`
  background: linear-gradient(
    to bottom right,
    rgba(107, 142, 35, 0.6),
    rgba(70, 130, 180, 0.4)
  );
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  display: flex;
  min-height: 70rem;
  max-width: 100rem;
  background: rgba(255, 255, 255, 0.4);
  overflow: hidden;
  border-radius: 3rem;
  box-shadow: 0 1rem 2rem 0 rgba(0, 0, 0, 0.1);

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

    .form {
      max-width: 30rem;
      margin: 11rem auto 0;
      h2 {
        font-family: "inter";
        font-size: 3.2rem;
        color: #6a6a6a;
      }
    }
  }

  a {
    position: absolute;

    &.transfer {
      background: #fff;
      box-shadow: 0 1rem 2rem 0 rgba(0, 0, 0, 0.1);
    }
  }
`;
export default function index() {
  return (
    <Wrap>
      <LoginBox>
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
            <a className="home">홈 화면으로 돌아가기</a>
          </Link>
          <div className="form">
            <h2>Login</h2>
            <p>아래 이메일로 로그인 부탁드립니다:)</p>
            <FormJoin />
            {/* <FormLogin /> */}
          </div>
        </div>
      </LoginBox>
    </Wrap>
  );
}
