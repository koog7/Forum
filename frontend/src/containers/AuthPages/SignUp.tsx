import React, {useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import {loginUser} from "../Thunk/AuthSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store.ts";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [localError , setLocalError] = useState<boolean>(false)

    const [login, setLogin] = useState({
        username: '',
        password: '',
    });

    const submitData = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dis = await dispatch(loginUser(login));

            if (dis.type === 'users/singIn/rejected'){
                setLocalError(true)
            }else{
                navigate('/');
            }

        } catch (error) {
            console.log('Unexpected Error:', error);
        }

    };

    return (
        <div>
            <h2 style={{marginLeft: '360px'}}>Sign Up</h2>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '300px',
                    margin: '40px auto',
                    gap: 2,

                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Username"
                    variant="filled"
                    fullWidth
                    value={login.username}
                    onChange={(e) =>
                        setLogin({ ...login, username: e.target.value })
                    }
                    InputProps={{
                        style: { backgroundColor: 'white' },
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="filled"
                    fullWidth
                    value={login.password}
                    onChange={(e) =>
                        setLogin({ ...login, password: e.target.value })
                    }
                    InputProps={{
                        style: { backgroundColor: 'white' },
                    }}
                />
                {localError && (
                    <div>
                        <p style={{color:'red'}}>Useranme are already claimed</p>
                    </div>
                )}
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        '&:hover': {
                            backgroundColor: '#f0f0f0',
                        },
                    }}
                    onClick={submitData}
                    fullWidth>
                    Enter
                </Button>
            </Box>
        </div>
    );
};

export default Login;