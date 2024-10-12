import { Avatar, Badge, Box, Icon, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { brown } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Person from '@mui/icons-material/Person'
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {

  const  navigate=useNavigate();
  return (
    <Box
      className="px-5 opacity-90 sticky
      top-0 z-50 py-[.8rem] bg-[#ee4242] lg:px-20 flex justify-between
    "
    >
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li className="logo font-semibold text-gray-300 list-none 
        text-2xl">Treatify</li>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-10">
        <div className="">
          <IconButton>
            <SearchIcon sx={{ fonstSize: "1.5rem" }} />
          </IconButton>
        </div>
        <div className="">
          {false ? <Avatar sx={{ bgcolor: "white", color: brown[400] }}>P</Avatar>:<IconButton onClick={()=>navigate("/account/login")}><Person/></IconButton>}
        </div>
        <div className="">
          <IconButton>
            <Badge  color="primary" badgeContent={3}>
              <ShoppingCartIcon sx={{ fonstSize: "1.6rem" }} />

            </Badge>
          </IconButton>
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
