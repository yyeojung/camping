import Button from "@/components/button";
import styled from "@emotion/styled";

const Form = styled.form`
  margin-top: 6rem;

  input {
    width: 100%;
    border-radius: 1rem;
    height: 4rem;
    margin-top: 0.6rem;
  }

  p {
    font-size: 1.4rem;
  }

  button {
    width: 100%;
    margin-top: 2rem;
  }
`;
export default function FormLogin() {
  return (
    <Form>
      <p>Email</p>
      <input type="text" />
      <p>Password</p>
      <input type="password" />
      <Button>Login</Button>
    </Form>
  );
}
