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

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Navbar/>
    {/* <Home/> */}
    {/* <RestaurantDetails/> */}
    
     {/* <Cart/> */}
     <Profile/>
    </ThemeProvider>

  );
}

export default App;
