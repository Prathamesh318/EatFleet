import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MenuCard from "./MenuCard";


const Category=["Paasta","Veg-Only","Rice","Pizza","Biryani","Burger"];

const foodTypes=[
    {
        label:"ALL",value:"all"
    },
    {
        label:"Veg-Only",value:"vegeterian"
    },
    {
        label:"Non-veg",value:"non-vegeterian"
    },
    {
        label:"Seasonal",value:"seasonal"
    }
]

const menu=[1,1,1,1,1,1]
const RestaurantDetails = () => {
    const [foodType,setFoodType]=useState("all");

    const handleFilter=(e)=>{
        console.log(e.target.value," ",e.target.name);
    }
  return (
    <div className="px-5 lg:px-20 ">
      <section className="">
        <h3 className="text-gray-500 py-2 mt-10">Home/india/Irani Cafe/3</h3>
        {/* Restaurant Images */}
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                src="https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt=""
                className="w-full h-[40vh] object-cover"
              ></img>
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt=""
                className="w-full h-[40vh] object-cover"
              ></img>
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                src="https://images.pexels.com/photos/1581554/pexels-photo-1581554.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt=""
                className="w-full h-[40vh] object-cover"
              ></img>
            </Grid>
          </Grid>
        </div>
        {/* Restaurant Detaisl */}
        <div className="pt-3 pb-5">
          <h1 className="font-semibold text-4xl">Irani cafe</h1>
          <p className="text-gray-500 mt-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero
            labore reprehenderit ut necessitatibus possimus quod ad molestiae
            dicta quas vel excepturi, consequuntur quia quasi tempora
            perspiciatis optio sit commodi cumque. Optio cum iste non beatae.
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
        {/* Restaurant Food Items */}
      </section>
      <Divider />
      <section className="pt-[2rem] lg:flex relative">
        {/* Food Types and Category */}
        <div className="space-y-10 lg:w-[20%] filter p-5 shadow-md">
            <div className="box space-y-5 lg:sticky top-28 ">
                <div>
                    <Typography variant="h5" sx={{paddingBottom:"1rem"}}>
                        Food Type
                    </Typography>
                    <FormControl className="py-10 space-y-5" component={"fieldset"}>
                        <RadioGroup name="Food_type" value={foodType||"All"} onChange={handleFilter}>
                            {
                                foodTypes.map((item)=>(

                                    <FormControlLabel key={item.value} value={item.value} control={<Radio/>} label={item.label}/>
                                )
                                )
                            }
                        </RadioGroup>
                    </FormControl>
                </div>
                <Divider/>
                <div>
                    <Typography variant="h5" sx={{paddingBottom:"1rem"}}>
                        Food Category
                    </Typography>
                    <FormControl className="py-10 space-y-5" component={"fieldset"}>
                        <RadioGroup name="Food_type" value={foodType||"All"} onChange={handleFilter}>
                            {
                                Category.map((item)=>(

                                    <FormControlLabel
                                     key={item} 
                                     value={item}
                                      control={<Radio/>}
                                       label={item}/>
                                )
                                )
                            }
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </div>
        {/* Menu */}
        <div className="space-y-5 lg:w-[80%] lg:pl-10 ">
            {
                menu.map((menu)=><MenuCard/>)
            }
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
