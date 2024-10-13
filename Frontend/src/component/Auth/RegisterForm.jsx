import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Authentication/Action";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER",
  };

  const handleSubmit = (values) => {
    dispatch(registerUser({userData:values,navigate}))
  };

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Register
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field
            as={TextField}
            name="fullname"
            label="Full Name"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Field
            as={TextField}
            name="email"
            label="email"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Field
            as={TextField}
            name="password"
            label="password"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
          />

         
            <Field
                fullWidth
              as={Select}
              labelId="role-simple-select-label"
              id="role-simple-select"
              label="Role"
              name="role"
              margin="normal"
              // onChange={handleChange}
            >
              <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
              <MenuItem value={"ROLE_RESTAURANT_OWNER"}>
                Restaurant Owner
              </MenuItem>
            </Field>
      

          <Button
            sx={{ mt: 2, padding: "1rem" }}
            fullWidth
            type="submit"
            variant="contained"
            
          >
            Regsiter
          </Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" sx={{ margin: 3 }}>
        if already have an account ?
        <Button size="small" onClick={() => navigate("account/login")}>
          Login
        </Button>
      </Typography>
    </div>
  );
};

export default RegisterForm;
