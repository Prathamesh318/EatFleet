import React from 'react';
import {  Formik, Form, Field,  } from 'formik';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../State/Authentication/Action';

const Reset = () => {

    const navigate=useNavigate();
  const initialValues = {
    username: '',
    password: '',
  };

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(loginUser({userData:values,navigate}))
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
      {/* <Typography variant='body2' align='center' sx={{margin:3}}>
        Don't have an account ?
        <Button size='small' onClick={()=>navigate("account/register")}>
            Register
        </Button>
      </Typography>
      <Typography variant='body2' align='center' sx={{margin:3}}>
        Forgot Password ?
        <Button size='small' onClick={()=>navigate("account/reset")}>
            Reset Password
        </Button>
      </Typography> */}
    </div>
  );
};

export default Reset;