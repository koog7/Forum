import {configureStore} from "@reduxjs/toolkit";
import {ForumPostReducer} from "../containers/Thunk/ForumPostSlice.ts";

export const store = configureStore({
    reducer:{
        Post: ForumPostReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;