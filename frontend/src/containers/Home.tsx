import React from 'react';
import {RootState} from "../app/store.ts";
import {useSelector} from "react-redux";
import PostCard from "../components/PostCard.tsx";

const Home = () => {

    const postData = useSelector((state: RootState) => state.Post.PostData)

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
                        _id={post._id}
                    />
                ))
            )}
        </div>
    );
};

export default Home;