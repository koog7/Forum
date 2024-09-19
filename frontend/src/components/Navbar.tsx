import React, {useEffect} from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";

const Navbar = () => {

    const userData = useSelector((state: RootState) => state.User.user)

    useEffect(() => {
        console.log(userData)
    }, [userData]);
    return (
        <div>
            <AppBar position="static" sx={{backgroundColor:'#424242' , minWidth:'800px'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <NavLink to={'/'} style={{textDecoration:'none', color:'white'}}>
                            Lite Reddit
                        </NavLink>
                    </Typography>
                    <NavLink to={'/login'}>
                        <Button color="inherit">Log in</Button>
                    </NavLink>
                    <NavLink to={'/'}>
                        <Button color="inherit">Sign up</Button>
                    </NavLink>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;