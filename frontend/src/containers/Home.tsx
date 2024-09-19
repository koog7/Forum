import React, {useEffect} from 'react';
import {AppDispatch, RootState} from "../app/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "./Thunk/ForumPostSlice.ts";

const Home = () => {

    const dispatch = useDispatch<AppDispatch>();
    const postData = useSelector((state: RootState) => state.Post.PostData)
    useEffect(() => {
        dispatch(getPosts())
    }, []);


    useEffect(() => {
        console.log(postData)
    }, [postData]);
    return (
        <div>
            123
        </div>
    );
};

export default Home;