import { Card, Chip, IconButton } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourite } from '../State/Authentication/Action';
import { isPresentInFavourites } from '../Config/logic';
const RestaurantCart = ({item}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {auth}=useSelector(store=>store);

    const jwt=localStorage.getItem("jwt");


    const handleAddToFav=()=>{
        dispatch(addToFavourite({restaurantId:item.id,jwt:jwt}))
    }

    const handleNavigateToRestaurant=()=>{
        if(item.open){
            navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`)
        }
    }
  return (
    <Card className='m-5 w-[18rem]'>
        <div className={`${item.open?'cursor-pointer':'cursor-not-allowed'} relative`}>
        <img 
        className='w-full h=[10rem] object-cover rounded-t-md'
        src={item.images[0]} alt=''>
        </img>
        <Chip size='small' className='absolute top-2 left-2' color={item.open?"success":"error"}
        label={item.open?"Open":"Closed"}
        />

        </div>
        <div className='p-4 textPart lg:flex w-full justify-between'>
            <div className='space-y-1'>
                <p onClick={handleNavigateToRestaurant} className='font-semibold text-lg cursor-pointer'>{item.name}</p>
                <p className='text-gray-500 text-sm'>{item.description}</p>

            </div>
            <div >
                <IconButton onClick={handleAddToFav}>
                    {
                       isPresentInFavourites(auth.favourites,item)?<FavoriteIcon></FavoriteIcon>:<FavoriteBorderIcon/>
                    }
                </IconButton>
            </div>

0        </div>
    </Card>
  )
}

export default RestaurantCart