import { Avatar, Badge, Box, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { brown } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { auth, cart } = useSelector((store) => store);
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
      className="px-5 sticky top-0 z-50 py-[.8rem] bg-gray-900 shadow-lg lg:px-20 flex justify-between items-center"
    >
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li
          onClick={() => navigate("/")}
          className="logo font-extrabold text-white text-3xl list-none"
        >
          EatFleet
        </li>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-10">
        <div className="search-container flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="search-input p-1 px-3 text-sm bg-gray-700 text-white rounded-md outline-none"
          />
          <IconButton>
            <SearchIcon sx={{ fontSize: "1.5rem", color: "#fff" }} />
          </IconButton>
        </div>
        <div className="">
          {auth.user ? (
            <Avatar
              onClick={handleAvatarClick}
              sx={{ bgcolor: "white", color: brown[400] }}
              className="avatar-icon hover:scale-105 transition-transform"
            >
              {auth.user?.email[0].toUpperCase()}
            </Avatar>
          ) : (
            <IconButton
              onClick={() => navigate("/account/login")}
              className="avatar-icon hover:scale-105 transition-transform"
            >
              <Person sx={{ color: "#fff" }} />
            </IconButton>
          )}
        </div>
        <div className="">
          <IconButton
            onClick={() => navigate("/cart")}
            className="cart-icon hover:scale-105 transition-transform"
          >
            <Badge color="primary" badgeContent={cart.cartItems.length}>
              <ShoppingCartIcon sx={{ fontSize: "1.6rem", color: "#fff" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
