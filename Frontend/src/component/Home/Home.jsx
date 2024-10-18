import React, { useEffect } from "react";
import "./Home.css";
import MultiItemCarousel from "./MultiItemCarousel";
import RestaurantCart from "../Restaurant/RestaurantCart";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../State/Restaurant/Action";
import { useNavigate } from "react-router-dom";
import { findCart } from "../State/Cart/Action";

const Home = () => {
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");

  const navigate = useNavigate();

  // Access the restaurant data from the store
  const { restaurant } = useSelector(store => store);

  console.log("Restaurant data:", restaurant);

  // Function to get the JWT token
  function getjwt() {
    console.log("JWT Token: " + jwt);
    return jwt;
  }
  // localStorage.clear();
  // localStorage.removeItem("jwt");

  // Dispatch action to fetch all restaurants
  useEffect(() => {
   
    dispatch(getAllRestaurantsAction(getjwt()));
  
  }, []);

  return (
    <div className="pb-10">
      <section className="banner -z-50 relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-6xl font-bold z-10 py-5">Treatify</p>
          <p className="text-xl z-10 text-gray-300 lg:text-4xl">
            Taste the Convenience: Food, fast and Delivered
          </p>
        </div>
        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadeout"></div>
      </section>

      <section className="p-10 lg:py-10 lg:px-20">
        <p className="text-2xl font-semibold text-orange-400 py-3 pb-10 text-center">
          Top Meals
        </p>
        <MultiItemCarousel />
      </section>

      <section className="px-5 lg:px-20 pt-10">
        <h1 className="text-2xl font-semibold text-center text-orange-400 py-3 pb-8">
          Order From Our Handpicked Favourites
        </h1>
        <div className="flex flex-wrap items-center justify-around gap-5">
          {/* Check if restaurant.restaurants is an array before mapping */}
          {Array.isArray(restaurant.restaurants) && restaurant.restaurants.length > 0 ? (
            restaurant.restaurants.map((restor, index) => (
              <RestaurantCart key={index} item={restor} />
            ))
          ) : (
            <p>No restaurants available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
