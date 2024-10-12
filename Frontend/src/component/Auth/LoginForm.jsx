import React from 'react';
import {  Formik, Form, Field,  } from 'formik';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const navigate=useNavigate();
  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here (e.g., send data to server)
    setSubmitting(false);
  };

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Login
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field  as={TextField} name="email" label="email" fullWidth variant="outlined" margin="normal"/>
          <Field  as={TextField} name="password" label="password" fullWidth variant="outlined" margin="normal"/>
       
         <Button sx={{mt:2,padding:"1rem"}} fullWidth type='submit' variant="contained">
            Login
         </Button>
        </Form>
      </Formik>
      <Typography variant='body2' align='center' sx={{margin:3}}>
        Don't have an account ?
        <Button size='small' onClick={()=>navigate("account/register")}>
            Register
        </Button>
      </Typography>
    </div>
  );
};

export default LoginForm;