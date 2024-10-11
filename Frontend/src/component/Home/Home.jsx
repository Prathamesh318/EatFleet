import React from 'react'

// import cake from '../../assets/cake.jpg'

// import 'Home.css'

import './Home.css'
import MultiItemCarousel from './MultiItemCarousel'
// import RestaurantCarousel from '../Restaurant/RestaurantCarousel'
import RestaurantCart from '../Restaurant/RestaurantCart'
// import { topmeals } from './topMeal'

const restaurant=[1,1,1,1,1,1,1,1]

const Home = () => {
  return (
    <div className='pb-10'>
        <section className='banner -z-50 relative flex flex-col justify-center items-center'>
                <div className='w-[50vw] z-10 text-center'>
                    <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>Treatify</p>
                    <p className='text-xl z-10 text-gray-300 lg:text-4xl '> Taste the Convenience:Food,fast and Delivered</p>
                </div>
                <div className='cover absolute top-0 left-0 right-0'>

                </div>
                <div className='fadeout'>

                </div>
        
               
        </section>
        <section className='p-10 lg:py-10 lg:px-20 '>
            <p className='text-2xl font-semibold text-orange-400 py-3 pb-10 text-center'>Top Meals</p>
            <MultiItemCarousel/>
        </section>
        <section className='px-5 lg:px-20 pt-10'>
          <h1 className='text-2xl font-semibold text-center text-orange-400 py-3 pb-8'>Order From Our Handpicked Favourites</h1>
          <div className='flex flex-wrap items-center justify-around gap-5'>

          {/* <RestaurantCarousel/> */}
          {
            restaurant.map((restor)=>(<RestaurantCart open={true}/>))
          }
          </div>
        </section>
        
    </div>
  )
}

export default Home