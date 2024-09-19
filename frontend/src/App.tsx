import './App.css'
import Home from "./containers/Home.tsx";
import {Route, Routes} from "react-router-dom";
import {useEffect} from "react";
import {getPosts} from "./containers/Thunk/ForumPostSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./app/store.ts";
import Navbar from "./components/Navbar.tsx";
import Login from "./containers/AuthPages/Login.tsx";

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
            </Routes>
        </>
    )
};

export default App
