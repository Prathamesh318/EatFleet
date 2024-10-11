import { Avatar, Badge, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { brown } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = () => {
  return (
    <div
      className="px-5 opacity-90 z-50 py-[.8rem] bg-[#ee4242] lg:px-20 flex justify-between
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
          <Avatar sx={{ bgcolor: "white", color: brown[400] }}>P</Avatar>
        </div>
        <div className="">
          <IconButton>
            <Badge  color="primary" badgeContent={3}>
              <ShoppingCartIcon sx={{ fonstSize: "1.6rem" }} />

            </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
