import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/order/Action";

// import * as Yup from 'yup';

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};
const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

const Cart = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  const createAddressUsingSelectedAddress = () => {};
  

  const { cart,auth } = useSelector((store) => store);

  const dispatch=useDispatch();
  // alert(JSON.stringify(cart.cart?.item[0]))
  const calculateTotalPrice = (cart) => {
    // if ( !cart.cart?.item || cart.cart.item?.length === 0) {
    //   return 0; // Return 0 if the cart is empty or undefined
    // }

    const ans = cart.cart?.item.reduce(
      (total, currentItem) => total + currentItem.totalPrice,
      0
    );
    alert(ans);
    return ans;
  };
  const handleOpenAddressModel = () => setOpen(true);
  console.log(JSON.stringify(cart));
  // alert(cart.cartItems[0].food.restaurant.id)

  const handleSubmit = (values) => {
    console.log("Form calyes",values);
    const data={
      jwt:localStorage.getItem("jwt"),
      order:{
        restaurantId:cart.cartItems[0]?.food.restaurant.id,
        deliveryAddress:{

          fullName:auth.user?.fullName,
          streetAddress:values.StreetAddress,
          city:values.City,
          state:values.State,
          postalCode:values.Pincode,
          country:"India "



        }
      }
    }
    dispatch(createOrder({order:data.order,jwt:data.jwt}));
  };
  // alert(JSON.stringify(cart))
  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems.map((item) => (
            <CartItem item={item} />
          ))}

          <Divider />
          <div className="billDetails px-5 text-sm">
            <p
              onClick={calculateTotalPrice}
              className="font-extralightextra py-5"
            >
              Bill Details
            </p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>Rs.{calculateTotalPrice}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Delivery Fee</p>
                <p>Rs.49</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Platform fee </p>
                <p>Rs.21</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Gst And Restaurant Charges</p>
                <p>Rs.20</p>
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
                <AddressCard
                  item={address}
                  showButton={true}
                  handleSelectAddress={createAddressUsingSelectedAddress}
                />
              ))}
              <Card className="flex gap-5 w-64 p-5 items-center">
                <AddLocationIcon />
                <div className="space-y-4  text-gray-500">
                  <h1 className="font-semibold text-lg text-white">
                    Add new Address
                  </h1>
                  {
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleOpenAddressModel()}
                    >
                      Add
                    </Button>
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
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            // validationSchema={validationSchema}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="StreetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("Street Address Invalid")}

                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg)=><span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="State"
                    label="State"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("State Invalid")}

                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg)=><span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="City"
                    label="City"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("City Invalid")}

                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg)=><span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="Pincode"
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("Pincode Invalid")}

                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg)=><span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Deliver Here
                  </Button>
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
