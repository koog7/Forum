import React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <AppBar position="static" sx={{backgroundColor:'#424242'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Lite Reddit
                    </Typography>
                    <NavLink to={'/'}>
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