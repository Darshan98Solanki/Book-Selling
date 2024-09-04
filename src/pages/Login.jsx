import React from "react";
import "../styles/login.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `../register`;
    navigate(path);
  };
  const validateSchema = Yup.object({
    email: Yup.string().email().required("Email address is required"),
    password: Yup.string().required("Password is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validateSchema,
      onSubmit: (values, action) => {
        // console.log(values);
        action.resetForm();

        const requestData = {
          email: values.email,
          password: values.password,
        };

        // call API to post submit form
        authService.login(requestData).then((res)=> {
          navigate("");
          toast.success("Login Successfully");
        }).catch((err)=> {  
          console.log("Error");
        });
      },
    });

  return (
    <>
      <Container fluid className="container-register">
        <h3 className="mt-5 set-heading mb-3">Login or Create an Account</h3>
        <hr className="text-danger set-login-hr"></hr>
        <Row className="mt-5">
          <Col xs={4}>
            <h5>New Cutomer</h5>
            <hr />
            <p className="text-muted">Registration free and easy</p>
            <ul>
              <li>Faster checkout</li>
              <li>Save multiple shipping address</li>
              <li>View and track orders and more</li>
            </ul>
            <Button variant="danger create-btn" onClick={routeChange} size="lg">
              Create an Account
            </Button>
          </Col>

          <Col xs={5}>
            <h5>Registered Customer</h5>
            <Form onSubmit={handleSubmit}>
              <hr />
              <p className="text-muted">
                If you have an account with us, please login
              </p>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>
                  Email address <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="text-danger">{errors.email}</p>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>
                  Password <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <p className="text-danger">{errors.password}</p>
                ) : null}
              </Form.Group>

              <Button variant="danger login-btn" size="lg" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
