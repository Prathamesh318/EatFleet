

import { Card } from "@mui/material"

const AddressCard = ({address}) => {
  return (
    <Card className='flex justify-between items-center p-5 w-[50]'>
        <div className='flex items-center space-x-5'>
          
            <div>
                <p>Street Address:{address.streetAddress}</p>
                <p>City :{address.city}</p>
                <p>State :{address.state}</p>
            </div>
        </div>
    </Card>
  )
}

export default AddressCard