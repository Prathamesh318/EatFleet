import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItemtoCart } from "../State/Cart/Action";

export const categoriseIngredients = (ingredients) => {
  return ingredients.reduce((acc, ingredient) => {
    const { category } = ingredient;
    if (!acc[category.name]) {
      acc[category.name] = [];
    }
    acc[category.name].push(ingredient.name); // Store only the ingredient name
    return acc;
  }, {});
};

const MenuCard = ({ menu }) => { // Destructure menu from props


  const dispatch=useDispatch();

  // const {menu}=useSelector(store=>store);

  const[selectedIngredients,setSelectedIngredients]=useState([]);

  const categorizedIngredients = Array.isArray(menu.ingredients)
  ? categoriseIngredients(menu.ingredients)
  : {}; 

  // console.log("Modified Categories"+JSON.stringify(categorizedIngredients));

  const handleAddItemToCart=(e)=>{
    // e.preventDefault();
    const reqData={
      token:localStorage.getItem("jwt"),
      cartItem:{
          foodId:menu.id,
          quantity:1,
          ingredients:selectedIngredients
      }
    }
    dispatch(addItemtoCart(reqData));
    // alert("----------------------Requested data------------------------"+JSON.stringify(reqData));

  }
  const handleSubmit=(e)=>{
    e.preventDefault();
  }

  const handleCheckBoxChange=(itemName)=>{
    // alert(itemName);
    if(selectedIngredients.includes(itemName)){
      setSelectedIngredients(selectedIngredients.filter((item)=>item!==itemName))
    }
    else{
setSelectedIngredients([...selectedIngredients,itemName])
    }
  }

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="lg:flex items-center justify-center">
            <div className="lg:flex items-center lg:gap-5">
              <img
                className="w-[7rem] h-[7rem] object-cover rounded-md"
                src={menu.images && menu.images.length > 0 ? menu.images[0] : "default_image_url"}
                alt=""
              />
              <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                <p className="font-semibold text-xl">{menu.name}</p>
                <p>
                  <CurrencyRupeeIcon />
                  {menu.price}
                </p>
                <p className="text-gray-400">{menu.description}</p>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
          <div className="flex gap-5 flex-wrap">
              {Object.keys(categorizedIngredients).map((category) => (
                <div key={category}>
                  <p className="font-semibold">{category}</p>
                  <FormGroup>
                    {categorizedIngredients[category].map((ing) => (
                      <FormControlLabel
                        key={ing}
                        control={<Checkbox onChange={() => handleCheckBoxChange(ing)} />}
                        label={ing}
                      />
                    ))}
                  </FormGroup>
                </div>
              ))}
            </div>
            <div className="pt-5">
              <Button onClick={handleAddItemToCart} type="submit" variant="contained" disabled={false}>
                {true ? "Add to cart" : "Out of Stock"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MenuCard;
