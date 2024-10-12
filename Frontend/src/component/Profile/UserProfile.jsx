import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';

const UserProfile = () => {
    const handleLogout = () => {
        // Logic to log the user out
        console.log('Logging out...');
        // For example, clearing session storage or token, redirecting to login
        sessionStorage.clear(); // Or use localStorage.clear();
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
            <div className='flex flex-col items-center justify-center'>
                <AccountCircleIcon sx={{ fontSize: "9rem" }} />
                <h1 className='py-5 text-2xl font-semibold'>Code With Zosh</h1>
                <p>Email: codewithzosh@gmail.com</p>
            </div>
            <Button sx={{ margin: "2rem 0rem" }} variant="contained" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
};

export default UserProfile;
