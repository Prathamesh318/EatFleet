import React from 'react'
import { topRestaurants } from './topRestaurants'
import RestaurantCart from './RestaurantCart'

const RestaurantCarousel = () => {
  return (
    <div className='flex '>{
        topRestaurants.map((resto)=>(
            <RestaurantCart image={resto.image} open={resto.open}/>
        ))
        
        }</div>
  )
}

export default RestaurantCarousel