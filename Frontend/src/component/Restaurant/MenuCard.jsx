import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";

// const ingredients=[
//     {
//         category:"Nuts & Seed",
//         items:"Cashews"
//     },
//     {
//         category:"Protein",
//         items:"Beef"
//     },
//     {
//         category:"Protein",
//         items:"Bacon Strips"
//     },
// ]
const demo = [
  {
    category: "Nuts & Seed",
    items: ["Cashews"],
  },
  {
    category: "Protein",
    items: ["Beef", "Bacon Strips"],
  },
];
const MenuCard = () => {

    const handleCheckBoxChange=(value)=>{
        console.log(value);

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
                className="w-[7rem] h-[7rem] object-cover  rounded-md"
                src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt=""
              ></img>
              <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                <p className="font-semibold text-xl">Burger</p>
                <p>
                  <CurrencyRupeeIcon />
                  499
                </p>
                <p className="text-gray-400">A hamburger or simply burger </p>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form>
            <div className="flex gap-5 flex-wrap">
              {demo.map((item) => (
                <div>
                  <p>{item.category}</p>
                  <FormGroup>
                    {item.items.map((ing) => (
                      <FormControlLabel control={<Checkbox onChange={()=>handleCheckBoxChange(item)}/>} label={ing} />
                    ))}
                  </FormGroup>
                </div>
              ))}
            </div>
            <div className="pt-5">
                <Button type="submit" variant="contained" disabled={false}>
                    {
                        true?"Add to cart":"Out of Stock"
                    }
                </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MenuCard;
