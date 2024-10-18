import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';

const menu = [
  {
    title: "Orders",
    icon: <ShoppingBagIcon />,
  },
  {
    title: "Favourites",
    icon: <FavoriteIcon />,
  },
  {
    title: "Address",
    icon: <HomeIcon />,
  },
  {
    title: "Payment",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    title: "Notification",
    icon: <NotificationsActiveIcon />,
  },
  {
    title: "Events",
    icon: <EventIcon />,
  },
  {
    title: "LOGOUT",
    icon: <LogoutIcon />,
  }
]

const ProfileNav = ({ open, handleClos }) => {
  const isSmallScreen = useMediaQuery('(max-width:900px)');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    console.log(item.title);

    if (item.title === "LOGOUT") {
      console.log('Logging out...');
      dispatch(logout());
      navigate("/");
      return;
    }
    navigate(`/my-profile/${item.title.toLowerCase()}`);
  };


  return (
    <div>
      <Drawer sx={{ zIndex: -100, position: "sticky" }} anchor='left' open={isSmallScreen ? open : true} onClose={handleClos} variant={isSmallScreen ? "temporary" : "permanent"} >
        <div className='w-[50vw lg:w-[20vw] h-[90vh] flex flex-col justify-center text-xl gap-8 pt-16' >
          {
            menu.map((item, i) => {
              return (
                <>
                  <div key={i} className='px-5 flex items-center space-x-5 cursor-pointer'
                    onClick={() => handleNavigate(item)}>
                    {item.icon}
                    <span onClick={(() => handleNavigate(item))}>{item.title}</span>
                  </div>
                  {i !== menu.length - 1 && <Divider />}
                </>
              );
            })
          }
        </div>
      </Drawer>
    </div>
  )
}


export default ProfileNav