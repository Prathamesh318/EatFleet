import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CarouselItem from './CarouselItem';
import { topmeals } from './topMeal';
import Slider from "react-slick";

const MultiItemCarousel = () => {

  const settings={
    dots:true,
    infinite:true,
    speed:500,
    slidesToShow:5,
    slidesToScroll:1,
    autoplay:true,
    autoplaySpeed:2000,
    arrows:false
  }


  return (
    <div className=''>
<Slider {...settings}>


    {
      topmeals.map((item)=>
        (<CarouselItem image={item.image} title={item.title}/>

        ))
    }
</Slider>


    </div>
  )
}

export default MultiItemCarousel