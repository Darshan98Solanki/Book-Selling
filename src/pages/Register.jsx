import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import authService from "../services/auth.service";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
function Register() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    roleId: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();

  const validateSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("First name required"),
    lastName: Yup.string().min(2).max(25).required("Last name requires"),
    email: Yup.string().email().required("Email required"),
    roleId: Yup.string().required("roleId required"),
    password: Yup.string().min(6).required("Password required"),
    confirmPassword: Yup.string()
      .required("Confirm Password required")
      .oneOf([Yup.ref("password"), null], "Confirm Password Must Be Same"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validateSchema,
      onSubmit: (values, action) => {
        delete values.confirmPassword;
        console.log(values);
        action.resetForm();
        authService.create(values).then((res)=>{
            navigate("/login");
            toast.success("Successfully registerd");
        }).catch((err) => {
          console.log("error registering");
        })
      },
    });

  console.log(errors);

  return (
    <>
      <Container fluid className="container-register">
        <h3 className="mt-5 set-heading mb-3">Login or Create an Account</h3>
        <h5 className="mt-5">Personal Information</h5>
        <hr className="set-hr"></hr>
        <p className="set-p">
          Please enter the following information to create your account
        </p>
        <Form className="w-75 mt-4" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="firstName">
              <Form.Label>
                First Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="false"
              />
              {errors.firstName && touched.firstName ? (
                <p className="text-danger">{errors.firstName}</p>
              ) : null}
            </Form.Group>

            <Form.Group as={Col} controlId="lastName">
              <Form.Label>
                Last Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="false"
              />
              {errors.lastName && touched.lastName ? (
                <p className="text-danger">{errors.lastName}</p>
              ) : null}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="email" className="mt-1">
              <Form.Label>
                Email Address <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="false"
              />
              {errors.email && touched.email ? (
                <p className="text-danger">{errors.email}</p>
              ) : null}
            </Form.Group>

            <Form.Group as={Col} controlId="roleId" className="mt-1">
              <Form.Label>
                Role <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="roleId"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option disabled selected>
                  Select role
                </option>
                <option value="1">Buyer</option>
                <option value="2">Sellers</option>
              </Form.Select>
              {errors.roleId && touched.roleId ? (
                <p className="text-danger">{errors.roleId}</p>
              ) : null}
            </Form.Group>
          </Row>

          <h5 className="mt-5">Login Information</h5>
          <Row className="mt-3">
            <Form.Group as={Col} controlId="password">
              <Form.Label>
                Password <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <p className="text-danger">{errors.password}</p>
              ) : null}
            </Form.Group>

            <Form.Group as={Col} controlId="confirmpassword">
              <Form.Label>
                Confirm Password <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <p className="text-danger">{errors.confirmPassword}</p>
              ) : null}
            </Form.Group>
          </Row>
          <Button variant="danger" type="submit" className="mt-4 mb-5">
            Register
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Register;
