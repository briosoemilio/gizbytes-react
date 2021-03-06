import React from "react";
import { useState, useEffect, useContext } from "react";
import { Fragment } from "react";
import { Navigate } from "react-router-dom";

import Swal from "sweetalert2";
import { Container, Row, Col } from "react-grid-system";
import { Form, Button } from "react-bootstrap";
import "../App.css";

import UserContext from "../UserContext";

const Login = () => {
  //Function Code
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  function authenticate(e) {
    e.preventDefault();

    fetch("https://fathomless-beyond-35679.herokuapp.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("gumana fetch");
        if (data === false) {
          Swal.fire({
            title: "Authentication failed.",
            icon: "error",
            text: "Check your login details",
          });
        } else {
          localStorage.setItem("token", data.access);
          retrieveUserDetails(data.access);
          console.log(data);

          Swal.fire({
            title: "Login successful!",
            icon: "success",
            text: "Welcome to Gizbytes",
          });
          /*.then(redirect => {
					window.location = "/"
				})*/
        }
      });

    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    console.log(token);
    fetch("https://fathomless-beyond-35679.herokuapp.com/users/details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser({
          id: data.id,
          isAdmin: data.isAdmin,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      });
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  //Render Login Page
  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <Fragment>
      <Container>
        <Row>
          <Col sm={12}>
            <h1 className="text-center m-5" id="header">
              Sign In
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col sm={12} lg={6}>
            <Form onSubmit={(e) => authenticate(e)}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label id="form-label">Email*</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label id="form-label">Password*</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {isActive ? (
                <Button id="login-button" s className="py-2 my-4" type="submit">
                  Sign In
                </Button>
              ) : (
                <Button
                  id="login-button-inactive"
                  s
                  className="py-2 my-4"
                  type="submit"
                >
                  Sign In
                </Button>
              )}
            </Form>
          </Col>
        </Row>
        {/* <Row>
          <Col sm={12}></Col>
        </Row>
        <Row style={{ marginBottom: "10px", marginTop: "10px" }}>
          <Col sm={12}>Forgot your password?</Col>
        </Row>
        <Row style={{ marginBottom: "10px" }}>
          <Col sm={12}>Don't have an account yet?</Col>
        </Row> */}
      </Container>
    </Fragment>
  );
};

export default Login;
