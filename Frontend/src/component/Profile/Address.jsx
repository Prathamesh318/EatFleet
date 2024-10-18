import React from 'react'
import { useSelector } from 'react-redux'
import AddressCard from './AddressCard';

const Address = () => {

  const {auth}=useSelector(store=>store);

  return (
    <div>
      {
        auth.user?.addresses?.map((address)=><AddressCard address={address}/>)
      }
    </div>
  )
}

export default Address