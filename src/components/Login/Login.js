import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-store";
import Input from "../UI/Input";

const emailReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.includes("@"),
    };
  }

  if (action.type === "INPUT_BLUR") {
    return {
      value: prevState.value,
      isValid: prevState.value.includes("@"),
    };
  }

  return {
    value: "",
    isValid: false,
  };
};

const passwordReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.trim().length > 7,
    };
  }

  if (action.type === "INPUT_BLUR") {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 7,
    };
  }

  return {
    value: "",
    isValid: false,
  };
};

const Login = () => {
  const ctx = useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailState] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });

  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  const { value: password, isValid: passwordIsValid } = passwordState;
  const { isValid: emailIsValid, value: email } = emailState;

  useEffect(() => {
    setFormIsValid(emailIsValid && passwordIsValid);
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmailState({
      type: "USER_INPUT",
      value: event.target.value,
    });

    setFormIsValid(
      event.target.value.includes("@") && password.trim().length > 7
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordState({
      type: "USER_INPUT",
      value: event.target.value,
    });

    setFormIsValid(
      event.target.value.trim().length > 7 && emailState.value.includes("@")
    );
  };

  const validateEmailHandler = () => {
    dispatchEmailState({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPasswordState({
      type: "INPUT_BLUR",
      password: password.trim().length > 7,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, password);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <Input
          isValid={emailIsValid}
          value={email}
          id="email"
          changeHandler={emailChangeHandler}
          validateHandler={validateEmailHandler}
          label="Email"
        />

        <Input
          type="password"
          id="password"
          value={password}
          changeHandler={passwordChangeHandler}
          validateHandler={validatePasswordHandler}
          label="Пароль"
        />
        
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
