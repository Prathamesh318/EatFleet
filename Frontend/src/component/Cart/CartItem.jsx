import { Chip, IconButton } from '@mui/material'
import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CartItem = () => {
  return (
    <div className='px-5'>

        <div className='lg:flex items-center lg:space-x-5'>
            <div>
                <img src='https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800' alt='' className='w-[5rem] h-[5rem] object-cover'/>
            </div>
            <div className='flex items-center justify-between lg:w-[70%]'>
                <div className='space-y-1 lg:space-y-3 w-full'>
                    <p>Biryani</p>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center space-x-1'>

                            <IconButton>
                                <RemoveCircleOutlineIcon/>
                            </IconButton>
                            <div className='w-5 h-5 text-xs items-center flex justify-center'>5</div>
                            <IconButton>
                                <AddCircleOutlineIcon/>
                            </IconButton>
                        </div>
                    </div>

                </div>
                <p>Rs.1956</p>
            </div>
        </div>
        <div className='pt-3 space-x-2'>

        {
            [1,1,1].map((item)=><Chip label={"bread"}/>)
        }
        </div>
    </div>
  )
}

export default CartItem