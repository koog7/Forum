import React, {useEffect} from 'react';
import {AppDispatch, RootState} from "../app/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "./Thunk/ForumPostSlice.ts";
import PostCard from "../components/PostCard.tsx";

const Home = () => {


    const postData = useSelector((state: RootState) => state.Post.PostData)

    useEffect(() => {
        console.log(postData)
    }, [postData]);
    return (
        <div>
            {postData.length === 0 ? (
                <div>Ничего нет</div>
            ) : (
                postData.map((post) => (
                    <PostCard
                        key={post._id}
                        title={post.title}
                        description={post.description}
                        image={post.image || ''}
                        date={post.date}
                    />
                ))
            )}
        </div>
    );
};

export default Home;