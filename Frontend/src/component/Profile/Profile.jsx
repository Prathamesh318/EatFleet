import React from 'react'
import ProfileNav from './ProfileNav'

const Profile = () => {
  return (
    <div className='flex justify-between'>
        <div className="sticky h-[80vh] lg:w-[20%]">
            <ProfileNav/>
        </div>
        <div className='lg:w-[80%]'>

        </div>
    </div>
  )
}

export default Profile