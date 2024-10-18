import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../State/Authentication/Action';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {

    const dispatch = useDispatch();
    const {auth} =useSelector(store=>store);
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/")
    };

    return (
        <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
            <div className='flex flex-col items-center justify-center'>
                <AccountCircleIcon sx={{ fontSize: "9rem" }} />
                <h1 className='py-5 text-2xl font-semibold'>{auth.user?.fullName}</h1>
                <p>Email: {auth.user?.email}</p>
            </div>
            <Button sx={{ margin: "2rem 0rem" }} variant="contained" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
};

export default UserProfile;
