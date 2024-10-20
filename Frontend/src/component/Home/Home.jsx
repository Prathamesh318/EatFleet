import React, { useEffect } from "react";
import "./Home.css";
import MultiItemCarousel from "./MultiItemCarousel";
import RestaurantCart from "../Restaurant/RestaurantCart";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../State/Restaurant/Action";

const Home = () => {
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector(store => store);
  
  function getjwt() {
    return jwt;
  }

  useEffect(() => {
    dispatch(getAllRestaurantsAction(getjwt()));
  }, []);

  return (
    <div className="pb-10">
      {/* Banner Section */}
      <section className="banner -z-50 relative flex flex-col justify-center items-center">
        {/* Text Overlay with Background */}
        <div className="relative z-10 text-center bg-black bg-opacity-50 p-8 rounded-lg">
          <p className="text-4xl lg:text-6xl font-bold text-white drop-shadow-lg">EatFleet</p>
          <p className="text-xl lg:text-3xl text-gray-300 mt-3 drop-shadow-lg">
            Taste the Convenience: Food, fast and Delivered
          </p>
        </div>

        {/* Banner Image */}
        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadeout"></div>
      </section>

      {/* Top Meals Section */}
      <section className="p-10 lg:py-10 lg:px-20">
        <p className="text-2xl font-semibold text-orange-400 py-3 pb-10 text-center">
          Top Meals
        </p>
        <MultiItemCarousel />
      </section>

      {/* Handpicked Favourites Section */}
      <section className="px-5 lg:px-20 pt-10">
        <h1 className="text-2xl font-semibold text-center text-orange-400 py-3 pb-8">
          Order From Our Handpicked Favourites
        </h1>
        <div className="flex flex-wrap items-center justify-around gap-5">
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
