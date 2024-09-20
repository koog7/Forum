import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";

const FormCreatePost = () => {
    const [data , setData] = useState('');


    return (
        <div>
            <form style={{width:'400px' , margin:'50px auto'}}>
                <TextField
                    label="Title"
                    variant="filled"
                    fullWidth
                    required={true}
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    InputProps={{
                        style: { backgroundColor: 'white' },
                    }}
                />
                <TextField
                    label="Description"
                    variant="filled"
                    fullWidth
                    required={true}
                    value={data}
                    sx={{marginTop:'20px'}}
                    onChange={(e) => setData(e.target.value)}
                    InputProps={{
                        style: { backgroundColor: 'white' },
                    }}
                />
                <input type={"file"} style={{marginTop:'20px'}}/>
                <Button
                    variant="contained"
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