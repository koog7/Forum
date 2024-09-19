import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import axiosAPI from "../../axios/AxiosAPI.ts";

interface PostProps{
    _id: string,
    userId: string,
    title: string,
    description?: string,
    image?: string,
    date: string,
}
interface PostState{
    PostData: PostProps[],
    loader: boolean,
    error: string | null;
}

const initialState: PostState = {
    PostData: [],
    loader: false,
    error: null,
}

export const getPosts = createAsyncThunk<PostProps[], void , { state: RootState }>('post/getPost', async () => {
    try{
        const response = await axiosAPI.get(`/post`);
        return response.data;
    }catch (error) {
        console.error('Error:', error);
    }
});

export const ForumPostSlice = createSlice({
    name: 'Post',
    initialState,
    reducers:{
        addPost: (state, action) => {
            state.PostData.push(action.payload);
        },
    },
    extraReducers:(builder) => {
        builder.addCase(getPosts.pending, (state: PostState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(getPosts.fulfilled, (state: PostState, action) => {
            state.PostData = action.payload;
            state.loader = false;
        });
        builder.addCase(getPosts.rejected, (state: PostState) => {
            state.loader = false;
            state.error = 'error';
        });
    }
})

export const ForumPostReducer = ForumPostSlice.reducer;