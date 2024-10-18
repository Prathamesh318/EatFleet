import { Avatar, Badge, Box, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { brown } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Person from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { auth,cart } = useSelector((store) => store);

  const navigate = useNavigate();

  const handleAvatarClick = () => {
    console.log(JSON.stringify(auth));
    sessionStorage.clear();
    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/admin/restaurant");
    }
  };
  return (
    <Box
      className="px-5 opacity-90 sticky
      top-0 z-50 py-[.8rem] bg-[#ee4242] lg:px-20 flex justify-between
    "
    >
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li
          onClick={() => navigate("/")}
          className="logo font-semibold text-gray-300 list-none 
        text-2xl"
        >
          EatFleet
        </li>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-10">
        <div className="">
          <IconButton>
            <SearchIcon sx={{ fonstSize: "1.5rem" }} />
          </IconButton>
        </div>
        <div className="">
          {auth.user ? (
            <Avatar
              onClick={handleAvatarClick}
              sx={{ bgcolor: "white", color: brown[400] }}
            >
              {auth.user?.email[0].toUpperCase()}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person />
            </IconButton>
          )}
        </div>
        <div className="">
          <IconButton onClick={()=>navigate('/cart')}>
            <Badge color="primary" badgeContent={cart.cartItems.length}>
              <ShoppingCartIcon sx={{ fonstSize: "1.6rem" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
