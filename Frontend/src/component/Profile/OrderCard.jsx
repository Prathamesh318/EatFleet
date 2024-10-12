import { Button, Card } from '@mui/material'
import React from 'react'

const OrderCard = () => {
  return (
    <Card className='flex justify-between items-center p-5'>
        <div className='flex items-center space-x-5'>
            <img src='' className='h-16 w-16'/>
            <div>
                <p>Biryani</p>
                <p>$</p>
            </div>
        </div>
        <div>
            <Button  className='cursor-not-allowed'>completed</Button>
        </div>
    </Card>
  )
}

export default OrderCard