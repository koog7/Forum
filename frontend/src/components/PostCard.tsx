import React from 'react';
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";

interface Props{
    title: string;
    description: string;
    image: string;
    date: string;
}

const PostCard:React.FC<Props> = ({title , description , image , date}) => {
    return (
        <div>
            <Card sx={{ display: 'flex', alignItems: 'center', minWidth: '700px',marginTop:'25px' }}>
                {image? (
                    <CardMedia
                        component="img"
                        sx={{ width: 150 , margin:'10px'}}
                        image={`http://localhost:8000/images/${image}`}
                        alt="img of news"

                    />
                ):(
                    <CardMedia
                        component="img"
                        sx={{ width: 150 , margin:'10px'}}
                        image={`http://localhost:8000/UI/chat.png`}
                        alt="img of news"

                    />
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                    <CardContent sx={{ textAlign: 'left' }}>
                        <Typography variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="h7" component="div">

                            {description? description : ''}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {date}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </div>
    );
};

export default PostCard;