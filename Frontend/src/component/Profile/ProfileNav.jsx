import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { Drawer, useMediaQuery } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
const menu=[
    {
        title:"Orders",
        icon:<ShoppingBagIcon/>,


    },
    {
        title:"Favourites",
        icon:<FavoriteIcon/>,


    },
    {
        title:"Address",
        icon:<HomeIcon/>,


    },
    {
        title:"Payment",
        icon:<AccountBalanceWalletIcon/>,


    },
    {
        title:"Notification",
        icon:<NotificationsActiveIcon/>,


    },
    {
        title:"Events",
        icon:<EventIcon/>,


    },
    {
        title:"Logout",
        icon:<LogoutIcon/>,


    }
]

const ProfileNav = ({open,handleClos}) => {
    const isSmallScreen=useMediaQuery("(max-width:1080");

  return (
    <div>
        <Drawer sc={{zIndex:1}} anchor='left' open={open} onClose={handleClos} variant={isSmallScreen?"temporary":"permanent"} >
                <div className='w-[50vw lg:w=[20vw] h-[100vh] flex flex-col justify-center text-xl gap-8 pt-16' >

                </div>
        </Drawer>
    </div>
  )
}

export default ProfileNav