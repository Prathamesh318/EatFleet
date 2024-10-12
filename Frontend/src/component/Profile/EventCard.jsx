import React from 'react'
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'


const EventCard = () => {
  return (
    <div >
         <Card sx={{width:345}}>
            <CardMedia sx={{height:345}}
            image=''
            />
            <CardContent>
                <Typography variant='h5'>
                    Indian fast food
                </Typography>
                <Typography variant='body2'>
                    50% off on your first order
                </Typography>
                <div className='py-2 space-y-2'>
                    <p>{"Mumbai"}</p>
                    <p className='text-sm text-blue-500'>Start</p>
                    <p className='text-sm text-red-500'>End</p>


                </div>
            </CardContent>
          {
              true && <CardActions>
              <IconButton>
                  <DeleteIcon/>
              </IconButton>
          </CardActions>
          }
            
        </Card>
    </div>
  )
}

export default EventCard