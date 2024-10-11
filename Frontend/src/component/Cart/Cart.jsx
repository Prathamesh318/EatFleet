import { Box, Button, Card, Divider, Grid, Modal, TextField } from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { ErrorMessage, Field, Form, Formik } from "formik";

// import * as Yup from 'yup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline:'none',
  boxShadow: 24,
  p: 4,
};
const initialValudes={
  streetAddress:"",
  state:"",
  pincode:"",
  city:""
}
// const validationSchema=Yup.object.shape({
//   streetAddress:Yup.string().required("Street Address is required"),
//   state:Yup.string().required("State is required"),
//   pincode:Yup.required("Pincode is required"),
//   city:Yup.string().required("city is required"),
//  })

// const validationSchema=({})

const items = [1, 1, 1, 1];
const Cart = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  const createAddressUsingSelectedAddress=()=>{

  }
  const handleOpenAddressModel=()=>setOpen(true);

  const handleSubmit=(values)=>{
    console.log(values);

  }
  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {items.map((item) => (
            <CartItem />
          ))}

          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralightextra py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>Rs.599</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Delivery Fee</p>
                <p>Rs.49</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Platform fee </p>
                <p>Rs.599</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Gst And Restaurant Charges</p>
                <p>Rs.599</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Total Pay</p>
              <p>Rs.550</p>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold py-10 text-2xl">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {[1, 1, 1, 1].map((address) => (
                <AddressCard item={address} showButton={true}  handleSelectAddress={createAddressUsingSelectedAddress}/>
              ))}
                <Card className="flex gap-5 w-64 p-5 items-center">
          <AddLocationIcon/>
          <div className='space-y-4  text-gray-500'>
        <h1 className='font-semibold text-lg text-white'>Add new Address</h1>
        {

              <Button variant='outlined' fullWidth onClick={()=>handleOpenAddressModel()}>Add</Button>
          
        }
       
          </div>
    </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
          <Formik initialValues={initialValudes} onSubmit={handleSubmit} 
          // validationSchema={validationSchema}
          >
              <Form>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Field as={TextField} name="StreetAddress" label="Street Address" fullWidth variant="outlined" error={!ErrorMessage("Street Address Invalid")}
                    
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg)=><span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field as={TextField} name="State" label="State" fullWidth variant="outlined" error={!ErrorMessage("State Invalid")}
                    
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg)=><span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field as={TextField} name="City" label="City" fullWidth variant="outlined" error={!ErrorMessage("City Invalid")}
                    
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg)=><span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field as={TextField} name="Pincode" label="Pincode" fullWidth variant="outlined" error={!ErrorMessage("Pincode Invalid")}
                    
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg)=><span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" type="submit" color="primary">Deliver Here</Button>
                </Grid>
            </Grid>
              </Form>
          </Formik>
  </Box>
</Modal>
    </>
  );
};

export default Cart;
