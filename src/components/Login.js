import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [err, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [keepStatus, setKeepStatus] = useState(false)

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const fetchData = () => {
    setError("");
    if (!username) {
      setUsernameErr(true);
      return;
    } else {
      setUsernameErr(false);
    }
    if (!password) {
      setPasswordErr(true);
      return;
    } else {
      setPasswordErr(false);
    }
    fetch("https://reqres.in/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json && json.token) {setLoginSuccess(true); setLoginData(username)}
        if (json && json.error) setError(json.error);
      });
  };
  const keepStatusHandler = (event) =>{
    setKeepStatus(event.target.checked)
  }
  const setLoginData = (val) =>{
    let d = new Date();
    let expTime = keepStatus ? 10 : 3; //If want to be kept logged in then 10 mins exp else 3 mins
    d.setTime(d.getTime() + (expTime*60*1000));
    let expires = `expires=${d.toUTCString()}`;
    document.cookie = `login=${btoa(val)};${expires};path=/`;
  }
  return (
    <>
      {loginSuccess || (document.cookie.indexOf('login')>-1) ? (
        <Redirect to={{ pathname: "/users", loginSuccess}}/>
      ) : (
        <div className="background">
           
          <div className="loginArea">
            <div className="label">Username:</div>
            <input
              name="username"
              type="text"
              className=""
              value={username}
              onChange={usernameHandler}
            />
            {usernameErr ? <div className="err">Username is required</div> : null}
            <div className="pwd">
              <div className="label">Password:</div>
              <div>
                <a className="forgot" href="/">Forgot Password?</a>
              </div>
            </div>
            <input
              name="password"
              type="password"
              className=""
              value={password}
              onChange={passwordHandler}
            />
            {passwordErr ? <div className="err">Password is required</div> : null}
            {err ? <div className="err">{err}</div> : null}
            <div className="bottomAr">
              <div className="keep">
                <input type="checkbox" className="check" onChange={keepStatusHandler} checked={keepStatus}/>
                Keep me logged in
              </div>
              <div>
                <button type="submit" className="btn" onClick={fetchData}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
