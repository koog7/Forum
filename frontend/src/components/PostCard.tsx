import React from 'react';
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

interface Props{
    _id:string;
    title: string;
    description: string;
    image: string;
    date: string;
}

const PostCard:React.FC<Props> = ({_id , title , description , image , date}) => {

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
                            <NavLink to={`/post/${_id}`} className={'title'}>
                                {title}
                            </NavLink>
                        </Typography>
                        <Typography variant="h7" component="div">
                            {description? description : ''}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {date.replace('T',' ').replace('Z' , ' ').slice(0 , -5)}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </div>
    );
};

export default PostCard;