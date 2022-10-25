import React, { useState } from "react";
import { Logo } from "../../core/kit/logo";
import { Label } from "../../core/kit/label";
import { Input } from "../../core/kit/input";
import { Heading } from "../../core/kit/heading";
import { Form, FormRow } from "../../core/kit/form";
import { PrimaryButton } from "../../core/kit/button";
import {
  LoginScreenRoot,
  SEyeIcon,
  InputContainer,
  SErrorWrapper,
} from "./LoginScreen.styled";
import { eye } from "react-icons-kit/icomoon/eye";
import { eyeBlocked } from "react-icons-kit/icomoon/eyeBlocked";
import Icon from "react-icons-kit";
import { useHistory } from "react-router-dom";
import { useToken } from "../../hooks";
import { API_APP } from "../../constants";

interface User {
  username: string;
  password: string;
}

async function getToken(creds: User) {
  return fetch(`${API_APP.BASE_URL}${API_APP.LOGIN_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  }).then((data) => data.json());
}

export const LoginScreen: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { setToken } = useToken();

  const history = useHistory();

  const handleToggle = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await getToken({
        username: login,
        password,
      });
      if (response.code === 200) {
        localStorage.setItem("expire", JSON.stringify(response.expire));
        setToken(response.token);
        history.push("/feed");
      } else if (response.code === 401) {
        setError("Invalid email or password");
      } else if (response.code === 500) {
        setError("Internal error");
      } else {
        setError("Unknown error");
      }
    } catch (err) {
      if (typeof err === "string") {
        setError(err.toUpperCase());
      } else if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <LoginScreenRoot data-testid="login-screen-root">
      <Logo />
      <section>
        <Heading>Log in</Heading>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <FormRow>
            <Label htmlFor={"login"}>Email</Label>
            <Input
              type={"text"}
              placeholder={"login"}
              id={"login"}
              onChange={(e) => setLogin(e.target.value)}
              value={login}
            />
          </FormRow>
          <FormRow>
            <Label htmlFor={"password"}>Password</Label>
            <InputContainer>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={"password"}
                id={"password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <SEyeIcon onClick={(e) => handleToggle(e)}>
                <Icon icon={showPassword ? eyeBlocked : eye} />
              </SEyeIcon>
            </InputContainer>
            {error && (
              <SErrorWrapper data-testid="login-screen-error">
                {error}
              </SErrorWrapper>
            )}
          </FormRow>
          <FormRow>
            <PrimaryButton type={"submit"} data-testid="login-screen-loginbtn">
              Log in
            </PrimaryButton>
          </FormRow>
        </Form>
      </section>
    </LoginScreenRoot>
  );
};
