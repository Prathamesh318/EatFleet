import { Chip, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { findCart, removeCartItem, updateCartItem } from '../State/Cart/Action';

const CartItem = ({item}) => {

    const {auth,cart}=useSelector(store=>store);
    const navigate=useNavigate();

    const dispatch=useDispatch();

    const jwt=localStorage.getItem("jwt");

    const handleUpdateCart=(value)=>{
        // alert(value+" "+item.quantity+""+item.id);
        
        if(value===-1&& item.quantity===1){
            handleRemoveCartItem()
            return;
        }

        const data={
            id:item.id,
            quantity:item.quantity+value,

        }
        dispatch(updateCartItem({dataa:data,jwt:jwt||auth.jwt}))
    }
    // useEffect(()=>{
    //     dispatch(findCart(jwt));
    // },[item.quantity]);

    const handleRemoveCartItem=()=>{
        dispatch(removeCartItem({cartItemId:item.id,jwt:auth.jwt||jwt}));
    }
  return (
    <div className='px-5'>

        <div className='lg:flex items-center lg:space-x-5'>
            <div>
                <img src={
                    item.food.images[0]
                } alt='' className='w-[5rem] h-[5rem] object-cover'/>
            </div>
            <div className='flex items-center justify-between lg:w-[70%]'>
                <div className='space-y-1 lg:space-y-3 w-full'>
                    <p>{item.food.name}</p>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center space-x-1'>

                            <IconButton>
                                <RemoveCircleOutlineIcon  onClick={()=>handleUpdateCart(-1)}/>
                            </IconButton>
                            <div className='w-5 h-5 text-xs items-center flex justify-center'>{item.quantity}</div>
                            <IconButton >
                                <AddCircleOutlineIcon onClick={()=>handleUpdateCart(1)}/>
                            </IconButton>
                        </div>
                    </div>

                </div>
                <p>{item.totalPrice}</p>
            </div>
        </div>
        <div className='pt-3 space-x-2'>

        {
            item.ingredients.map((ingredient)=><Chip label={ingredient}/>)
        }
        </div>
    </div>
  )
}

export default CartItem