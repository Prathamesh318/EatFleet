import { Card, Chip, IconButton } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const RestaurantCart = ({image,open}) => {
  return (
    <Card className='m-5 w-[18rem]'>
        <div className={`${open?'cursor-pointer':'cursor-not-allowed'} relative`}>
        <img 
        className='w-full h=[10rem] object-cover rounded-t-md'
        src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800" alt=''>
        </img>
        <Chip size='small' className='absolute top-2 left-2' color={open?"success":"error"}
        label={open?"Open":"Closed"}
        />

        </div>
        <div className='p-4 textPart lg:flex w-full justify-between'>
            <div className='space-y-1'>
                <p className='font-semibold text-lg'>Irani Cafe</p>
                <p className='text-gray-500 text-sm'>Most amazing restaurant</p>

            </div>
            <div >
                <IconButton>
                    {
                        true?<FavoriteIcon></FavoriteIcon>:<FavoriteBorderIcon/>
                    }
                </IconButton>
            </div>

        </div>
    </Card>
  )
}

export default RestaurantCart