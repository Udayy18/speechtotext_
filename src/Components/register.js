import axios from "axios";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";


function Register() {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [name, setName] = useState(" ");

  const [flag, setFlag] = useState(false);

  const [Register, setRegister] = useState(true);

  function handleRegister(e) {
    e.preventDefault();

    console.log(email)
    axios.get('http://localhost:4000/register', {
        params: {
            email: email,
            password: password,
            name: name
        }
    }).then(res => {
        if(res.data === 'success'){
            localStorage.setItem("loggedin", 1);
            window.location.href = '/speech'
        } else {
            alert("Email already exist!!!")
        }
    });
  }

  return (
    <div>
      {Register ? (
        <form onSubmit={handleRegister}>
          <h3>Register</h3>
          <div className="form-group">
            <label>Email</label>
            <input
              type="Email"
              className="form-control"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="Password"
              className="form-control"
              placeholder="Enter password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="Name"
              className="form-control"
              placeholder="Enter name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-dark btn-lg btn-block">
            Register
          </button>

          {flag && (
            <Alert color="primary" variant="warning">
              Wrond user name or password
            </Alert>
          )}
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          
        </form>
      )}
    </div>
  );
}

export default Register;
