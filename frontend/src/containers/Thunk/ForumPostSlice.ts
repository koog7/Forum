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
interface MessageProps{
    _id: string,
    postId: string,
    userId: string,
    message: string,
}
interface PostState{
    PostData: PostProps[],
    OnePost: PostProps[],
    MessageData: MessageProps[],
    loader: boolean,
    error: string | null;
}

const initialState: PostState = {
    PostData: [],
    OnePost: [],
    MessageData: [],
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

export const getOnePosts = createAsyncThunk<PostProps[], string , { state: RootState }>('post/getOnePost', async (id:string) => {
    try{
        const response = await axiosAPI.get(`/post/${id}`);
        return response.data;
    }catch (error) {
        console.error('Error:', error);
    }
});

export const getMessage = createAsyncThunk<MessageProps[], string , { state: RootState }>('message/getMessage', async (id:string) => {
    try{
        const response = await axiosAPI.get(`/message/${id}`);
        return response.data;
    }catch (error) {
        console.error('Error:', error)
    }
});

export const postMessage = createAsyncThunk<MessageProps[], { id: string; message: string; token: string } , { state: RootState }>('message/postMessage', async ({ id, message, token }) => {
    try{
        // noinspection JSAnnotator
        const response = await axiosAPI.post(`/message/${id}`, {message}, {headers: { 'Authorization': `Bearer ${token}` }});
        return response.data;
    }catch (error) {
        console.error('Error:', error);
        throw error;
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
        builder.addCase(getOnePosts.pending, (state: PostState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(getOnePosts.fulfilled, (state: PostState, action) => {
            state.OnePost = action.payload;
            state.loader = false;
        });
        builder.addCase(getOnePosts.rejected, (state: PostState) => {
            state.loader = false;
            state.error = 'error';
        });
        builder.addCase(getMessage.pending, (state: PostState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(getMessage.fulfilled, (state: PostState, action) => {
            state.MessageData = action.payload;
            state.loader = false;
        });
        builder.addCase(getMessage.rejected, (state: PostState) => {
            state.loader = false;
            state.error = 'error';
        });
        builder.addCase(postMessage.pending, (state: PostState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(postMessage.fulfilled, (state: PostState, action) => {
            state.MessageData = [...state.MessageData, ...(Array.isArray(action.payload) ? action.payload : [action.payload])];
            state.loader = false;
            console.log(action.payload)
            console.log(state.MessageData)
        });
        builder.addCase(postMessage.rejected, (state: PostState) => {
            state.loader = false;
            state.error = 'error';
        });
    }
})

export const ForumPostReducer = ForumPostSlice.reducer;