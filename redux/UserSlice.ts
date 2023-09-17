import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

interface userData {
    email: string,
    password: string,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        logged_in: false,
        user: {} as userData,
        defaultName: 'John Smith'
    },
    reducers: {
        saveUser(state, action: PayloadAction<userData>) {
            state.user.email = action.payload.email
            state.user.password = action.payload.password
        },
        logIn(state) {
            state.logged_in = true
        },
        logOut(state) {
            state.logged_in = false
        }
    }
})

export const {saveUser, logIn, logOut} = userSlice.actions
