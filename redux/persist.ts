import { booksSlice } from './BookSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './UserSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({books: booksSlice.reducer, user: userSlice.reducer})

export const persistedReducer = persistReducer(persistConfig, rootReducer)