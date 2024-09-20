import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {postPosts} from "./Thunk/ForumPostSlice.ts";
import {useNavigate} from "react-router-dom";

const FormCreatePost = () => {

    const navigate = useNavigate();
    const urlFile = useRef(null)
    const [file, setFile] = useState<File | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const userData = useSelector((state: RootState) => state.User.user)

    const [info , setInfo] = useState<boolean>(false);

    const [data, setData] = useState({
        title: '',
        description: ''
    });



    useEffect(() => {
        if(!userData){
            navigate('/')
        }
    }, [userData]);

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target.files

        if (fileInput && fileInput[0]) {
            setFile(fileInput[0])
        } else {
            setFile(null)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!data.description && !file) {
            setInfo(true)
            return;
        }

        if(data && data?.title){
            await dispatch(postPosts({title: data.title, photo: file, description: data?.description,token: userData?.token}))
            await navigate('/')
            setInfo(false)
            location.reload()
        }

    }

    return (
        <div>
            <form style={{width:'400px' , margin:'50px auto'}} onSubmit={onSubmit}>
                <TextField
                    label="Title"
                    variant="filled"
                    fullWidth
                    required={true}
                    value={data.title}
                    onChange={(e) => setData(prevState => ({
                        ...prevState,
                        title: e.target.value
                    }))}
                    InputProps={{
                        style: { backgroundColor: 'white' },
                    }}
                />
                <TextField
                    label="Description"
                    variant="filled"
                    fullWidth
                    value={data.description}
                    sx={{marginTop:'20px'}}
                    onChange={(e) => setData(prevState => ({
                        ...prevState,
                        description: e.target.value
                    }))}
                    InputProps={{
                        style: { backgroundColor: 'white' },
                    }}
                />
                <input ref={urlFile} accept="image/*" onChange={onFileChange} type={"file"} style={{marginTop:'20px'}}/>

                {info && (
                    <div>
                        <p style={{color:'red'}}>Provide photo or description</p>
                    </div>
                )}
                <Button
                    variant="contained"
                    type={'submit'}
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        '&:hover': {
                            backgroundColor: '#f0f0f0',
                        },
                        marginTop:'20px',
                        width:'150px'
                    }}>
                    Enter
                </Button>
            </form>
        </div>
    );
};

export default FormCreatePost;