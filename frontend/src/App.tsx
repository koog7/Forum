import './App.css'
import Home from "./containers/Home.tsx";
import {Route, Routes} from "react-router-dom";
import {useEffect} from "react";
import {getPosts} from "./containers/Thunk/ForumPostSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./app/store.ts";
import Navbar from "./components/Navbar.tsx";
import Login from "./containers/AuthPages/Login.tsx";
import SignUp from "./containers/AuthPages/SignUp.tsx";
import PostBlock from "./containers/PostBlock.tsx";

const App = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getPosts())
    }, []);

    return(
        <>
            <div>
                <Navbar />
            </div>
            <Routes>
                <Route path="/" element={(
                    <Home/>
                )}/>
                <Route path="/login" element={(
                    <Login/>
                )}/>
                <Route path="/signup" element={(
                    <SignUp/>
                )}/>
                <Route path="/post/:id" element={(
                    <PostBlock/>
                )}/>
            </Routes>
        </>
    )
};

export default App
