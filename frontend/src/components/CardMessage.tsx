import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface MessageCardProps {
    username: string;
    message: string;
}

const CardMessage: React.FC<MessageCardProps> = ({ username, message }) => {
    return (
        <Card sx={{ margin: '10px', padding: '10px', backgroundColor: '#f9f9f9' }}>
            <CardContent>
                <Typography variant="h6" component="div" color="primary">
                    {username}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {message}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CardMessage;
