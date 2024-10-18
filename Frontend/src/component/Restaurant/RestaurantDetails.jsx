import {
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import LocationOnIcon from "@mui/icons-material/LocationOn";
  import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
  import MenuCard from "./MenuCard";
  import { useNavigate, useParams } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import {
    getRestaurantById,
    getRestaurantsCategory,
  } from "../State/Restaurant/Action";
  import { getMenuItemsByRestaurantId } from "../State/Menu/Action";
  
  const foodTypes = [
    { label: "ALL", value: "all" },
    { label: "Veg-Only", value: "vegeterian" },
    { label: "Non-veg", value: "non-vegeterian" },
    { label: "Seasonal", value: "seasonal" },
  ];
  
  const RestaurantDetails = () => {
    const [foodType, setFoodType] = useState("all");
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const { auth, restaurant, menu } = useSelector((store) => store);
    const { id, city } = useParams();
  
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [isVeg,setIsVeg]=useState(true);
  
    const jwt = localStorage.getItem("jwt");
  
    const handleSelectedCategory = (e) => {
        
      setSelectedCategory(e.target.value);
    };

    const handleFilter=(e)=>{
        setFoodType(e.target.value);
    }

    const handleVeg=(e)=>{

    }
  
    useEffect(() => {
      dispatch(getRestaurantById({ jwt, restaurantId: id }));
      dispatch(getRestaurantsCategory({ jwt, restaurantId: id }));
    }, [dispatch,id]);
  
    useEffect(() => {
      dispatch(
        getMenuItemsByRestaurantId({
          jwt,
          restaurantid: id,
          vegeterian: foodType=="vegeterian",
          nonveg: foodType=="non-vegeterian",
          seasonal: foodType=="seasonal",
          category: selectedCategory,
        })
      );
    }, [selectedCategory,foodType]);
  
    return (
      <div className="px-5 lg:px-20 ">
        <section>
          <h3 className="text-gray-500 py-2 mt-10">
            {restaurant.restaurants?.category}
          </h3>
          <div>
            <Grid container spacing={2}>
              {restaurant.restaurants?.images?.map((image, index) => (
                <Grid item xs={12} lg={6} key={index}>
                  <img
                    src={image}
                    alt={`Restaurant Image ${index + 1}`}
                    className="w-full h-[40vh] object-cover"
                  />
                </Grid>
              ))}
            </Grid>
          </div>
          <div className="pt-3 pb-5">
            <h1 className="font-semibold text-4xl">
              {restaurant.restaurants?.name}
            </h1>
            <p className="text-gray-500 mt-1">
              {restaurant.restaurants?.description}
            </p>
            <div className="space-y-3 mt-3">
              <p className="text-gray-50 flex items-center gap-3">
                <LocationOnIcon />
                <span className="font-semibold text-gray-400">
                  Pune , Maharashtra
                </span>
              </p>
              <p className="text-gray-50 flex items-center gap-3">
                <CalendarTodayIcon />
                <span className="font-semibold text-gray-400">
                  Mon-Sun: 9:00 AM-9:00Pm(Today)
                </span>
              </p>
            </div>
          </div>
        </section>
        <Divider />
        <section className="pt-[2rem] lg:flex relative">
          <div className="space-y-10 lg:w-[20%] filter p-5 shadow-md">
            <div className="box space-y-5 lg:sticky top-28 ">
              <div>
                <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                  Food Type
                </Typography>
                <FormControl className="py-10 space-y-5" component={"fieldset"}>
                  <RadioGroup
                    name="Food_type"
                    value={foodType || "All"}
                    onChange={handleFilter}
                  >
                    {foodTypes.map((item) => (
                      <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
              <Divider />
              <div>
                <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                  Food Category
                </Typography>
                <FormControl className="py-10 space-y-5" component={"fieldset"}>
                  <RadioGroup name="Food_category" onChange={handleSelectedCategory}
                  value={selectedCategory}
                  >
                    {restaurant.categories?.map((item) => (
                      <FormControlLabel
                        key={item.id}
                        value={item.id}
                        control={<Radio />}
                        label={item.name}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="space-y-5 lg:w-[80%] lg:pl-10">
            {Array.isArray(menu.menuItems) && menu.menuItems.length > 0 ? (
              menu.menuItems.map((menuItem, index) => (
                <MenuCard key={index} menu={menuItem} />
              ))
            ) : (
              <p>No menus available</p>
            )}
          </div>
        </section>
      </div>
    );
  };
  
  export default RestaurantDetails;
  