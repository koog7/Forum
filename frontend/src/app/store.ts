import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {ForumPostReducer} from "../containers/Thunk/ForumPostSlice.ts";
import {UserReducer} from "../containers/Thunk/AuthSlice.ts";
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const usersPersistConfig = {
    key: 'liteReddit:User',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    User: persistReducer(usersPersistConfig, UserReducer),
    Post: ForumPostReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;