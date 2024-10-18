// import logo from './logo.svg';
import './App.css';

import Navbar from './component/navbar/Navbar'
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from './theme/DarkTheme';
import { CssBaseline } from '@mui/material';
// import { Home } from '@mui/icons-material';

// import Home from './component/Home/Home'
import RestaurantDetails from './component/Restaurant/RestaurantDetails';
import Cart from './component/Cart/Cart';
import Home from './component/Home/Home';
import Profile from './component/Profile/Profile';
import ProfileNav from './component/Profile/ProfileNav';
import CustomerRoutes from './Routes/CustomerRoutes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsesr } from './component/State/Authentication/Action';
import { findCart, getAllCartItems } from './component/State/Cart/Action';

function App() {
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const {auth}=useSelector(store=>store);
  const {cart}=useSelector(store=>store)
  useEffect(()=>{
    dispatch(getUsesr(auth.jwt || jwt))
    dispatch(findCart(jwt));
    // dispatch(getAllCartItems({jwt:auth.jwt||jwt,da}))

  },[auth.jwt])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <CustomerRoutes/>
    </ThemeProvider>

  );
}

export default App;
