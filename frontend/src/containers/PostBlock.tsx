import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {getMessage, getOnePosts, postMessage} from "./Thunk/ForumPostSlice.ts";
import {useParams} from "react-router-dom";
import {Box, Button, Card, CardContent, CardMedia, TextField, Typography} from "@mui/material";
import CardMessage from "../components/CardMessage.tsx";

const PostBlock = () => {

    const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>()
    const OnePost = useSelector((state: RootState) => state.Post.OnePost)
    const MessagePost = useSelector((state: RootState) => state.Post.MessageData)
    const userData = useSelector((state: RootState) => state.User.user)

    const [message , setMessage] = useState('');


    useEffect(() => {
        if(id){
            dispatch(getOnePosts(id))
            dispatch(getMessage(id))
        }
    }, [dispatch , id]);


    const sentMessage = async () => {
        if (userData && userData.token) {
            const getToken = userData.token;
            await dispatch(postMessage({ id, message, token: getToken }));
            setMessage('')
        } else {
            console.error('User data or token is undefined');
        }
    }

    if (!OnePost || !OnePost._id) {
        return (
            <Typography variant="h6" component="div" sx={{ textAlign: 'center', marginTop: '20px' }}>
                Пост не найден
            </Typography>
        );
    }

    return (
        <div>
            <Card sx={{ display: 'flex', alignItems: 'center', minWidth: '700px',marginTop:'25px' }}>
                {OnePost.image? (
                    <CardMedia
                        component="img"
                        sx={{ width: 150 , margin:'10px'}}
                        image={`http://localhost:8000/images/${OnePost.image}`}
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
                                {OnePost.title}
                        </Typography>
                        <Typography variant="h7" component="div">
                            {OnePost.description? OnePost.description : ''}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {OnePost.date.replace('T',' ').replace('Z' , ' ').slice(0 , -5)}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
            {userData? (
                <div style={{marginTop:'50px', display:'flex'}}>
                    <form style={{display:'flex', width: '900px'}}>
                        <TextField
                            label="Message"
                            variant="filled"
                            fullWidth
                            required={true}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            InputProps={{
                                style: { backgroundColor: 'white' },
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={sentMessage}
                            sx={{
                                backgroundColor: 'white',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                },
                                marginLeft:'20px',
                                width:'150px'
                            }}>
                            Enter
                        </Button>
                    </form>
                </div>
            ): (
                <div></div>
            )}

            {MessagePost && MessagePost.length > 0 ? (
                MessagePost.map((message) => (
                    <CardMessage key={message._id} username={message.userId ? message.userId.username : 'Unknown User'} message={message.message} />
                ))
            ) : (
                <div>No messages</div>
            )}
        </div>
    );
};

export default PostBlock;