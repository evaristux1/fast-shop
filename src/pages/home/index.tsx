import React from 'react';
import { Button, Typography } from '@mui/material';

export const Home: React.FC = () => {
    return (
        <div>
            <Typography variant="h3" >
                Welcome to the Home Page
            </Typography>
            <Button variant="contained" color="primary">
                Get Started
            </Button>
        </div>
    );
};
