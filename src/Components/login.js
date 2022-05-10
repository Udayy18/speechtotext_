import axios from "axios";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";


function Login() {
  const [emaillog, setEmaillog] = useState(" ");
  const [passwordlog, setPasswordlog] = useState(" ");

  const [flag, setFlag] = useState(false);

  const [login, setlogin] = useState(true);

  function handleLogin(e) {
    e.preventDefault();
    localStorage.setItem("loggedin", 0);
    console.log(emaillog)
    axios.get('http://localhost:4000', {
        params: {
            email: emaillog,
            password: passwordlog
        }
    }).then(res => {
        if(res.data === 'success'){
            localStorage.setItem("loggedin", 1);
            window.location.href = '/speech'
        } else {
            alert("Wrong email or passsword!!!")
        }
    });
  }

  return (
    <div>
      {login ? (
        <form onSubmit={handleLogin}>
          <h3>LogIn</h3>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(event) => setEmaillog(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(event) => setPasswordlog(event.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-dark btn-lg btn-block">
            Login
          </button>
          <a type="Register" className="btn btn-dark btn-lg btn-block" href="/register">
            New user Register
          </a>

          {flag && (
            <Alert color="primary" variant="warning">
              Wrong user name or password
            </Alert>
          )}
        </form>
      ) : (
        <div/>
      )}
    </div>
  );
}

export default Login;
